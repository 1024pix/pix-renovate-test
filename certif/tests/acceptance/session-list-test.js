import { visit } from '@1024pix/ember-testing-library';
import { click, currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { authenticateSession } from '../helpers/test-init';

module('Acceptance | Session List', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let certificationPointOfContact;

  module('When certificationPointOfContact is not authenticated', function () {
    test('it should not be accessible', async function (assert) {
      // when
      await visit('/sessions');

      // then
      assert.strictEqual(currentURL(), '/connexion');
    });
  });

  module('When certificationPointOfContact is authenticated', function (hooks) {
    let allowedCertificationCenterAccess;

    hooks.beforeEach(async function () {
      allowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 123,
        isAccessBlockedCollege: false,
        isAccessBlockedLycee: false,
        isAccessBlockedAEFE: false,
        isAccessBlockedAgri: false,
      });
      certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Lena',
        lastName: 'Rine',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [allowedCertificationCenterAccess],
      });

      await authenticateSession(certificationPointOfContact.id);
    });

    module('when current certification center is blocked', function () {
      test('should redirect to espace-ferme URL', async function (assert) {
        // given
        allowedCertificationCenterAccess.update({ isAccessBlockedCollege: true });

        // when
        await visit('/sessions');

        // then
        assert.strictEqual(currentURL(), '/espace-ferme');
      });
    });

    test('it should be accessible', async function (assert) {
      // when
      await visit('/sessions');

      // then
      assert.strictEqual(currentURL(), '/sessions');
    });

    test('it should show title indicating that the certificationPointOfContact can create a session', async function (assert) {
      // when
      const screen = await visit('/sessions');

      // then
      assert.dom(screen.getByRole('heading', { name: 'Créer ma première session de certification' })).exists();
    });

    test('it should redirect to the new session creation page when clicked on create session button', async function (assert) {
      // given
      const screen = await visit('/sessions');

      // when
      await click(screen.getByRole('link', { name: 'Créer une session' }));

      // then
      assert.strictEqual(currentURL(), '/sessions/creation');
    });

    test('it should redirect to the import session page when clicked on create/edit sessions button', async function (assert) {
      // given
      const screen = await visit('/sessions');

      // when
      await click(screen.getByRole('link', { name: 'Créer plusieurs sessions' }));

      // then
      assert.strictEqual(currentURL(), '/sessions/import');
    });

    module('when some sessions exist', function () {
      test('it should list the sessions', async function (assert) {
        // given
        server.createList('session-summary', 5, { certificationCenterId: 123, date: '2019-01-01' });

        // when
        const screen = await visit('/sessions');

        // then
        assert.strictEqual(screen.getAllByRole('row', { name: 'Session de certification' }).length, 5);
      });

      test('it should redirect to detail page of clicked session-summary', async function (assert) {
        // given
        server.create('session-summary', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        server.create('session-enrolment', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        server.create('session-management', {
          id: 123,
        });

        const screen = await visit('/sessions');

        // when
        await click(screen.getByRole('link', { name: 'Session 123' }));

        // then
        assert.strictEqual(currentURL(), '/sessions/123');
      });

      test('it should delete the session of clicked session-summary', async function (assert) {
        // given
        server.create('session-summary', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        server.create('session-summary', {
          id: 456,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-02-02',
          time: '16:00',
        });
        const screen = await visit('/sessions');
        await click(screen.getByRole('button', { name: 'Supprimer la session 123' }));
        await screen.findByRole('dialog');

        // when
        await click(screen.getByRole('button', { name: 'Supprimer la session' }));

        // then
        assert.strictEqual(currentURL(), '/sessions');
        assert.dom(screen.getByText('La session a été supprimée avec succès.')).exists();
        assert.dom(screen.queryByRole('button', { name: 'Supprimer la session 123' })).doesNotExist();
        assert.dom(screen.getByRole('button', { name: 'Supprimer la session 456' })).exists();
      });

      test('it should display an error notification when the session deletion goes wrong', async function (assert) {
        // given
        server.create('session-summary', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        this.server.delete(
          '/sessions/:id',
          () => ({
            errors: [
              {
                status: '400',
                detail: 'Bad request',
              },
            ],
          }),
          400,
        );
        const screen = await visit('/sessions');
        await click(screen.getByRole('button', { name: 'Supprimer la session 123' }));
        await screen.findByRole('dialog');

        // when
        await click(screen.getByRole('button', { name: 'Supprimer la session' }));

        // then
        assert.strictEqual(currentURL(), '/sessions');
        assert.dom(screen.getByText("Une erreur s'est produite lors de la suppression de la session.")).exists();
        assert.dom(screen.getByRole('button', { name: 'Supprimer la session 123' })).exists();
      });

      test('it should display an error notification when the session deletion returns a not found error', async function (assert) {
        // given
        server.create('session-summary', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        this.server.delete(
          '/sessions/:id',
          () => ({
            errors: [
              {
                status: '404',
                detail: 'Session not found',
              },
            ],
          }),
          404,
        );
        const screen = await visit('/sessions');
        await click(screen.getByRole('button', { name: 'Supprimer la session 123' }));
        await screen.findByRole('dialog');

        // when
        await click(screen.getByRole('button', { name: 'Supprimer la session' }));

        // then
        assert.strictEqual(currentURL(), '/sessions');
        assert.dom(screen.getByText("La session que vous tentez de supprimer n'existe pas.")).exists();
        assert.dom(screen.getByRole('button', { name: 'Supprimer la session 123' })).exists();
      });

      test('it should display an error notification when the session deletion returns a conflict error', async function (assert) {
        // given
        server.create('session-summary', {
          id: 123,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        this.server.delete(
          '/sessions/:id',
          () => ({
            errors: [
              {
                status: '409',
                detail: 'La session a déjà commencé',
              },
            ],
          }),
          400,
        );
        const screen = await visit('/sessions');
        await click(screen.getByRole('button', { name: 'Supprimer la session 123' }));
        await screen.findByRole('dialog');

        // when
        await click(screen.getByRole('button', { name: 'Supprimer la session' }));

        // then
        assert.strictEqual(currentURL(), '/sessions');
        assert.dom(screen.getByText('La session a déjà commencé.')).exists();
        assert.dom(screen.getByRole('button', { name: 'Supprimer la session 123' })).exists();
      });

      test('it should redirect to the same page of session list', async function (assert) {
        // given
        server.createList('session-summary', 30, {
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        server.create('session-enrolment', {
          id: 26,
          address: 'Adresse',
          certificationCenterId: 123,
          date: '2020-01-01',
          time: '14:00',
        });
        server.create('session-management', {
          id: 26,
        });

        const screen = await visit('/sessions');
        await click(screen.getByRole('button', { name: 'Aller à la page suivante' }));
        await click(screen.getByRole('button', { name: 'Aller à la page suivante' }));
        await click(screen.getByRole('link', { name: 'Session 26' }));

        // when
        await click(screen.getByRole('link', { name: 'Revenir à la liste des sessions' }));

        // then
        assert.dom(screen.getByText('Page 3 / 3')).exists();
        assert.strictEqual(currentURL(), '/sessions?pageNumber=3');
      });
    });
  });
});
