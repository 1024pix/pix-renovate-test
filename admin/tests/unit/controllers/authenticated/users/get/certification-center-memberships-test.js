import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Controller | authenticated/users/get/certification-center-memberships', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'fr');

  let UserCertificationCenterMembership, notifications;

  hooks.beforeEach(function () {
    UserCertificationCenterMembership = {
      destroyRecord: sinon.stub(),
      save: sinon.stub(),
      rollbackAttributes: sinon.stub(),
    };
    notifications = {
      sendErrorNotification: sinon.stub(),
      sendSuccessNotification: sinon.stub(),
    };
  });

  module('#disableCertificationCenterMembership', function () {
    module('when users certification center membership is disabled', function () {
      test('it calls success method from notifications service', async function (assert) {
        // given
        const controller = this.owner.lookup('controller:authenticated/users/get/certification-center-memberships');
        controller.pixToast = notifications;
        UserCertificationCenterMembership.destroyRecord.resolves();

        // when
        await controller.disableCertificationCenterMembership(UserCertificationCenterMembership);

        // then
        sinon.assert.calledOnce(UserCertificationCenterMembership.destroyRecord);
        sinon.assert.calledOnce(controller.pixToast.sendSuccessNotification);
        sinon.assert.notCalled(controller.pixToast.sendErrorNotification);
        assert.ok(true);
      });
    });

    module('when an error occurs during a user certification center membership deactivation', function () {
      test('it calls error method from notifications service', async function (assert) {
        // given
        const controller = this.owner.lookup('controller:authenticated/users/get/certification-center-memberships');
        controller.pixToast = notifications;
        UserCertificationCenterMembership.destroyRecord.rejects();

        // when
        await controller.disableCertificationCenterMembership(UserCertificationCenterMembership);

        // then
        sinon.assert.calledOnce(UserCertificationCenterMembership.destroyRecord);
        sinon.assert.notCalled(controller.pixToast.sendSuccessNotification);
        sinon.assert.calledOnce(controller.pixToast.sendErrorNotification);
        assert.ok(true);
      });
    });
  });

  module('#updateCertificationCenterMembershipRole', function () {
    module('when users certification center membership is disabled', function () {
      test('it calls success method from notifications service', async function (assert) {
        // given
        const controller = this.owner.lookup('controller:authenticated/users/get/certification-center-memberships');
        controller.pixToast = notifications;
        UserCertificationCenterMembership.save.resolves();

        // when
        await controller.updateCertificationCenterMembershipRole(UserCertificationCenterMembership);

        // then
        sinon.assert.calledOnce(UserCertificationCenterMembership.save);
        sinon.assert.calledOnce(controller.pixToast.sendSuccessNotification);
        sinon.assert.notCalled(UserCertificationCenterMembership.rollbackAttributes);
        sinon.assert.notCalled(controller.pixToast.sendErrorNotification);
        assert.ok(true);
      });
    });

    module('when an error occurs during a user certification center membership deactivation', function () {
      test('it calls error method from notifications service', async function (assert) {
        // given
        const controller = this.owner.lookup('controller:authenticated/users/get/certification-center-memberships');
        controller.pixToast = notifications;
        UserCertificationCenterMembership.save.rejects();

        // when
        await controller.updateCertificationCenterMembershipRole(UserCertificationCenterMembership);

        // then
        sinon.assert.calledOnce(UserCertificationCenterMembership.save);
        sinon.assert.notCalled(controller.pixToast.sendSuccessNotification);
        sinon.assert.calledOnce(UserCertificationCenterMembership.rollbackAttributes);
        sinon.assert.calledOnce(controller.pixToast.sendErrorNotification);
        assert.ok(true);
      });
    });
  });
});
