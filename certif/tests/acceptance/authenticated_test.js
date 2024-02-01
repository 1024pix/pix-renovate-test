import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  createCertificationPointOfContactWithTermsOfServiceAccepted,
  createScoIsManagingStudentsCertificationPointOfContactWithTermsOfServiceAccepted,
  authenticateSession,
} from '../helpers/test-init';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit as visitScreen } from '@1024pix/ember-testing-library';

module('Acceptance | authenticated', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  module('When user clicks the sidebar logo', function () {
    test('it should redirect to the sessions list page', async function (assert) {
      // given
      const certificationPointOfContact = createCertificationPointOfContactWithTermsOfServiceAccepted();
      const session = server.create('session', {
        certificationCenterId: parseInt(certificationPointOfContact.allowedCertificationCenterAccessIds[0]),
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      await visit(`/sessions/${session.id}`);
      await click('.sidebar__logo a');

      // then
      assert.strictEqual(currentURL(), '/sessions/liste');
    });
  });

  module('When user clicks the sessions sidebar menu entry', function () {
    test('it should also redirect to the sessions list page', async function (assert) {
      // given
      const certificationPointOfContact = createCertificationPointOfContactWithTermsOfServiceAccepted();
      const session = server.create('session', {
        certificationCenterId: parseInt(certificationPointOfContact.allowedCertificationCenterAccessIds[0]),
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen(`/sessions/${session.id}`);
      await click(screen.getByRole('link', { name: 'Sessions de certification' }));

      // then
      assert.strictEqual(currentURL(), '/sessions/liste');
    });

    test('it should show a "Espace surveillant" button', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [currentAllowedCertificationCenterAccess],
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/sessions/liste');

      // then
      assert.dom(screen.getByRole('link', { name: 'Espace surveillant' })).exists();
    });

    test('it should open the login session supervisor in a new tab', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [currentAllowedCertificationCenterAccess],
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/sessions/liste');
      const invigilatorSpaceLink = screen.getByRole('link', { name: 'Espace surveillant' });
      await click(invigilatorSpaceLink);

      // then
      assert.dom(invigilatorSpaceLink).hasAttribute('target', '_blank');
    });
  });

  module('banners', function () {
    module('certification opening dates banner', function () {
      module('when certification center is SCO isManagingStudent', function () {
        test('it should display the banner', async function (assert) {
          // given
          const certificationPointOfContact =
            createScoIsManagingStudentsCertificationPointOfContactWithTermsOfServiceAccepted();
          await authenticateSession(certificationPointOfContact.id);

          // when
          const screen = await visitScreen('/sessions/liste');

          // then
          assert
            .dom(
              screen.getByText(
                'La certification Pix se déroulera du 6 novembre 2023 au 29 mars 2024 pour les lycées et du 4 mars au 14 juin 2024 pour les collèges. Pensez à consulter la',
              ),
            )
            .exists();
          assert.dom(screen.getByRole('link', { name: 'documentation pour voir les nouveautés.' })).exists();
        });
      });

      module('when certification center is not SCO isManagingStudent', function () {
        test('it should not display the banner', async function (assert) {
          // given
          const certificationPointOfContact = createCertificationPointOfContactWithTermsOfServiceAccepted();
          await authenticateSession(certificationPointOfContact.id);

          // when
          const screen = await visitScreen('/sessions/liste');

          // then
          const certificationBannerMessage = screen.queryByText(
            'La certification Pix se déroulera du 6 novembre 2023 au 29 mars 2024 pour les lycées et du 4 mars au 14 juin 2024 pour les collèges. Pensez à consulter la',
          );
          assert.dom(certificationBannerMessage).doesNotExist();
        });
      });
    });

    module('role management banner', function () {
      module('when certification center is SCO', function () {
        test('it should not display the banner', async function (assert) {
          // given
          const certificationPointOfContact = createCertificationPointOfContactWithTermsOfServiceAccepted(
            'SCO',
            'Scoule',
          );
          await authenticateSession(certificationPointOfContact.id);

          // when
          const screen = await visitScreen('/sessions/liste');

          // then
          assert
            .dom(
              screen.queryByText(
                'Nouveauté : Gestion des accès à Pix Certif, plus d’autonomie pour les centres ! Rendez-vous dans l’onglet Equipe pour découvrir les administrateurs et membres de votre espace Pix Certif. Les administrateurs peuvent dorénavant ajouter des membres dans Pix Certif sans avoir à contacter l’équipe Certification.',
              ),
            )
            .doesNotExist();
          assert.dom(screen.queryByRole('link', { name: 'Plus d’information ici' })).doesNotExist();
        });
      });

      const nonSchoolCertificationCentersTypes = ['SUP', 'PRO'];

      nonSchoolCertificationCentersTypes.forEach((type) => {
        module(`when certification center is ${type}`, function () {
          test('it should not display the banner', async function (assert) {
            // given
            const certificationPointOfContact = createCertificationPointOfContactWithTermsOfServiceAccepted(
              type,
              'Soupère',
            );
            await authenticateSession(certificationPointOfContact.id);

            // when
            const screen = await visitScreen('/sessions/liste');

            // then
            assert
              .dom(
                screen.getByText(
                  'Nouveauté : Gestion des accès à Pix Certif, plus d’autonomie pour les centres ! Rendez-vous dans l’onglet Equipe pour découvrir les administrateurs et membres de votre espace Pix Certif. Les administrateurs peuvent dorénavant ajouter des membres dans Pix Certif sans avoir à contacter l’équipe Certification.',
                ),
              )
              .exists();
            assert.dom(screen.getByRole('link', { name: 'Plus d’information ici' })).exists();
          });
        });
      });
    });
  });

  module('When user changes current certification center', function () {
    test('should display the new current certification center in the logged menu', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const anotherAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        name: 'Poupoune',
        externalId: 'DEF456',
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [
          currentAllowedCertificationCenterAccess,
          anotherAllowedCertificationCenterAccess,
        ],
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/');
      await click(screen.getByRole('button', { name: 'Buffy Summers Bibiche (ABC123) Ouvrir le menu utilisateur' }));
      await click(screen.getByRole('button', { name: 'Poupoune (DEF456)' }));

      // then
      assert
        .dom(screen.getByRole('button', { name: 'Buffy Summers Poupoune (DEF456) Ouvrir le menu utilisateur' }))
        .exists();
    });

    test('updates current role in certification center', async function (assert) {
      // given
      const currentCertificationCenter = server.create('allowed-certification-center-access', {
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const anotherCertificationCenter = server.create('allowed-certification-center-access', {
        name: 'Poupoune',
        externalId: 'DEF456',
      });

      const currentCertificationCenterMembership = server.create('certification-center-membership', {
        certificationCenterId: currentCertificationCenter.id,
        role: 'MEMBER',
      });

      const anotherCertificationCenterMembership = server.create('certification-center-membership', {
        certificationCenterId: anotherCertificationCenter.id,
        role: 'ADMIN',
      });

      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [currentCertificationCenter, anotherCertificationCenter],
        certificationCenterMemberships: [currentCertificationCenterMembership, anotherCertificationCenterMembership],
      });

      const currentUser = this.owner.lookup('service:current-user');

      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/');
      await click(screen.getByRole('button', { name: 'Buffy Summers Bibiche (ABC123) Ouvrir le menu utilisateur' }));
      await click(screen.getByRole('button', { name: 'Poupoune (DEF456)' }));

      // then
      assert.strictEqual(currentUser.currentCertificationCenterMembership.id, anotherCertificationCenterMembership.id);
      assert.true(currentUser.isAdminOfCurrentCertificationCenter);
    });

    test('should redirect to sessions/liste URL when changing the current certification center', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 123,
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const anotherAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 456,
        name: 'Poupoune',
        externalId: 'DEF456',
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [
          currentAllowedCertificationCenterAccess,
          anotherAllowedCertificationCenterAccess,
        ],
      });
      server.create('session', {
        id: 555,
        certificationCenterId: 123,
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/sessions/555');
      await click(screen.getByRole('button', { name: 'Buffy Summers Bibiche (ABC123) Ouvrir le menu utilisateur' }));
      await click(screen.getByRole('button', { name: 'Poupoune (DEF456)' }));

      // then
      assert.strictEqual(currentURL(), '/sessions/liste');
    });

    test('should redirect to espace-ferme URL when changing the current certification center to a blocked one', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 123,
        name: 'Bibiche',
        externalId: 'ABC123',
      });
      const anotherAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 456,
        name: 'Poupoune',
        externalId: 'DEF456',
        isAccessBlockedCollege: true,
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [
          currentAllowedCertificationCenterAccess,
          anotherAllowedCertificationCenterAccess,
        ],
      });
      server.create('session', {
        id: 555,
        certificationCenterId: 123,
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/sessions/555');
      await click(screen.getByRole('button', { name: 'Buffy Summers Bibiche (ABC123) Ouvrir le menu utilisateur' }));
      await click(screen.getByRole('button', { name: 'Poupoune (DEF456)' }));

      // then
      assert.strictEqual(currentURL(), '/espace-ferme');
    });

    test('should redirect to sessions/liste URL when changing from a blocked certification center to a not blocked one', async function (assert) {
      // given
      const currentAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 123,
        name: 'Bibiche',
        externalId: 'ABC123',
        isAccessBlockedCollege: true,
      });
      const anotherAllowedCertificationCenterAccess = server.create('allowed-certification-center-access', {
        id: 456,
        name: 'Poupoune',
        externalId: 'DEF456',
      });
      const certificationPointOfContact = server.create('certification-point-of-contact', {
        firstName: 'Buffy',
        lastName: 'Summers',
        pixCertifTermsOfServiceAccepted: true,
        allowedCertificationCenterAccesses: [
          currentAllowedCertificationCenterAccess,
          anotherAllowedCertificationCenterAccess,
        ],
      });
      server.create('session', {
        id: 555,
        certificationCenterId: 123,
      });
      await authenticateSession(certificationPointOfContact.id);

      // when
      const screen = await visitScreen('/');
      await click(screen.getByRole('button', { name: 'Buffy Summers Bibiche (ABC123) Ouvrir le menu utilisateur' }));
      await click(screen.getByRole('button', { name: 'Poupoune (DEF456)' }));

      // then
      assert.strictEqual(currentURL(), '/sessions/liste');
    });
  });
});
