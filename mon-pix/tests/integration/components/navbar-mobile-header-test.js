import { render } from '@1024pix/ember-testing-library';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { setBreakpoint } from 'ember-responsive/test-support';
import { module, test } from 'qunit';

import { stubCurrentUserService, stubSessionService } from '../../helpers/service-stubs';
import setupIntlRenderingTest from '../../helpers/setup-intl-rendering';

module('Integration | Component | navbar-mobile-header', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when user is not logged', function (hooks) {
    hooks.beforeEach(async function () {
      // given & when
      stubSessionService(this.owner, { isAuthenticated: false });
      setBreakpoint('tablet');
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarMobileHeader />`);

      // then
      assert.ok(screen.getByRole('link', { name: t('navigation.homepage') }));
    });

    test('should not display the burger menu', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarMobileHeader />`);

      // then
      assert.dom(screen.queryByRole('navigation', { name: t('navigation.main.label') })).doesNotExist();
      assert.dom(screen.queryByRole('button', { name: t('navigation.mobile-button-title') })).doesNotExist();
    });
  });

  module('When user is logged', function (hooks) {
    hooks.beforeEach(function () {
      stubSessionService(this.owner, { isAuthenticated: true });
      stubCurrentUserService(this.owner, { firstName: 'John', lastName: 'Doe' });
      setBreakpoint('tablet');
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarMobileHeader />`);

      // then
      assert.ok(screen.getByRole('link', { name: t('navigation.homepage') }));
    });

    test('should display the burger icon', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarMobileHeader />`);

      // then
      assert.ok(screen.getByRole('navigation', { name: t('navigation.main.label') }));
      assert.ok(screen.getByRole('button', { name: t('navigation.mobile-button-title') }));
    });
  });

  test('should not display marianne logo when url does not have frenchDomainExtension', async function (assert) {
    // given
    this.set('isFrenchDomainUrl', false);

    // when
    const screen = await render(hbs`<NavbarMobileHeader @shouldShowTheMarianneLogo={{this.isFrenchDomainUrl}} />`);

    // then
    assert.dom(screen.queryByRole('img', { name: t('common.french-republic') })).doesNotExist();
  });

  test('should display marianne logo when url does have frenchDomainExtension', async function (assert) {
    // given
    this.set('isFrenchDomainUrl', true);

    // when
    const screen = await render(hbs`<NavbarMobileHeader @shouldShowTheMarianneLogo={{this.isFrenchDomainUrl}} />`);

    // then
    assert.ok(screen.getByRole('img', { name: t('common.french-republic') }));
  });
});
