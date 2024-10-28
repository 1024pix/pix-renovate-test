import { clickByName, render } from '@1024pix/ember-testing-library';
import Service from '@ember/service';
import { t } from 'ember-intl/test-support';
import ModulixFlashcards from 'mon-pix/components/module/element/flashcards/flashcards';
import { module, test } from 'qunit';
import sinon from 'sinon';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Module | Flashcards', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('should display the intro card by default', async function (assert) {
    // given
    const { flashcards } = _getFlashcards();

    // when
    const screen = await render(<template><ModulixFlashcards @flashcards={{flashcards}} /></template>);

    // then
    assert.ok(screen.getByText("Introduction à l'adresse e-mail"));
    assert.strictEqual(
      screen.getByRole('presentation').getAttribute('src'),
      'https://images.pix.fr/modulix/flashcards-intro.png',
    );
    assert.dom(screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.start') })).exists();
    assert.dom(screen.queryByText(t('pages.modulix.flashcards.direction'))).doesNotExist();
    assert
      .dom(screen.queryByText(t('pages.modulix.flashcards.position', { currentCardPosition: 1, totalCards: 2 })))
      .doesNotExist();
  });

  module('when in preview mode', function () {
    test('should display all sides of all cards', async function (assert) {
      // given
      const { flashcards, firstCard, secondCard } = _getFlashcards();

      class PreviewModeServiceStub extends Service {
        isEnabled = true;
      }
      this.owner.register('service:modulixPreviewMode', PreviewModeServiceStub);

      // when
      const screen = await render(<template><ModulixFlashcards @flashcards={{flashcards}} /></template>);

      // then
      const introCardButton = screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.start') });
      assert.dom(introCardButton).exists();

      assert.dom(screen.getByText(firstCard.recto.text)).exists();
      assert.dom(screen.getByText(firstCard.verso.text)).exists();
      assert.dom(screen.getByText(secondCard.recto.text)).exists();
      assert.dom(screen.getByText(secondCard.verso.text)).exists();

      const outroCardButton = screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.retry') });
      assert.dom(outroCardButton).exists();
    });
  });

  module('when user clicks on the "Start" button', function () {
    test('should display the first card', async function (assert) {
      // given
      const { flashcards } = _getFlashcards();

      // when
      const screen = await render(<template><ModulixFlashcards @flashcards={{flashcards}} /></template>);
      await clickByName(t('pages.modulix.buttons.flashcards.start'));

      // then
      assert.ok(screen.getByText("A quoi sert l'arobase dans mon adresse email ?"));
      assert.strictEqual(
        screen.getByRole('presentation').getAttribute('src'),
        'https://images.pix.fr/modulix/bien-ecrire-son-adresse-mail-explication-les-parties-dune-adresse-mail.svg',
      );
      assert.dom(screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.seeAnswer') })).exists();
      assert.ok(screen.getByText(t('pages.modulix.flashcards.direction')));
      assert.ok(screen.getByText(t('pages.modulix.flashcards.position', { currentCardPosition: 1, totalCards: 2 })));
    });
  });

  module('when users clicks on the "Continue" button', function () {
    test('should display options buttons to answer', async function (assert) {
      // given
      const { flashcards } = _getFlashcards();

      // when
      const screen = await render(<template><ModulixFlashcards @flashcards={{flashcards}} /></template>);
      await clickByName(t('pages.modulix.buttons.flashcards.start'));
      await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));

      // then
      assert.ok(screen.getByText(t('pages.modulix.flashcards.answerDirection')));
      assert.ok(screen.getByText(t('pages.modulix.buttons.flashcards.answers.no')));
    });

    module('when the user self-assesses their response', function () {
      test('should display the next card and send self-assessment', async function (assert) {
        // given
        const { flashcards } = _getFlashcards();

        const onSelfAssessmentStub = sinon.stub();

        // when
        const screen = await render(
          <template>
            <ModulixFlashcards @flashcards={{flashcards}} @onSelfAssessment={{onSelfAssessmentStub}} />
          </template>,
        );
        await clickByName(t('pages.modulix.buttons.flashcards.start'));
        await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
        await clickByName(t('pages.modulix.buttons.flashcards.answers.no'));

        // then
        assert.ok(screen.getByText('Qui a écrit le Dormeur du Val ?'));
        assert.ok(screen.getByText(t('pages.modulix.flashcards.position', { currentCardPosition: 2, totalCards: 2 })));
        assert.true(onSelfAssessmentStub.calledOnce);
      });
    });

    module('then user gives an answer for the last card', function () {
      test('should display the outro card', async function (assert) {
        // given
        const { flashcards } = _getFlashcards();

        const onSelfAssessmentStub = sinon.stub();

        // when
        const screen = await render(
          <template>
            <ModulixFlashcards @flashcards={{flashcards}} @onSelfAssessment={{onSelfAssessmentStub}} />
          </template>,
        );
        await clickByName(t('pages.modulix.buttons.flashcards.start'));
        await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
        await clickByName(t('pages.modulix.buttons.flashcards.answers.no'));
        await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
        await clickByName(t('pages.modulix.buttons.flashcards.answers.yes'));

        // then
        assert.ok(screen.getByText('Terminé'));
      });
    });
  });

  module('when users reaches the end of the deck', function () {
    test('should display the counters for each answer', async function (assert) {
      // given
      const { flashcards } = _getFlashcards();

      const onSelfAssessment = sinon.stub();

      // when
      const screen = await render(
        <template><ModulixFlashcards @flashcards={{flashcards}} @onSelfAssessment={{onSelfAssessment}} /></template>,
      );
      await clickByName(t('pages.modulix.buttons.flashcards.start'));
      await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
      await clickByName(t('pages.modulix.buttons.flashcards.answers.yes'));
      await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
      await clickByName(t('pages.modulix.buttons.flashcards.answers.no'));

      // then
      assert.ok(screen.getByText('Oui ! : 1'));
      assert.ok(screen.getByText('Presque : 0'));
      assert.ok(screen.getByText('Pas du tout : 1'));
    });
  });

  module('when user clicks on the "Retry" button', function () {
    test('should display intro card', async function (assert) {
      // given
      const { flashcards } = _getFlashcards();

      const onSelfAssessmentStub = sinon.stub();

      // when
      const screen = await render(
        <template>
          <ModulixFlashcards @flashcards={{flashcards}} @onSelfAssessment={{onSelfAssessmentStub}} />
        </template>,
      );
      await clickByName(t('pages.modulix.buttons.flashcards.start'));
      await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
      await clickByName(t('pages.modulix.buttons.flashcards.answers.yes'));
      await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
      await clickByName(t('pages.modulix.buttons.flashcards.answers.no'));
      await clickByName(t('pages.modulix.buttons.flashcards.retry'));

      // then
      assert.dom(screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.start') })).exists();
    });

    module('when user click on the "start" button', function () {
      test('displays the first flashcard', async function (assert) {
        // given
        const { flashcards, firstCard } = _getFlashcards();

        const onSelfAssessmentStub = sinon.stub();

        // when
        const screen = await render(
          <template>
            <ModulixFlashcards @flashcards={{flashcards}} @onSelfAssessment={{onSelfAssessmentStub}} />
          </template>,
        );
        await clickByName(t('pages.modulix.buttons.flashcards.start'));
        await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
        await clickByName(t('pages.modulix.buttons.flashcards.answers.yes'));
        await clickByName(t('pages.modulix.buttons.flashcards.seeAnswer'));
        await clickByName(t('pages.modulix.buttons.flashcards.answers.yes'));
        await clickByName(t('pages.modulix.buttons.flashcards.retry'));
        await clickByName(t('pages.modulix.buttons.flashcards.start'));

        // then
        assert.ok(screen.getByText(firstCard.recto.text));
        assert.strictEqual(screen.getByRole('presentation').getAttribute('src'), firstCard.recto.image.url);
        assert.dom(screen.getByRole('button', { name: t('pages.modulix.buttons.flashcards.seeAnswer') })).exists();
        assert.ok(screen.getByText(t('pages.modulix.flashcards.direction')));
        assert.ok(screen.getByText(t('pages.modulix.flashcards.position', { currentCardPosition: 1, totalCards: 2 })));
      });
    });
  });
});

