import { render } from '@1024pix/ember-testing-library';
import { t } from 'ember-intl/test-support';
import PasswordResetDemandReceivedInfo from 'mon-pix/components/authentication/password-reset-demand/password-reset-demand-received-info';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../../helpers/setup-intl-rendering';

module(
  'Integration | Component | Authentication | PasswordResetDemand | password-reset-demand-received-info',
  function (hooks) {
    setupIntlRenderingTest(hooks);

    test('it displays a heading, an info message and a "try again" link', async function (assert) {
      // when
      const screen = await render(<template><PasswordResetDemandReceivedInfo /></template>);

      // then
      assert
        .dom(
          screen.queryByRole('heading', {
            name: t('components.authentication.password-reset-demand-received-info.heading'),
          }),
        )
        .exists();

      assert
        .dom(screen.queryByText(t('components.authentication.password-reset-demand-received-info.message')))
        .exists();

      const tryAgainLink = await screen.queryByRole('link', {
        name: t('components.authentication.password-reset-demand-received-info.try-again'),
      });
      assert.dom(tryAgainLink).exists();
      assert.strictEqual(tryAgainLink.getAttribute('href'), '/mot-de-passe-oublie');
    });
  },
);
