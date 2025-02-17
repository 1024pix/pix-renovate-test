import { render } from '@1024pix/ember-testing-library';
import { findAll } from '@ember/test-helpers';
import { t } from 'ember-intl/test-support';
import ModulixElement from 'mon-pix/components/module/element';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Module | Element', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('should display an element with a text element', async function (assert) {
    // given
    const element = {
      id: '768441a5-a7d6-4987-ada9-7253adafd842',
      type: 'text',
      content: 'content',
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    assert.dom(screen.getByText(element.content)).exists();
  });

  test('should display an element with an image element', async function (assert) {
    // given
    const element = {
      id: '8d7687c8-4a02-4d7e-bf6c-693a6d481c78',
      type: 'image',
      url: 'https://images.pix.fr/modulix/didacticiel/ordi-spatial.svg',
      alt: "Dessin détaillé dans l'alternative textuelle",
      alternativeText: "Dessin d'un ordinateur dans un univers spatial.",
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    assert
      .dom(screen.getByRole('img', { name: "Dessin détaillé dans l'alternative textuelle" }))
      .exists()
      .hasAttribute('src', element.url);
    assert.dom(screen.getByRole('button', { name: "Afficher l'alternative textuelle" })).exists();
  });

  test('should display an element with an expand element', async function (assert) {
    // given
    const title = 'Expand title';
    const element = {
      id: '8d7687c8-4a02-4d7e-bf6c-693a6d481c78',
      type: 'expand',
      title,
      content: '<p>My content</p>',
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    const detailsElement = screen.getByRole('group');
    assert.dom(detailsElement).exists();
  });

  test('should display an element with a video element', async function (assert) {
    // given
    const element = {
      id: '3a9f2269-99ba-4631-b6fd-6802c88d5c26',
      type: 'video',
      title: 'Vidéo de présentation de Pix',
      url: 'https://videos.pix.fr/modulix/didacticiel/presentation.mp4',
      subtitles: '',
      transcription: '<p>transcription</p>',
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    assert.strictEqual(findAll('.element-video').length, 1);
    assert.dom(screen.getByRole('button', { name: 'Afficher la transcription' })).exists();
  });

  test('should display an element with an download element', async function (assert) {
    // given
    const element = {
      id: '3a9f2269-99ba-4631-b6fd-6802c88d5c26',
      type: 'download',
      files: [
        {
          url: 'https://example.org/image.jpg',
          format: '.jpg',
        },
      ],
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    const downloadElement = screen.getByRole('link', {
      name: t('pages.modulix.download.label', { format: '.jpg' }),
    });
    assert.dom(downloadElement).hasText(t('pages.modulix.download.button'));
  });

  test('should display an element with an embed element', async function (assert) {
    // given
    const element = {
      id: '3a9f2269-99ba-4631-b6fd-6802c88d5c26',
      type: 'embed',
      title: 'Embed de présentation de Pix',
      url: 'https://embed.pix.fr',
      height: 340,
      isCompletionRequired: false,
    };

    // when
    const screen = await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    assert.dom(screen.getByTitle(element.title)).exists();
  });

  test('should display an element with a separator element', async function (assert) {
    // given
    const element = {
      id: '11f382f1-d36a-48d2-a99d-4aa052ab7841',
      type: 'separator',
    };

    // when
    await render(<template><ModulixElement @element={{element}} /></template>);

    // then
    assert.dom('hr').exists();
  });

  test('should display an element with a qcu element', async function (assert) {
    // given
    const element = {
      id: 'd0690f26-978c-41c3-9a21-da931857739c',
      instruction: 'Instruction',
      proposals: [
        { id: '1', content: 'radio1' },
        { id: '2', content: 'radio2' },
      ],
      type: 'qcu',
    };
    const getLastCorrectionForElementStub = () => {};

    // when
    const screen = await render(
      <template>
        <ModulixElement @element={{element}} @getLastCorrectionForElement={{getLastCorrectionForElementStub}} />
      </template>,
    );

    // then
    assert.dom(screen.queryByRole('button', { name: 'Vérifier' })).exists();
  });

  test('should display an element with a qcm element', async function (assert) {
    // given
    const element = {
      instruction: 'Instruction',
      proposals: [
        { id: '1', content: 'checkbox1' },
        { id: '2', content: 'checkbox2' },
        { id: '3', content: 'checkbox3' },
      ],
      type: 'qcm',
    };
    const getLastCorrectionForElementStub = () => {};

    // when
    const screen = await render(
      <template>
        <ModulixElement @element={{element}} @getLastCorrectionForElement={{getLastCorrectionForElementStub}} />
      </template>,
    );

    // then
    assert.dom(screen.queryByRole('button', { name: 'Vérifier' })).exists();
  });

  test('should display an element with a qrocm element', async function (assert) {
    // given
    const element = {
      id: '994b6a96-a3c2-47ae-a461-87548ac6e02b',
      instruction: 'Mon instruction',
      proposals: [
        { content: '<span>Ma première proposition</span>', type: 'text' },
        {
          input: 'symbole',
          inputType: 'text',
          display: 'inline',
          size: 1,
          placeholder: '',
          ariaLabel: 'input-aria',
          defaultValue: '',
          type: 'input',
        },
        {
          input: 'premiere-partie',
          type: 'select',
          display: 'inline',
          placeholder: '',
          ariaLabel: 'select-aria',
          defaultValue: '',
          options: [
            {
              id: '1',
              content: "l'identifiant",
            },
            {
              id: '2',
              content: "le fournisseur d'adresse mail",
            },
          ],
        },
      ],
      type: 'qrocm',
    };
    const getLastCorrectionForElementStub = () => {};

    // when
    const screen = await render(
      <template>
        <ModulixElement @element={{element}} @getLastCorrectionForElement={{getLastCorrectionForElementStub}} />
      </template>,
    );

    // then
    assert.dom(screen.queryByRole('button', { name: 'Vérifier' })).exists();
  });

  test('should display an element with a flashcards element', async function (assert) {
    // given
    const element = {
      id: '71de6394-ff88-4de3-8834-a40057a50ff4',
      type: 'flashcards',
      title: "Introduction à l'adresse e-mail",
      instruction: '<p>...</p>',
      introImage: { url: 'https://images.pix.fr/modulix/placeholder-details.svg' },
      cards: [
        {
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
        },
      ],
    };
    const getLastCorrectionForElementStub = () => {};

    // when
    const screen = await render(
      <template>
        <ModulixElement @element={{element}} @getLastCorrectionForElement={{getLastCorrectionForElementStub}} />
      </template>,
    );

    // then
    assert.dom(screen.getByRole('button', { name: 'Commencer' })).exists();
  });
});
