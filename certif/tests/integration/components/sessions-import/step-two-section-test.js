import { render } from '@1024pix/ember-testing-library';
import { click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Import::StepTwoSection', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('it renders the count of sessions and candidates', async function (assert) {
    // given
    this.set('sessionsCount', 2);
    this.set('sessionsWithoutCandidatesCount', 0);
    this.set('candidatesCount', 12);
    this.set('errorReports', []);

    // when
    const { getByText } = await render(
      hbs`<Import::StepTwoSection
  @sessionsCount={{this.sessionsCount}}
  @sessionsWithoutCandidatesCount={{this.sessionsWithoutCandidatesCount}}
  @candidatesCount={{this.candidatesCount}}
  @errorReports={{this.errorReports}}
/>`,
    );

    // then
    assert.dom(getByText('2 sessions dont 0 session sans candidat')).exists();
    assert.dom(getByText('12 candidats')).exists();
  });

  test('it renders a title', async function (assert) {
    // given
    this.set('sessionsCount', 2);
    this.set('sessionsWithoutCandidatesCount', 0);
    this.set('candidatesCount', 12);
    this.set('errorReports', []);

    // when
    const { getByRole } = await render(
      hbs`<Import::StepTwoSection
  @sessionsCount={{this.sessionsCount}}
  @sessionsWithoutCandidatesCount={{this.sessionsWithoutCandidatesCount}}
  @candidatesCount={{this.candidatesCount}}
  @errorReports={{this.errorReports}}
/>`,
    );

    // then
    assert.dom(getByRole('heading', { name: 'Récapitulatif', level: 2 })).exists();
  });

  module('when the imported file contains errors', function () {
    [
      { error: 'CANDIDATE_FIRST_NAME_REQUIRED', expectedMessage: 'Champ obligatoire "Prénom" manquant' },
      { error: 'CANDIDATE_LAST_NAME_REQUIRED', expectedMessage: 'Champ obligatoire "Nom de naissance" manquant' },
      { error: 'CANDIDATE_SEX_REQUIRED', expectedMessage: 'Champ obligatoire "Sexe" manquant' },
      { error: 'CANDIDATE_SEX_NOT_VALID', expectedMessage: 'Donnée du champ "Sexe" invalide (format accepté "M"/"F")' },
      {
        error: 'CANDIDATE_BIRTH_INSEE_CODE_NOT_VALID',
        expectedMessage: 'Donnée du champ "Code INSEE" invalide',
      },
      {
        error: 'CANDIDATE_BIRTH_INSEE_CODE_OR_BIRTH_POSTAL_CODE_AND_BIRTH_CITY_REQUIRED',
        expectedMessage: 'Renseigner soit un code INSEE, soit un code postal et un nom de commune de naissance',
      },
      { error: 'CANDIDATE_BIRTH_COUNTRY_REQUIRED', expectedMessage: 'Champ obligatoire "Pays de naissance" manquant' },
      {
        error: 'CANDIDATE_BIRTH_COUNTRY_NOT_FOUND',
        expectedMessage: 'Donnée du champ "Pays de naissance" n\'existe pas',
      },
      { error: 'CANDIDATE_BIRTH_CITY_REQUIRED', expectedMessage: 'Champ obligatoire "Nom de la commune" manquant' },
      {
        error: 'CANDIDATE_BIRTH_POSTAL_CODE_CITY_NOT_VALID',
        expectedMessage: 'Le code postal et le nom de la commune ne correspondent pas',
      },
      {
        error: 'CANDIDATE_BIRTH_POSTAL_CODE_NOT_FOUND',
        expectedMessage: 'Donnée du champ "Code postal" n\'existe pas',
      },
      { error: 'CANDIDATE_BIRTH_POSTAL_CODE_REQUIRED', expectedMessage: 'Champ obligatoire "Code postal" manquant' },
      { error: 'CANDIDATE_BIRTHDATE_REQUIRED', expectedMessage: 'Champ obligatoire "Date de naissance" manquant' },
      {
        error: 'CANDIDATE_BIRTHDATE_FORMAT_NOT_VALID',
        expectedMessage: 'Donnée du champ "Date de naissance" invalide (format accepté JJ/MM/AAAA)',
      },
      {
        error: 'CANDIDATE_BIRTHDATE_MUST_BE_GREATER',
        expectedMessage: 'Champ "Date de naissance" doit être supérieur à 01/01/1900',
      },
      {
        error: 'CANDIDATE_EXTRA_TIME_OUT_OF_RANGE',
        expectedMessage: 'Donnée du champ "Temps majoré" invalide (exemple de format accepté: 30%)',
      },
      {
        error: 'CANDIDATE_EXTRA_TIME_INTEGER',
        expectedMessage: 'Donnée du champ "Temps majoré" invalide (exemple de format accepté: 30%)',
      },
      {
        error: 'CANDIDATE_MAX_ONE_COMPLEMENTARY_CERTIFICATION',
        expectedMessage: "Inscription possible qu'à une seule certification complémentaire par candidat",
      },
      {
        error: 'CANDIDATE_BILLING_MODE_REQUIRED',
        expectedMessage: 'Champ obligatoire "Tarification part Pix" manquant',
      },
      {
        error: 'CANDIDATE_BILLING_MODE_NOT_VALID',
        expectedMessage:
          'Donnée du champ "Tarification part Pix" invalide (formats acceptés "Gratuite", "Payante" ou "Prépayée")',
      },
      {
        error: 'CANDIDATE_PREPAYMENT_CODE_REQUIRED',
        expectedMessage:
          'Champ obligatoire "Code de prépaiement" manquant (doit être renseigné en cas de tarification part Pix prépayée)',
      },
      {
        error: 'CANDIDATE_PREPAYMENT_CODE_MUST_BE_EMPTY',
        expectedMessage:
          'Champ "Code de prépaiement" doit rester vide (dans le cas de tarification part Pix gratuite ou payante)',
      },
      {
        error: 'CANDIDATE_NOT_ALLOWED_FOR_STARTED_SESSION',
        expectedMessage:
          'Édition des candidats impossible, le numéro de session correspond à une session déjà démarrée',
      },
      {
        error: 'CANDIDATE_EMAIL_NOT_VALID',
        expectedMessage: 'Donnée du champ "E-mail de convocation" invalide',
      },
      {
        error: 'CANDIDATE_RESULT_RECIPIENT_EMAIL_NOT_VALID',
        expectedMessage: 'Donnée du champ "E-mail du destinataire des résultats (formateur, enseignant…)" invalide',
      },
      {
        error: 'CANDIDATE_WRONG_SUBSCRIPTIONS_COMPATIBILITY',
        expectedMessage: "Vous ne pouvez pas inscrire un candidat à plus d'une certification complémentaire",
      },
      { error: 'SESSION_ADDRESS_REQUIRED', expectedMessage: 'Champ obligatoire "Nom du site" manquant' },
      { error: 'SESSION_ROOM_REQUIRED', expectedMessage: 'Champ obligatoire "Nom de la salle" manquant' },
      { error: 'SESSION_DATE_REQUIRED', expectedMessage: 'Champ obligatoire "Date de session" manquant' },
      {
        error: 'SESSION_DATE_NOT_VALID',
        expectedMessage: 'Donnée du champ "Date de session" invalide (format accepté JJ/MM/AAAA)',
      },
      { error: 'SESSION_TIME_REQUIRED', expectedMessage: 'Champ obligatoire "Heure de début" manquant' },
      {
        error: 'SESSION_TIME_NOT_VALID',
        expectedMessage: 'Donnée du champ "Heure de début" invalide (format accepté HH:MM)',
      },
      { error: 'SESSION_EXAMINER_REQUIRED', expectedMessage: 'Champ obligatoire "Surveillant(s)" manquant' },
      {
        error: 'SESSION_WITH_DATE_AND_TIME_ALREADY_EXISTS',
        expectedMessage:
          'Une session a déjà été créée avec ces informations. Pour ajouter des candidats à une session, indiquer uniquement le numéro de session sans les informations de session',
      },
      {
        error: 'SESSION_SCHEDULED_IN_THE_PAST',
        expectedMessage: 'Date et/ou heure indiquées antérieures à la date du jour',
      },
      {
        error: 'INFORMATION_NOT_ALLOWED_WITH_SESSION_ID',
        expectedMessage: 'Numéro de session fourni, veuillez supprimer les informations de session associées',
      },
    ].forEach(function ({ error, expectedMessage }) {
      test('it renders a report', async function (assert) {
        // given
        this.set('errorReports', [{ line: '5', code: error, isBlocking: true }]);
        this.set('validateSessions', () => {});

        // when
        const { getByText, getByRole } = await render(
          hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} @validateSessions={{this.validateSessions}} />`,
        );

        await click(getByRole('button', { name: 'Erreur bloquante 1 erreur' }));

        // then
        assert.dom(getByText(`Ligne 5 : ${expectedMessage}`)).exists();
      });
    });

    test('it renders the import file block to import again', async function (assert) {
      // given
      this.set('errorReports', [{ line: '5', code: 'CANDIDATE_FIRST_NAME_REQUIRED', isBlocking: true }]);
      this.set('validateSessions', () => {});

      // when
      const screen = await render(
        hbs`<Import::StepTwoSection
  @errorReports={{this.errorReports}}
  @validateSessions={{this.validateSessions}}
  @isImportDisabled={{true}}
/>`,
      );

      // then
      assert.dom(screen.getByRole('heading', { name: 'Importer à nouveau' })).exists();
      assert.dom(screen.getByText('Importer le modèle complété')).exists();
      assert.dom(screen.getByRole('button', { name: 'Continuer' })).isDisabled();
    });
  });

  module('when the imported file contains non blocking errors', function () {
    [
      { error: 'EMPTY_SESSION', expectedMessage: 'La session ne contient pas de candidat' },
      {
        error: 'DUPLICATE_CANDIDATE_IN_SESSION',
        expectedMessage:
          'Le candidat est inscrit plusieurs fois à la même session, une seule inscription sera prise en compte.',
      },
    ].forEach(function ({ error, expectedMessage }) {
      test('it renders a report', async function (assert) {
        // given
        this.set('errorReports', [{ line: '5', code: error, isBlocking: false }]);
        this.set('validateSessions', () => {});

        // when
        const { getByText, getByRole } = await render(
          hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} @validateSessions={{this.validateSessions}} />`,
        );

        await click(
          getByRole('button', {
            name: 'Point d’attention non bloquant 1 erreur',
          }),
        );

        // then
        assert.dom(getByText(`Ligne 5 : ${expectedMessage}`)).exists();
      });
    });

    test('it renders a button to create the sessions', async function (assert) {
      // given
      this.set('errorReports', [{ line: 2, code: 'EMPTY_SESSION', isBlocking: false }]);
      this.set('validateSessions', () => {});

      // when
      const { getByRole } = await render(
        hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} @validateSessions={{this.validateSessions}} />`,
      );

      // then
      assert.dom(getByRole('button', { name: 'Créer/éditer les sessions' })).exists();
    });

    test('it renders the import file block to import again', async function (assert) {
      // given
      this.set('errorReports', [{ line: '5', code: 'EMPTY_SESSION', isBlocking: false }]);
      this.set('validateSessions', () => {});

      // when
      const screen = await render(
        hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} @validateSessions={{this.validateSessions}} />`,
      );

      // then
      assert.dom(screen.getByRole('heading', { name: 'Importer à nouveau' })).exists();
      assert.dom(screen.getByText('Importer le modèle complété')).exists();
      assert.dom(screen.getByRole('button', { name: 'Continuer' })).exists();
    });
  });

  module('when the imported file contains no errors', function () {
    test('it renders a button to create the sessions', async function (assert) {
      // given
      this.set('errorReports', []);

      // when
      const { getByRole } = await render(hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} />`);

      // then
      assert.dom(getByRole('button', { name: 'Finaliser la création/édition' })).exists();
    });

    test('it does not renders the import file block to import again', async function (assert) {
      // given
      this.set('errorReports', []);

      // when
      const screen = await render(hbs`<Import::StepTwoSection @errorReports={{this.errorReports}} />`);

      // then
      assert.dom(screen.queryByRole('heading', { name: 'Importer à nouveau' })).doesNotExist();
    });
  });
});
