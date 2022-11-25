import { module, test } from 'qunit';
import { click, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from '../helpers/test-init';
import { visit as visitScreen, visit } from '@1024pix/ember-testing-library';

import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { waitForDialogClose } from '../helpers/wait-for';

const MODAL_TITLE = 'Finalisation de la session';

module('Acceptance | Session Finalization', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let allowedCertificationCenterAccess;
  let certificationPointOfContact;
  let session;

  hooks.beforeEach(function () {
    allowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
      isAccessBlockedCollege: false,
      isAccessBlockedLycee: false,
      isAccessBlockedAEFE: false,
      isAccessBlockedAgri: false,
    });
    certificationPointOfContact = server.create('certification-point-of-contact', {
      firstName: 'Buffy',
      lastName: 'Summers',
      allowedCertificationCenterAccesses: [allowedCertificationCenterAccess],
      pixCertifTermsOfServiceAccepted: true,
    });
    const certificationReports = server.createList('certification-report', 2, {
      hasSeenEndTestScreen: false,
      isCompleted: true,
    });
    session = server.create('session', {
      certificationCenterId: allowedCertificationCenterAccess.id,
      certificationReports,
    });
    session.update({ certificationReports });
  });

  hooks.afterEach(function () {
    const notificationMessagesService = this.owner.lookup('service:notifications');
    notificationMessagesService.clearAll();
  });

  module('When certificationPointOfContact is not logged in', function () {
    test('it should not be accessible by an unauthenticated certificationPointOfContact', async function (assert) {
      // when
      await visit(`/sessions/${session.id}/finalisation`);

      // then
      assert.strictEqual(currentURL(), '/connexion');
    });
  });

  module('When certificationPointOfContact is logged in', function (hooks) {
    hooks.beforeEach(async () => {
      await authenticateSession(certificationPointOfContact.id);
    });

    module('when current certification center is blocked', function () {
      test('should redirect to espace-ferme URL', async function (assert) {
        // given
        allowedCertificationCenterAccess.update({ isAccessBlockedCollege: true });

        // when
        await visit(`/sessions/${session.id}/finalisation`);

        // then
        assert.strictEqual(currentURL(), '/espace-ferme');
      });
    });

    test('it should be accessible for an authenticated certificationPointOfContact', async function (assert) {
      // when
      await visit(`/sessions/${session.id}/finalisation`);

      // then
      assert.strictEqual(currentURL(), `/sessions/${session.id}/finalisation`);
    });

    test('it should display the end screen column when the center has no access to the supervisor space', async function (assert) {
      // when
      const screen = await visit(`/sessions/${session.id}/finalisation`);

      // then
      assert.dom(screen.queryByText('Écran de fin du test vu')).exists();
    });

    test('it should redirect to session details on click on return button', async function (assert) {
      // when
      const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
      await click(screen.getByRole('link', { name: 'Retour à la session' }));

      // then
      assert.deepEqual(currentURL(), `/sessions/${session.id}`);
    });

    test('it should display the complementary info section', async function (assert) {
      // given when
      const screen = await visit(`/sessions/${session.id}/finalisation`);

      // then
      assert
        .dom(
          screen.getByRole('checkbox', {
            name: 'Malgré un incident survenu pendant la session, les candidats ont pu terminer leur test de certification. Un temps supplémentaire a été accordé à un ou plusieurs candidats.',
          })
        )
        .exists();
      assert
        .dom(
          screen.getByRole('checkbox', {
            name: "Un ou plusieurs candidats étaient présents en session de certification mais n'ont pas pu rejoindre la session.",
          })
        )
        .exists();
    });

    test('it should display the uncompleted reports title and subtitle', async function (assert) {
      // given when
      const screen = await visit(`/sessions/${session.id}/finalisation`);

      // then
      assert
        .dom(
          screen.getByText(
            "Signalements : Reporter, pour chaque candidat, les signalements renseignés sur le PV d'incident"
          )
        )
        .exists();
      assert
        .dom(
          screen.getByText(
            'Pour que le signalement soit pris en compte, il est nécessaire d’utiliser la catégorie de signalement appropriée (exemples : C1, C2, etc).'
          )
        )
        .exists();
    });

    module('When certificationPointOfContact click on "Finaliser" button', function () {
      module('when there is no certification issue reports', function () {
        test('it should show "Ajouter" button', async function (assert) {
          // given
          const expectedText = 'Ajouter';
          const certificationReportsWithoutIssueReport = server.create('certification-report', {
            certificationCourseId: 1,
          });
          const certificationReports = [certificationReportsWithoutIssueReport];
          session.update({ certificationReports });

          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

          // then
          assert.dom(screen.getByText(expectedText)).exists();
        });
      });

      module('when we add a certification issue report', function () {
        test.skip('it should show "Ajouter / supprimer" button', async function (assert) {
          // given
          const certificationReportsWithoutCertificationIssueReport = server.create('certification-report', {
            certificationCourseId: 1,
          });
          const certificationReportsWithCertificationIssueReport = server.create('certification-report', {
            certificationCourseId: 2,
          });

          const certificationReports = [
            certificationReportsWithCertificationIssueReport,
            certificationReportsWithoutCertificationIssueReport,
          ];
          session.update({ certificationReports });

          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
          const addCertificationIssueReportsButtonsBeforeFilling = screen.getAllByRole('button', { name: 'Ajouter' });

          await click(addCertificationIssueReportsButtonsBeforeFilling[1]);
          await screen.findByRole('dialog');
          await click(screen.getByLabelText('C6 Suspicion de fraude'));
          await click(screen.getByRole('button', { name: 'Ajouter le signalement' }));

          // then
          assert.dom(screen.getByRole('button', { name: 'Ajouter / supprimer' })).exists();
        });
      });

      module('when we delete a certification issue report', function () {
        test('it should show the remaining count of issue reports', async function (assert) {
          // given
          const certificationReport = server.create('certification-report', { certificationCourseId: 1 });
          const certificationIssueReport1 = server.create('certification-issue-report', {
            certificationReportId: certificationReport.id,
          });
          const certificationIssueReport2 = server.create('certification-issue-report', {
            certificationReportId: certificationReport.id,
          });

          const certificationIssueReports = [certificationIssueReport1, certificationIssueReport2];
          certificationReport.update({ certificationIssueReports });
          session.update({ certificationReports: [certificationReport] });

          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
          await click(screen.getByRole('button', { name: 'Ajouter / supprimer' }));
          await screen.findByRole('dialog');
          const allDeleteIssueReportButtons = screen.getAllByRole('button', { name: 'Supprimer le signalement' });
          await click(allDeleteIssueReportButtons[0]);
          await click(screen.getByRole('button', { name: 'Fermer' }));

          // then
          assert.dom(screen.getByText('1 signalement')).exists();
        });
      });

      module('when there is completed report', function () {
        module('when end test screen has been seen', function () {
          test('it should not display end test screen warning', async function (assert) {
            // given
            const certificationReport = server.create('certification-report', {
              hasSeenEndTestScreen: true,
              isCompleted: true,
              abortReason: 'technical',
            });

            session.update({ certificationReports: [certificationReport] });

            // when
            await visit(`/sessions/${session.id}/finalisation`);
            const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
            await click(screen.getByText('Finaliser'));

            // then
            assert.dom(screen.getByText(MODAL_TITLE)).exists();
            assert
              .dom(screen.queryByText('La case "Écran de fin du test vu" n\'est pas cochée pour 1 candidat(s)'))
              .doesNotExist();
          });
        });

        module('when end test screen has not been seen', function () {
          test('it should display end test screen warning', async function (assert) {
            // given
            const certificationReport = server.create('certification-report', {
              hasSeenEndTestScreen: false,
              isCompleted: true,
              abortReason: 'technical',
            });

            session.update({ certificationReports: [certificationReport] });

            // when
            await visit(`/sessions/${session.id}/finalisation`);
            const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
            await click(screen.getByText('Finaliser'));

            // then
            assert.dom(screen.getByText(MODAL_TITLE)).exists();
            assert
              .dom(screen.getByText('La case "Écran de fin du test vu" n\'est pas cochée pour 1 candidat(s)'))
              .exists();
          });
        });
      });

      module('when there is no uncompleted report', function () {
        test('it should not show the uncompleted reports table', async function (assert) {
          // given
          const certificationReport = server.create('certification-report', { isCompleted: true });
          session.update({ certificationReports: [certificationReport] });

          // when
          await visit(`/sessions/${session.id}/finalisation`);
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

          // then
          assert
            .dom(
              screen.queryByText(
                "Ces candidats n'ont pas fini leur test de certification ou le surveillant a mis fin à leur test"
              )
            )
            .doesNotExist();
        });
      });

      module('when there are uncompleted reports', function () {
        module('when end test screen has not been seen', function () {
          module('when the session has supervisor access', function () {
            test('it should not display end test screen warning', async function (assert) {
              // given
              const certificationReport = server.create('certification-report', {
                hasSeenEndTestScreen: false,
                isCompleted: true,
                abortReason: 'technical',
              });
              session.update({ certificationReports: [certificationReport], hasSupervisorAccess: true });

              // when
              const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

              await click(screen.getByText('Finaliser'));

              // then
              assert.dom(screen.getByText(MODAL_TITLE)).exists();
              assert
                .dom(screen.queryByText('La case "Écran de fin du test vu" n\'est pas cochée pour 1 candidat(s)'))
                .doesNotExist();
            });
          });

          module('when the session does not have supervisor access', function () {
            test('it should display end test screen warning', async function (assert) {
              // given
              const certificationReport = server.create('certification-report', {
                hasSeenEndTestScreen: false,
                isCompleted: true,
                abortReason: 'technical',
              });
              session.update({ certificationReports: [certificationReport], hasSupervisorAccess: false });

              // when
              const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

              await click(screen.getByText('Finaliser'));

              // then
              assert.dom(screen.getByText(MODAL_TITLE)).exists();
              assert
                .dom(screen.getByText('La case "Écran de fin du test vu" n\'est pas cochée pour 1 candidat(s)'))
                .exists();
            });
          });
        });

        test('it should not show the completed reports table', async function (assert) {
          // given
          const certificationReport = server.create('certification-report', { isCompleted: false, abortReason: null });
          session.update({ certificationReports: [certificationReport] });

          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

          // then
          assert.dom(screen.queryByText('Certification(s) terminée(s)\n')).doesNotExist();
          assert.dom(screen.queryByText('Écran de fin du test vu\n')).doesNotExist();
        });

        test('it should show the uncompleted reports table', async function (assert) {
          // given
          const certificationReport = server.create('certification-report', { isCompleted: false });
          session.update({ certificationReports: [certificationReport] });

          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

          // then
          assert
            .dom(
              screen.getByText(
                "Ces candidats n'ont pas fini leur test de certification ou le surveillant a mis fin à leur test"
              )
            )
            .exists();
        });

        module('without any selected reason', function () {
          test('it should invalidate the form', async function (assert) {
            // given
            const certificationReport = server.create('certification-report', {
              isCompleted: false,
              abortReason: null,
            });
            session.update({ certificationReports: [certificationReport] });

            // when
            const screen = await visitScreen(`/sessions/${session.id}/finalisation`);
            await click(screen.getByText('Finaliser'));

            // then
            assert.dom(screen.queryByRole('heading', { name: MODAL_TITLE })).doesNotExist();
          });
        });

        module('with a selected reason', function () {
          test('it should validate the form', async function (assert) {
            // given
            const certificationReport = server.create('certification-report', {
              isCompleted: false,
              abortReason: 'technical',
            });
            session.update({ certificationReports: [certificationReport] });

            // when
            const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

            await click(screen.getByText('Finaliser'));

            // then
            assert.dom(screen.getByText(MODAL_TITLE)).exists();
            assert.dom(screen.getByText('Finalisation de la session')).exists();
          });
        });
      });
    });

    module('When certificationPointOfContact tries to finalize a session that has not started yet', function () {
      test('it should redirect to session details and show an error', async function (assert) {
        // given
        this.server.put(
          `/sessions/${session.id}/finalization`,
          () => ({
            errors: [
              {
                detail:
                  "Cette session n'a pas débuté, vous ne pouvez pas la finaliser. Vous pouvez néanmoins la supprimer.",
              },
            ],
          }),
          400
        );
        // when
        const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

        await click(screen.getByText('Finaliser'));
        await click(screen.getByText('Confirmer la finalisation'));

        // then
        assert
          .dom(
            screen.getByText(
              "Cette session n'a pas débuté, vous ne pouvez pas la finaliser. Vous pouvez néanmoins la supprimer."
            )
          )
          .exists();
        assert.dom(screen.getByText('Numéro de session')).exists();
        assert.dom(screen.getByText("Code d'accès")).exists();
        assert.dom(screen.getByText('Nom du site')).exists();
      });
    });

    module(
      'When certificationPointOfContact tries to finalize a session with abort reason on completed certification',
      function () {
        test('it should close confirmation modal and show an error', async function (assert) {
          // given
          this.server.put(
            `/sessions/${session.id}/finalization`,
            () => ({
              errors: [
                {
                  detail: 'Perdu, essaie encore',
                  status: '409',
                },
              ],
            }),
            409
          );
          // when
          const screen = await visitScreen(`/sessions/${session.id}/finalisation`);

          await click(screen.getByRole('button', { name: 'Finaliser' }));
          await screen.findByRole('dialog');
          await click(screen.getByRole('button', { name: 'Confirmer la finalisation' }));
          await waitForDialogClose();

          // then
          assert.dom(screen.getByText('Perdu, essaie encore')).exists();
          assert.dom(screen.queryByRole('heading', { name: 'Finalisation de la session' })).doesNotExist();
        });
      }
    );
  });
});
