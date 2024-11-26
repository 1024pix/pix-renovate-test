import { render } from '@1024pix/ember-testing-library';
import Service from '@ember/service';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Footer', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('displays the Pix logo', async function (assert) {
    // when
    const screen = await render(hbs`<Footer />}`);

    // then
    assert.ok(screen.getByAltText(t('common.pix')));
  });

  test('displays the navigation menu with expected', async function (assert) {
    // when
    const screen = await render(hbs`<Footer />}`);

    // then
    assert.dom(screen.getByRole('navigation')).hasAttribute('aria-label', t('navigation.footer.label'));

    assert.dom(screen.getByAltText(t('common.pix'))).exists();
    assert.dom(screen.getByText(`${t('navigation.copyrights')} ${new Date().getFullYear()} Pix`)).exists();
  });

  module('when url does not have frenchDomainExtension', function (hooks) {
    hooks.beforeEach(function () {
      class CurrentDomainServiceStub extends Service {
        get isFranceDomain() {
          return false;
        }
      }

      this.owner.register('service:currentDomain', CurrentDomainServiceStub);
    });

    test('does not display marianne logo', async function (assert) {
      // when
      const screen = await render(hbs`<Footer />`);

      // then
      assert.dom(screen.queryByAltText(t('common.french-republic'))).doesNotExist();
    });
  });

  module('when url does have frenchDomainExtension', function (hooks) {
    hooks.beforeEach(function () {
      class CurrentDomainServiceStub extends Service {
        get isFranceDomain() {
          return true;
        }
      }

      this.owner.register('service:currentDomain', CurrentDomainServiceStub);
    });

    test('displays marianne logo', async function (assert) {
      // when
      const screen = await render(hbs`<Footer />`);

      // then
      assert.dom(screen.getByAltText(t('common.french-republic'))).exists();
    });
  });
});
