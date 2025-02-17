import { render } from '@1024pix/ember-testing-library';
import Service from '@ember/service';
import { t } from 'ember-intl/test-support';
import SchoolSessionManagement from 'pix-orga/components/layout/school-session-management';
import { module, test } from 'qunit';
import sinon from 'sinon';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Components | Layout | SchoolSessionManagement', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when user can manage missions', function () {
    test('should display the info-text icon', async function (assert) {
      const sessionExpirationDate = null;

      class CurrentUserStub extends Service {
        isAdminInOrganization = false;
        canAccessMissionsPage = true;
        organization = {
          sessionExpirationDate,
        };
      }

      this.owner.register('service:current-user', CurrentUserStub);

      // when
      const screen = await render(<template><SchoolSessionManagement /></template>);

      // then
      const copyTooltipText = t('pages.missions.list.banner.copypaste-container.button.tooltip');
      const infoTooltipText = t('navigation.school-sessions.status.info-text', { htmlSafe: true }).toString();

      const tooltipElementList = await screen.findAllByRole('tooltip', { hidden: true });
      const tooltipElementTextList = tooltipElementList.map((element) => element.innerHTML.trim());

      assert.deepEqual(tooltipElementTextList, [copyTooltipText, infoTooltipText]);
    });

    module('session expiration date management', function (hooks) {
      let clock;
      hooks.afterEach(function () {
        clock.restore();
      });

      module('when there is no session expiration date', function () {
        test('should display inactive status', async function (assert) {
          // given
          const now = new Date(2024, 1, 1, 16, 1);
          clock = sinon.useFakeTimers({ now, toFake: ['Date'] });

          class CurrentUserStub extends Service {
            isAdminInOrganization = false;
            canAccessMissionsPage = true;
            organization = {
              sessionExpirationDate: null,
            };
          }

          this.owner.register('service:current-user', CurrentUserStub);

          // when
          const screen = await render(<template><SchoolSessionManagement /></template>);
          // then
          assert.ok(screen.getByText(t('navigation.school-sessions.status.inactive-label')));
          assert.ok(screen.getByRole('button', { name: t('navigation.school-sessions.activate-button') }));
        });
      });
      module('when session expiration date is in the future', function () {
        test('should display active status and extend session button', async function (assert) {
          // given
          const sessionExpirationDate = new Date(2024, 1, 1, 16, 1);
          const now = new Date(2024, 1, 1, 16);
          clock = sinon.useFakeTimers({ now, toFake: ['Date'] });

          class CurrentUserStub extends Service {
            isAdminInOrganization = false;
            canAccessMissionsPage = true;
            organization = {
              sessionExpirationDate,
            };
          }

          this.owner.register('service:current-user', CurrentUserStub);

          // when
          const screen = await render(<template><SchoolSessionManagement /></template>);
          // then
          assert.ok(
            screen.getByText(t('navigation.school-sessions.status.active-label', { sessionExpirationDate: '16:01' })),
          );
          assert.ok(screen.getByRole('button', { name: t('navigation.school-sessions.extend-button') }));
        });
      });
      module('when session expiration date is in the past', function () {
        test('should display inactive status and activate session button', async function (assert) {
          // given
          const sessionExpirationDate = new Date(2024, 1, 1, 16);
          const now = new Date(2024, 1, 1, 16, 1);
          clock = sinon.useFakeTimers({ now, toFake: ['Date'] });

          class CurrentUserStub extends Service {
            isAdminInOrganization = false;
            canAccessMissionsPage = true;
            organization = {
              sessionExpirationDate,
            };
          }

          this.owner.register('service:current-user', CurrentUserStub);

          // when
          const screen = await render(<template><SchoolSessionManagement /></template>);
          // then
          assert.ok(screen.getByText(t('navigation.school-sessions.status.inactive-label')));
          assert.ok(screen.getByRole('button', { name: t('navigation.school-sessions.activate-button') }));
        });
      });
    });
  });

  module('when user cannot manage missions', function () {
    test('should not display activate session button', async function (assert) {
      // given
      class CurrentUserStub extends Service {
        isAdminInOrganization = true;
        canAccessMissionsPage = false;
        organization = {};
      }

      this.owner.register('service:current-user', CurrentUserStub);

      // when
      const screen = await render(<template><SchoolSessionManagement /></template>);
      // then
      assert.notOk(screen.queryByRole('button', { name: t('navigation.school-sessions.activate-button') }));
    });
  });
});