function _getFlashcards() {
  const firstCard = {
    id: 'e1de6394-ff88-4de3-8834-a40057a50ff4',
    recto: {
      image: {
        url: 'https://images.pix.fr/modulix/bien-ecrire-son-adresse-mail-explication-les-parties-dune-adresse-mail.svg',
      },
      text: "A quoi sert l'arobase dans mon adresse email ?",
    },
    verso: {
      image: { url: 'https://images.pix.fr/modulix/didacticiel/ordi-spatial.svg' },
      text: "Parce que c'est joli",
    },
  };
  const secondCard = {
    id: 'e1de6394-ff88-4de3-8834-a40057a50ff4',
    recto: {
      image: {
        url: 'https://images.pix.fr/modulix/didacticiel/icon.svg',
      },
      text: 'Qui a écrit le Dormeur du Val ?',
    },
    verso: {
      image: {
        url: 'https://images.pix.fr/modulix/didacticiel/chaton.jpg',
      },
      text: 'Arthur Rimbaud',
    },
  };

  const flashcards = {
    id: '71de6394-ff88-4de3-8834-a40057a50ff4',
    type: 'flashcards',
    title: "Introduction à l'adresse e-mail",
    instruction: '<p>...</p>',
    introImage: { url: 'https://images.pix.fr/modulix/flashcards-intro.png' },
    cards: [firstCard, secondCard],
  };

  return { flashcards, firstCard, secondCard };
}
