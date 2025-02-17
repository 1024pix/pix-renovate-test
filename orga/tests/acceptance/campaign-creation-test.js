import { clickByName, fillByLabel, visit, within } from '@1024pix/ember-testing-library';
import { click, currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { t } from 'ember-intl/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import authenticateSession from '../helpers/authenticate-session';
import setupIntl from '../helpers/setup-intl';
import { createPrescriberByUser, createUserWithMembershipAndTermsOfServiceAccepted } from '../helpers/test-init';

module('Acceptance | Campaign Creation', function (hooks) {
  let availableTargetProfiles;

  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks);

  hooks.beforeEach(() => {
    availableTargetProfiles = server.createList('target-profile', 2);
  });

  test('it should not be accessible by an unauthenticated user', async function (assert) {
    // when
    await visit('/campagnes/creation');

    // then
    assert.strictEqual(currentURL(), '/connexion');
  });

  module('when the prescriber is authenticated', (hooks) => {
    hooks.beforeEach(async () => {
      const user = createUserWithMembershipAndTermsOfServiceAccepted();
      server.create('member-identity', { id: user.id, firstName: user.firstName, lastName: user.lastName });
      createPrescriberByUser({ user });

      await authenticateSession(user.id);
    });

    hooks.afterEach(function () {
      const notificationMessagesService = this.owner.lookup('service:notifications');
      notificationMessagesService.clearAll();
    });

    test('it should be accessible for an authenticated prescriber', async function (assert) {
      // when
      const screen = await visit('/campagnes/creation');

      // then
      assert.strictEqual(currentURL(), '/campagnes/creation');
      assert.ok(screen.getByText("Création d'une campagne"));
    });

    test('it should allow to create a campaign of type ASSESSMENT and redirect to the newly created campaign', async function (assert) {
      // given
      const expectedTargetProfileId = availableTargetProfiles[1].id;
      const expectedTargetProfileName = availableTargetProfiles[1].name;

      const screen = await visit('/campagnes/creation');
      await fillByLabel('Nom de la campagne *', 'Ma Campagne');
      await clickByName('Évaluer les participants');
      await click(screen.getByLabelText(`${t('pages.campaign-creation.target-profiles-list-label')} *`));
      await click(await screen.findByRole('option', { name: expectedTargetProfileName }));

      const externalIdentifier = screen
        .getByText('Souhaitez-vous demander un identifiant externe ?', { selector: 'legend' })
        .closest('fieldset');
      const element = within(externalIdentifier).getByRole('radio', { name: 'Non' });
      await click(element);

      // when
      await clickByName('Créer la campagne');

      // then
      const firstCampaign = server.db.campaigns[0];
      assert.strictEqual(firstCampaign.name, 'Ma Campagne');
      assert.strictEqual(firstCampaign.targetProfileId, expectedTargetProfileId);
      assert.strictEqual(currentURL(), '/campagnes/1/parametres');
    });

    test('it should allow to create a campaign of type PROFILES_COLLECTION and redirect to the newly created campaign', async function (assert) {
      // given
      const screen = await visit('/campagnes/creation');
      await fillByLabel('Nom de la campagne *', 'Ma Campagne');
      await clickByName('Collecter les profils Pix des participants');
      const externalIdentifier = screen
        .getByText('Souhaitez-vous demander un identifiant externe ?', { selector: 'legend' })
        .closest('fieldset');
      const element = within(externalIdentifier).getByRole('radio', { name: 'Non' });
      await click(element);

      // when
      await clickByName('Créer la campagne');

      // then
      assert.strictEqual(server.db.campaigns[0].name, 'Ma Campagne');
      assert.strictEqual(currentURL(), '/campagnes/1/parametres');
    });

    test('it should create campaign if user changes type after filling the form', async function (assert) {
      // given
      const expectedTargetProfileName = availableTargetProfiles[1].name;

      const screen = await visit('/campagnes/creation');
      await fillByLabel('Nom de la campagne *', 'Ma Campagne');
      await clickByName('Évaluer les participants');
      await click(screen.getByLabelText(`${t('pages.campaign-creation.target-profiles-list-label')} *`));
      await click(await screen.findByRole('option', { name: expectedTargetProfileName }));

      const title = `${t('pages.campaign-creation.test-title.label')} ${t('pages.campaign-creation.test-title.sublabel')}`;

      await fillByLabel(title, 'Savoir rechercher');
      await clickByName('Non');

      // when
      await clickByName(t('pages.campaign-creation.actions.create'));

      // then
      assert.strictEqual(server.db.campaigns[0].name, 'Ma Campagne');
      assert.strictEqual(currentURL(), '/campagnes/1/parametres');
    });

    test('it should set the current user as owner by default when creating a campaign', async function (assert) {
      // given
      const targetProfileName = availableTargetProfiles[1].name;
      const screen = await visit('/campagnes/creation');
      await fillByLabel('Nom de la campagne *', 'Ma Campagne');
      await clickByName('Évaluer les participants');
      await click(screen.getByLabelText(`${t('pages.campaign-creation.target-profiles-list-label')} *`));
      await click(await screen.findByRole('option', { name: targetProfileName }));

      // when
      await clickByName('Créer la campagne');

      // then
      assert.ok(screen.getByText('Harry Cover', { selector: 'dd' }));
    });

    test('it should display error on global form when error 500 is returned from backend', async function (assert) {
      // given
      const screen = await visit('/campagnes/creation');

      const expectedTargetProfileName = availableTargetProfiles[1].name;
      server.post('/campaigns', {}, 500);

      // when
      await fillByLabel('Nom de la campagne *', 'Ma Campagne');
      await clickByName('Évaluer les participants');
      await click(screen.getByLabelText(`${t('pages.campaign-creation.target-profiles-list-label')} *`));
      await click(await screen.findByRole('option', { name: expectedTargetProfileName }));
      const externalIdentifier = screen
        .getByText('Souhaitez-vous demander un identifiant externe ?', { selector: 'legend' })
        .closest('fieldset');
      const element = within(externalIdentifier).getByRole('radio', { name: 'Non' });
      await click(element);
      await clickByName('Créer la campagne');

      // then
      assert.strictEqual(currentURL(), '/campagnes/creation');
      assert.ok(screen.getByText('Une erreur est survenue. Veuillez réessayer ultérieurement.'));
    });
  });
});
