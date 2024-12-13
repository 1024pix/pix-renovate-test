import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

import createGlimmerComponent from '../../../helpers/create-glimmer-component';
import { stubSessionService } from '../../../helpers/service-stubs.js';

module('Unit | Component | Autonomous Course | Landing page start block', function (hooks) {
  setupTest(hooks);

  let component;

  hooks.beforeEach(function () {
    component = createGlimmerComponent('autonomous-course/landing-page-start-block');
    component.args.startCampaignParticipation = sinon.stub().returns('stubbed-transition');

    component.router.transitionTo = sinon.stub();
  });

  module('#redirectToSigninIfUserIsAnonymous', function () {
    module('when user is anonymous', function () {
      test('should redirect to sign-in page on click', async function (assert) {
        // given
        const sessionService = stubSessionService(this.owner, { isAuthenticated: false });
        const event = { preventDefault: () => {} };

        // when
        await component.actions.redirectToSigninIfUserIsAnonymous.call(component, event);

        // then
        sinon.assert.calledWith(sessionService.requireAuthenticationAndApprovedTermsOfService, 'stubbed-transition');
        assert.ok(true);
      });
    });

    module('when user is authenticated', function () {
      test('should redirect to next page', async function (assert) {
        // given
        stubSessionService(this.owner, { isAuthenticated: true });
        const event = { preventDefault: () => {} };

        // when
        await component.actions.redirectToSigninIfUserIsAnonymous.call(component, event);

        // then
        sinon.assert.calledWith(component.router.transitionTo, 'authenticated');
        assert.ok(true);
      });
    });
  });
});
