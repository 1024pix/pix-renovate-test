import { render } from '@1024pix/ember-testing-library';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { setBreakpoint } from 'ember-responsive/test-support';
import { module, test } from 'qunit';

import { stubCurrentUserService, stubSessionService } from '../../helpers/service-stubs';
import setupIntlRenderingTest from '../../helpers/setup-intl-rendering';

module('Integration | Component | navbar-header', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when user is on desktop', function () {
    test('should render skip links', async function (assert) {
      // given
      setBreakpoint('desktop');

      // when
      const screen = await render(hbs`<NavbarHeader />`);

      // then
      assert.ok(screen.getByRole('link', { name: t('common.skip-links.skip-to-content') }));
      assert.ok(screen.getByRole('link', { name: t('common.skip-links.skip-to-footer') }));
    });
  });

  module('When user is not on desktop ', function () {
    test('should be rendered in mobile/tablet mode with a burger', async function (assert) {
      // given
      setBreakpoint('tablet');
      stubSessionService(this.owner, { isAuthenticated: true });
      stubCurrentUserService(this.owner, { firstName: 'John', lastName: 'Doe' });

      // when
      const screen = await render(hbs`<NavbarHeader />`);

      // then
      assert.ok(screen.getByRole('navigation', { name: t('navigation.main.label') }));
      assert.ok(screen.getByRole('button', { name: t('navigation.mobile-button-title') }));
    });

    test('should be rendered in mobile/tablet mode without burger', async function (assert) {
      // given
      setBreakpoint('tablet');
      stubSessionService(this.owner, { isAuthenticated: false });

      // when
      const screen = await render(hbs`<NavbarHeader />`);

      // then
      assert.dom(screen.queryByRole('navigation', { name: t('navigation.main.label') })).doesNotExist();
      assert.dom(screen.queryByRole('button', { name: t('navigation.mobile-button-title') })).doesNotExist();
    });

    test('should render skip links', async function (assert) {
      // given
      setBreakpoint('tablet');

      // when
      const screen = await render(hbs`<NavbarHeader />`);

      // then
      assert.ok(screen.getByRole('link', { name: t('common.skip-links.skip-to-content') }));
      assert.ok(screen.getByRole('link', { name: t('common.skip-links.skip-to-footer') }));
    });
  });
});
