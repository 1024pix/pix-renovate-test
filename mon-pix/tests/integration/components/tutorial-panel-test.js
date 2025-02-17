import { render } from '@1024pix/ember-testing-library';
// eslint-disable-next-line no-restricted-imports
import { find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { stubCurrentUserService } from '../../helpers/service-stubs';
import setupIntlRenderingTest from '../../helpers/setup-intl-rendering';

module('Integration | Component | Tutorial Panel', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when the result is not ok', function () {
    module('and a hint is present', function (hooks) {
      hooks.beforeEach(function () {
        this.set('hint', 'Ceci est un indice.');
        this.set('tutorials', []);
      });

      test('should render the hint', async function (assert) {
        // when
        await render(hbs`<TutorialPanel @hint={{this.hint}} @tutorials={{this.tutorials}} />`);

        // then
        assert.dom('.tutorial-panel').exists();
        assert.dom('.tutorial-panel__hint-container').exists();
        assert.dom('.tutorial-panel__hint-title').exists();
        assert.dom('.tutorial-panel__hint-picto-container').exists();
        assert.dom('.tutorial-panel__hint-picto').exists();
        assert.dom('.tutorial-panel__hint-content').exists();
        assert.strictEqual(find('.tutorial-panel__hint-content').textContent.trim(), 'Ceci est un indice.');
      });
    });

    module('and a tutorial is present', function (hooks) {
      hooks.beforeEach(function () {
        this.set('hint', 'Ceci est un indice');
        this.set('tutorials', [
          {
            title: 'Ceci est un tuto',
            duration: '20:00:00',
            link: 'https://example.com',
          },
        ]);
      });

      module('when the user is logged in', function () {
        test('should render the tutorial with actions', async function (assert) {
          // given
          stubCurrentUserService(this.owner, { firstName: 'Banana', lastName: 'Split' });

          // when
          await render(hbs`<TutorialPanel @hint={{this.hint}} @tutorials={{this.tutorials}} />`);

          // then
          assert.dom('.tutorial-card').exists();
          assert.dom('.tutorial-card__content').exists();
          assert.dom('.tutorial-card-content__details').exists();
          assert.dom('.tutorial-card-content__actions').exists();
          assert.dom('[aria-label="Marquer ce tuto comme utile"]').exists();
          assert.dom('[aria-label="Enregistrer dans ma liste de tutos"]').exists();
          assert.dom('[title="Marquer ce tuto comme utile"]').exists();
        });
      });

      module('when the user is not logged in', function () {
        test('should render the tutorial without actions', async function (assert) {
          // given
          stubCurrentUserService(this.owner, { isAuthenticated: false });

          // when
          await render(hbs`<TutorialPanel @hint={{this.hint}} @tutorials={{this.tutorials}} />`);

          // then
          assert.dom('.tutorial-card').exists();
          assert.dom('.tutorial-card__content').exists();
          assert.dom('.tutorial-card-content__details').exists();
          assert.dom('.tutorial-card-content__actions').doesNotExist();
        });
      });
    });
  });
});
