import * as moduleUnderTest from '../../../../lib/application/users/index.js';
import { usecases } from '../../../../lib/domain/usecases/index.js';
import { securityPreHandlers } from '../../../../src/shared/application/security-pre-handlers.js';
import { UserNotAuthorizedToRemoveAuthenticationMethod } from '../../../../src/shared/domain/errors.js';
import { domainBuilder, expect, HttpTestServer, sinon } from '../../../test-helper.js';

describe('Integration | Application | Users | user-controller', function () {
  let sandbox;
  let httpTestServer;

  beforeEach(async function () {
    sandbox = sinon.createSandbox();
    sandbox.stub(securityPreHandlers, 'checkRequestedUserIsAuthenticatedUser');
    sandbox.stub(securityPreHandlers, 'hasAtLeastOneAccessOf');

    sandbox.stub(usecases, 'getUserCampaignParticipationToCampaign');
    sandbox.stub(usecases, 'removeAuthenticationMethod');

    httpTestServer = new HttpTestServer();
    await httpTestServer.register(moduleUnderTest);
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#getUserCampaignParticipationToCampaign', function () {
    const auth = { credentials: {}, strategy: {} };

    context('Success cases', function () {
      let campaignParticipation;

      beforeEach(function () {
        campaignParticipation = domainBuilder.buildCampaignParticipation();
        securityPreHandlers.checkRequestedUserIsAuthenticatedUser.returns(true);
        auth.credentials.userId = '1234';
      });

      it('should return an HTTP response with status code 200', async function () {
        // given
        usecases.getUserCampaignParticipationToCampaign.resolves(campaignParticipation);

        // when
        const response = await httpTestServer.request(
          'GET',
          '/api/users/1234/campaigns/5678/campaign-participations',
          null,
          auth,
        );

        // then
        expect(response.statusCode).to.equal(200);
      });
    });

    context('Error cases', function () {
      beforeEach(function () {
        securityPreHandlers.checkRequestedUserIsAuthenticatedUser.callsFake((request, h) => {
          return Promise.resolve(h.response().code(403).takeover());
        });
      });

      it('should return a 403 HTTP response', async function () {
        // when
        const response = await httpTestServer.request('GET', '/api/users/1234/campaigns/5678/campaign-participations');

        // then
        expect(response.statusCode).to.equal(403);
      });
    });
  });

  describe('#removeAuthenticationMethod', function () {
    const method = 'POST';
    const url = '/api/admin/users/1/remove-authentication';
    const payload = {
      data: {
        attributes: {
          type: 'EMAIL',
        },
      },
    };

    beforeEach(function () {
      securityPreHandlers.hasAtLeastOneAccessOf.returns(() => true);
    });

    context('Success cases', function () {
      it('should return a HTTP response with status code 204', async function () {
        // given
        usecases.removeAuthenticationMethod.resolves();

        // when
        const response = await httpTestServer.request(method, url, payload);

        // then
        expect(response.statusCode).to.equal(204);
      });
    });

    context('Error cases', function () {
      it('should return a 403 HTTP response when when user is not allowed to access resource', async function () {
        // given
        securityPreHandlers.hasAtLeastOneAccessOf.returns((request, h) => h.response().code(403).takeover());

        // when
        const response = await httpTestServer.request(method, url, payload);

        // then
        expect(response.statusCode).to.equal(403);
      });

      it('should return a 403 HTTP response when the usecase throw a UserNotAuthorizedToRemoveAuthenticationMethod', async function () {
        // given
        usecases.removeAuthenticationMethod.throws(new UserNotAuthorizedToRemoveAuthenticationMethod());
        // when
        const response = await httpTestServer.request(method, url, payload);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });
  });
});
