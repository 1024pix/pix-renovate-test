import { render } from '@1024pix/ember-testing-library';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { setBreakpoint } from 'ember-responsive/test-support';
import { module, test } from 'qunit';

import { stubCurrentUserService, stubSessionService } from '../../helpers/service-stubs';
import setupIntlRenderingTest from '../../helpers/setup-intl-rendering';

module('Integration | Component | navbar-desktop-header', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when user is not logged', function (hooks) {
    hooks.beforeEach(function () {
      // given
      stubSessionService(this.owner, { isAuthenticated: false });
      setBreakpoint('desktop');
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('img', { name: t('navigation.homepage') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.homepage') })).exists();
    });

    test('should not display the navigation menu', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('navigation', { name: t('navigation.main.label') })).doesNotExist();
    });

    test('should display link to signup page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('link', { name: t('navigation.not-logged.sign-up') })).exists();
    });

    test('should display link to login page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('link', { name: t('navigation.not-logged.sign-in') })).exists();
    });

    test('should not display the link "J\'ai un code"', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.notOk(screen.queryByRole('link', { name: t('navigation.main.code') }));
    });
  });

  module('When user is logged', function (hooks) {
    hooks.beforeEach(function () {
      // given
      stubSessionService(this.owner, { isAuthenticated: true });
      stubCurrentUserService(this.owner, { firstName: 'Judy' });
      setBreakpoint('desktop');
    });

    test('should display the link "J\'ai un code"', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('link', { name: t('navigation.main.code') })).exists();
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('img', { name: t('navigation.homepage') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.homepage') })).exists();
    });

    test('should display logged user details informations', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('button', { name: 'Judy Consulter mes informations' })).exists();
    });

    test('should not display link to signup page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-up') })).doesNotExist();
    });

    test('should not display link to login page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-in') })).doesNotExist();
    });

    test('should display the navigation menu with expected elements', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('navigation', { name: t('navigation.main.label') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.main.dashboard') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.main.skills') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.main.start-certification') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.main.tutorials') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.main.code') })).exists();
      assert.dom(screen.queryByRole('link', { name: t('navigation.main.trainings') })).doesNotExist();
    });
  });

  module('when user has recommended trainings', function (hooks) {
    hooks.beforeEach(function () {
      // given
      stubSessionService(this.owner, { isAuthenticated: true });
      stubCurrentUserService(this.owner, { hasRecommendedTrainings: true });
      setBreakpoint('desktop');
    });

    test('should display "My trainings" link', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('link', { name: t('navigation.main.trainings') })).exists();
    });
  });

  module('when user comes from external platform', function (hooks) {
    hooks.beforeEach(function () {
      // given
      stubSessionService(this.owner, { isAuthenticatedByGar: true });
      setBreakpoint('desktop');
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('img', { name: t('navigation.homepage') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.homepage') })).exists();
    });

    test('should not display the navigation menu', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('navigation', { name: t('navigation.main.label') })).doesNotExist();
    });

    test('should not display link to signup page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-up') })).doesNotExist();
    });

    test('should not display link to login page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-in') })).doesNotExist();
    });

    test('should not display the join campaign link', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.main.code') })).doesNotExist();
    });
  });

  module('when logged user is anonymous', function (hooks) {
    hooks.beforeEach(async function () {
      // given
      stubSessionService(this.owner, { isAuthenticated: true });
      stubCurrentUserService(this.owner, { isAnonymous: true });
      setBreakpoint('desktop');
    });

    test('should display the Pix logo', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.getByRole('img', { name: t('navigation.homepage') })).exists();
      assert.dom(screen.getByRole('link', { name: t('navigation.homepage') })).exists();
    });

    test('should not display the navigation menu', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('navigation', { name: t('navigation.main.label') })).doesNotExist();
    });

    test('should not display link to signup page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-up') })).doesNotExist();
    });

    test('should not display link to login page', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.not-logged.sign-in') })).doesNotExist();
    });

    test('should not display the join campaign link', async function (assert) {
      // when
      const screen = await render(hbs`<NavbarDesktopHeader />`);

      // then
      assert.dom(screen.queryByRole('link', { name: t('navigation.main.code') })).doesNotExist();
    });
  });

  test('should not display marianne logo when url does not have frenchDomainExtension', async function (assert) {
    // given
    this.set('isFrenchDomainUrl', false);

    // when
    const screen = await render(hbs`<NavbarDesktopHeader @shouldShowTheMarianneLogo={{this.isFrenchDomainUrl}} />`);

    // then
    assert.dom(screen.queryByRole('img', { name: t('common.french-republic') })).doesNotExist();
  });

  test('should display marianne logo when url does have frenchDomainExtension', async function (assert) {
    // given
    this.set('isFrenchDomainUrl', true);

    // when
    const screen = await render(hbs`<NavbarDesktopHeader @shouldShowTheMarianneLogo={{this.isFrenchDomainUrl}} />`);

    // then
    assert.dom(screen.getByRole('img', { name: t('common.french-republic') })).exists();
  });
});
