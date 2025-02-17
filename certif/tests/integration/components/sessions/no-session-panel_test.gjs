import { render } from '@1024pix/ember-testing-library';
import Service from '@ember/service';
import NoSessionPanel from 'pix-certif/components/sessions/no-session-panel';
import { module, test } from 'qunit';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Sessions | no-session-panel', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('it renders buttons links to create sessions', async function (assert) {
    // given
    const store = this.owner.lookup('service:store');
    const currentAllowedCertificationCenterAccess = store.createRecord('allowed-certification-center-access', {
      type: 'SUP',
      isRelatedToManagingStudentsOrganization: false,
    });

    class CurrentUserStub extends Service {
      currentAllowedCertificationCenterAccess = currentAllowedCertificationCenterAccess;
    }

    this.owner.register('service:current-user', CurrentUserStub);

    // when
    const screen = await render(<template><NoSessionPanel /></template>);

    // then
    const createOneSessionButton = screen.getByRole('link', { name: 'Créer une session' });
    const createMultipleSessionsButton = screen.getByRole('link', { name: 'Créer plusieurs sessions' });
    const buttonsInTheRightOrder = createOneSessionButton.compareDocumentPosition(createMultipleSessionsButton);
    assert.strictEqual(buttonsInTheRightOrder, Node.DOCUMENT_POSITION_FOLLOWING);
  });

  module('when certification center is a type SCO', function () {
    module('when it manages students', function () {
      test('it does not render a button link to the sessions import page', async function (assert) {
        // given
        const store = this.owner.lookup('service:store');
        const currentAllowedCertificationCenterAccess = store.createRecord('allowed-certification-center-access', {
          type: 'SCO',
          isRelatedToManagingStudentsOrganization: true,
        });

        class CurrentUserStub extends Service {
          currentAllowedCertificationCenterAccess = currentAllowedCertificationCenterAccess;
        }

        this.owner.register('service:current-user', CurrentUserStub);

        // when
        const { queryByRole } = await render(<template><NoSessionPanel /></template>);

        // then
        assert.dom(queryByRole('link', { name: 'Créer plusieurs sessions' })).doesNotExist();
      });
    });

    module('when it does not manage students', function () {
      test('it does render a button link to the sessions import page', async function (assert) {
        // given
        const store = this.owner.lookup('service:store');
        const currentAllowedCertificationCenterAccess = store.createRecord('allowed-certification-center-access', {
          type: 'SCO',
          isRelatedToManagingStudentsOrganization: false,
        });

        class CurrentUserStub extends Service {
          currentAllowedCertificationCenterAccess = currentAllowedCertificationCenterAccess;
        }

        this.owner.register('service:current-user', CurrentUserStub);

        // when
        const { getByRole } = await render(<template><NoSessionPanel /></template>);

        // then
        assert.dom(getByRole('link', { name: 'Créer plusieurs sessions' })).exists();
      });
    });
  });
});
