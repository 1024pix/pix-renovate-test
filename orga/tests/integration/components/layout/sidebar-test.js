import { render } from '@1024pix/ember-testing-library';
import Service from '@ember/service';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Layout::Sidebar', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when the user is authenticated on orga.pix.fr', function (hooks) {
    class CurrentDomainServiceStub extends Service {
      get isFranceDomain() {
        return true;
      }
    }

    hooks.beforeEach(function () {
      this.owner.register('service:currentDomain', CurrentDomainServiceStub);
    });

    test('it should display documentation url given by current organization', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', isPro: true, documentationUrl: 'https://pix.fr' });
      }
      this.owner.register('service:current-user', CurrentUserStub);

      // when
      await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom('a[href="https://pix.fr"]').exists();
      assert.dom('a[href="https://cloud.pix.fr/s/cwZN2GAbqSPGnw4"]').doesNotExist();
    });
  });

  module('Common menu', function () {
    test('the logo should redirect to campaigns page', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessCampaignsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      const logoLink = screen.getByRole('link', { name: t('common.home-page') });

      assert.dom(logoLink).hasAttribute('href', '/campagnes');
    });

    test('should display Campagne, Équipe, Se déconnecter in menu for all organisation members', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1' });
        canAccessCampaignsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.dom(screen.getByText('Campagnes')).exists();
      assert.dom(screen.getByText('Équipe')).exists();
      assert.dom(screen.getByText('Se déconnecter')).exists();
    });

    test('should display Documentation menu when the organization has a documentation url', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', documentationUrl: 'www.amazing-doc.fr' });
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.dom(screen.getByText('Documentation')).exists();
    });

    test('should display Places menu if canAccessPlacesPage is true', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1' });
        canAccessPlacesPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.ok(screen.getByText(t('navigation.main.places')));
    });

    test('should not display Places menu if canAccessPlacesPage is false', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1' });
        canAccessPlacesPage = false;
      }
      this.owner.register('service:current-user', CurrentUserStub);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.notOk(screen.queryByText(t('navigation.main.places')));
    });

    test('should not display Support menu if canAccessMissionsPage is false', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessMissionsPage = false;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.dom(screen.queryByRole('link', { name: t('navigation.main.support') })).doesNotExist();
    });
  });

  module('When the user is from a PRO organization', function () {
    test('it should display Participants menu for all organisation members', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'PRO' });
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Participants')).exists();
    });
  });

  module('When the user is from a SUP organization', function () {
    test('it should display Étudiants menu for all organisation members when the organization is isSUPManagingStudents', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SUP' });
        isSUPManagingStudents = true;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Étudiants')).exists();
    });

    test('it should display Participants menu for all organisation members when the organization is not isSUPManagingStudents', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SUP' });
        isSUPManagingStudents = false;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Participants')).exists();
    });
  });

  module('When the user is from a SCO organization', function () {
    test('it should display Élèves menu for all organisation members when the organization is isSCOManagingStudents', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SCO' });
        isSCOManagingStudents = true;
        canAccessMissionsPage = false;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Élèves')).exists();
    });

    test('it should display Participants menu for all organisation members when the organization is not isSCOManagingStudents ', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SCO' });
        isSCOManagingStudents = false;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Participants')).exists();
    });

    test('it should display Certifications menu in the sidebar-menu when user is SCOManagingStudents', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SCO' });
        isAdminInOrganization = true;
        isSCOManagingStudents = true;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.getByText('Certifications')).exists();
    });

    test('it should hide Certification menu in the sidebar-menu', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        organization = Object.create({ id: '1', type: 'SCO' });
        isAdminInOrganization = false;
        isSCOManagingStudents = true;
      }

      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      // when
      const screen = await render(hbs`<Layout::Sidebar />`);

      // then
      assert.dom(screen.queryByLabelText('Certifications')).isNotVisible();
    });
  });

  module('When the user has the mission-management feature', function () {
    test('the logo should redirect to mission page', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessMissionsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      const logoLink = screen.getByRole('link', { name: t('common.home-page') });
      assert.dom(logoLink).hasAttribute('href', '/missions');
    });

    test('should display Mission menu', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessMissionsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.dom(screen.getByText('Missions')).exists();
    });

    test('should display Support menu', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessMissionsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.strictEqual(
        screen.getByRole('link', { name: t('navigation.main.support') }).href,
        'https://pix.fr/support/enseignement-scolaire/1er-degre',
      );
    });

    test('should not display Campagne', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessMissionsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);
      const intl = this.owner.lookup('service:intl');
      intl.setLocale(['fr', 'fr']);

      const screen = await render(hbs`<Layout::Sidebar />`);

      assert.dom(screen.queryByText('Campagnes')).doesNotExist();
      assert.dom(screen.queryByText('Étudiants')).doesNotExist();
    });
  });

  module('When the user has the attestations feature', function () {
    test('should display Attestations entry with link to attestation page', async function (assert) {
      class CurrentUserStub extends Service {
        organization = Object.create({ id: 5 });
        canAccessAttestationsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);

      const screen = await render(hbs`<Layout::Sidebar />`);

      const attestationsLink = screen.getByRole('link', { name: t('navigation.main.attestations') });
      assert.dom(attestationsLink).hasAttribute('href', '/attestations');
    });
  });

  module('When the user has the cover rate feature', function () {
    test('should display Statistiques entry with link to statistics page', async function (assert) {
      class CurrentUserStub extends Service {
        organization = { id: 5 };
        canAccessStatisticsPage = true;
      }
      this.owner.register('service:current-user', CurrentUserStub);

      const screen = await render(hbs`<Layout::Sidebar />`);

      const statisticsLink = screen.getByRole('link', { name: t('navigation.main.statistics') });
      assert.dom(statisticsLink).hasAttribute('href', '/statistiques');
    });
  });

  test('[a11y] it should contain accessibility aria-label nav', async function (assert) {
    // given
    class CurrentUserStub extends Service {
      organization = Object.create({ id: '1', isPro: true });
    }
    this.owner.register('service:current-user', CurrentUserStub);
    const intl = this.owner.lookup('service:intl');
    intl.setLocale(['fr', 'fr']);

    // when
    const screen = await render(hbs`<Layout::Sidebar />`);

    // then
    assert.dom(screen.getByLabelText('Navigation principale')).exists();
  });
});
