import * as moduleUnderTest from '../../../../lib/application/users/index.js';
import { userController } from '../../../../lib/application/users/user-controller.js';
import { NON_OIDC_IDENTITY_PROVIDERS } from '../../../../src/identity-access-management/domain/constants/identity-providers.js';
import * as OidcIdentityProviders from '../../../../src/identity-access-management/domain/constants/oidc-identity-providers.js';
import { securityPreHandlers } from '../../../../src/shared/application/security-pre-handlers.js';
import { expect, HttpTestServer, sinon } from '../../../test-helper.js';

const CODE_IDENTITY_PROVIDER_GAR = NON_OIDC_IDENTITY_PROVIDERS.GAR.code;
const CODE_IDENTITY_PROVIDER_POLE_EMPLOI = OidcIdentityProviders.POLE_EMPLOI.code;
const oidcProviderCode = 'genericOidcProviderCode';

describe('Unit | Router | user-router', function () {
  describe('GET /api/users/{id}/trainings', function () {
    const method = 'GET';

    it('returns 200', async function () {
      // given
      sinon.stub(userController, 'findPaginatedUserRecommendedTrainings').returns('ok');
      const securityPreHandlersStub = sinon
        .stub(securityPreHandlers, 'checkRequestedUserIsAuthenticatedUser')
        .callsFake((request, h) => h.response(true));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      const url = '/api/users/1/trainings';

      // when
      const result = await httpTestServer.request(method, url);

      // then
      expect(result.statusCode).to.equal(200);
      expect(securityPreHandlersStub).to.have.been.called;
    });

    it('returns 400 when userId is not a number', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      const userId = 'wrongId';
      const url = `/api/users/${userId}/trainings`;

      // when
      const result = await httpTestServer.request(method, url);

      // then
      expect(result.statusCode).to.equal(400);
    });
  });

  context('Routes /admin', function () {
    describe('POST /api/admin/users/{id}/add-pix-authentication-method', function () {
      it('returns 200 when user role is "SUPER_ADMIN"', async function () {
        // given
        sinon
          .stub(userController, 'addPixAuthenticationMethodByEmail')
          .callsFake((request, h) => h.response({}).code(201));
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
          .callsFake((request, h) => h.response(true));
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);
        const payload = { data: { attributes: { email: 'user@rexample.net' } } };

        // when
        const { statusCode } = await httpTestServer.request(
          'POST',
          '/api/admin/users/1/add-pix-authentication-method',
          payload,
        );

        // then
        expect(statusCode).to.equal(201);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
        sinon.assert.calledOnce(userController.addPixAuthenticationMethodByEmail);
      });

      it('returns 200 when user role is "SUPPORT"', async function () {
        // given
        sinon
          .stub(userController, 'addPixAuthenticationMethodByEmail')
          .callsFake((request, h) => h.response({}).code(201));
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        sinon.stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport').callsFake((request, h) => h.response(true));
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);
        const payload = { data: { attributes: { email: 'user@rexample.net' } } };

        // when
        const { statusCode } = await httpTestServer.request(
          'POST',
          '/api/admin/users/1/add-pix-authentication-method',
          payload,
        );

        // then
        expect(statusCode).to.equal(201);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
        sinon.assert.calledOnce(userController.addPixAuthenticationMethodByEmail);
      });

      it('returns 400 when id is not a number', async function () {
        // given
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);

        // when
        const { statusCode, payload } = await httpTestServer.request(
          'POST',
          '/api/admin/users/invalid-id/add-pix-authentication-method',
        );

        // then
        expect(statusCode).to.equal(400);
        expect(JSON.parse(payload).errors[0].detail).to.equal('"id" must be a number');
      });

      it(`returns 403 when user don't have access (CERTIF | METIER)`, async function () {
        // given
        sinon.stub(userController, 'addPixAuthenticationMethodByEmail').returns('ok');
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);
        const payload = { data: { attributes: { email: 'user@rexample.net' } } };

        // when
        const result = await httpTestServer.request(
          'POST',
          '/api/admin/users/1/add-pix-authentication-method',
          payload,
        );

        // then
        expect(result.statusCode).to.equal(403);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
        sinon.assert.notCalled(userController.addPixAuthenticationMethodByEmail);
      });
    });

    describe('POST /api/admin/users/{userId}/authentication-methods/{authenticationMethodId}', function () {
      // eslint-disable-next-line mocha/no-setup-in-describe
      [CODE_IDENTITY_PROVIDER_GAR, CODE_IDENTITY_PROVIDER_POLE_EMPLOI, oidcProviderCode].forEach((identityProvider) => {
        it(`returns 204 when user role is "SUPER_ADMIN" and identity provider is "${identityProvider}"`, async function () {
          // given
          sinon
            .stub(userController, 'reassignAuthenticationMethods')
            .callsFake((request, h) => h.response({}).code(204));
          sinon
            .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
            .callsFake((request, h) => h.response(true));
          sinon
            .stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport')
            .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
          const httpTestServer = new HttpTestServer();
          await httpTestServer.register(moduleUnderTest);
          const payload = {
            data: {
              attributes: {
                'user-id': 2,
              },
            },
          };

          // when
          const { statusCode } = await httpTestServer.request(
            'POST',
            '/api/admin/users/1/authentication-methods/1',
            payload,
          );

          // then
          expect(statusCode).to.equal(204);
          sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
          sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
          sinon.assert.calledOnce(userController.reassignAuthenticationMethods);
        });

        it(`returns 204 when user role is "SUPPORT" and identity provider is "${identityProvider}"`, async function () {
          // given
          sinon
            .stub(userController, 'reassignAuthenticationMethods')
            .callsFake((request, h) => h.response({}).code(204));
          sinon
            .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
            .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
          sinon.stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport').callsFake((request, h) => h.response(true));
          const httpTestServer = new HttpTestServer();
          await httpTestServer.register(moduleUnderTest);
          const payload = {
            data: {
              attributes: {
                'user-id': 3,
              },
            },
          };

          // when
          const { statusCode } = await httpTestServer.request(
            'POST',
            '/api/admin/users/1/authentication-methods/1',
            payload,
          );

          // then
          expect(statusCode).to.equal(204);
          sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
          sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
          sinon.assert.calledOnce(userController.reassignAuthenticationMethods);
        });
      });

      it('returns 400 when "userId" is not a number', async function () {
        // given
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);

        // when
        const { statusCode, payload } = await httpTestServer.request(
          'POST',
          '/api/admin/users/invalid-id/authentication-methods/1',
        );

        // then
        expect(statusCode).to.equal(400);
        expect(JSON.parse(payload).errors[0].detail).to.equal('"userId" must be a number');
      });

      it('returns 400 when "authenticationMethodId" is not a number', async function () {
        // given
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);

        // when
        const { statusCode, payload } = await httpTestServer.request(
          'POST',
          '/api/admin/users/1/authentication-methods/invalid-id',
        );

        // then
        expect(statusCode).to.equal(400);
        expect(JSON.parse(payload).errors[0].detail).to.equal('"authenticationMethodId" must be a number');
      });

      it('returns 400 when the payload contains an invalid user id', async function () {
        // given
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);
        const payload = {
          data: {
            attributes: {
              'user-id': 'invalid-user-id',
            },
          },
        };

        // when
        const { statusCode, result } = await httpTestServer.request(
          'POST',
          '/api/admin/users/1/authentication-methods/1',
          payload,
        );

        // then
        expect(statusCode).to.equal(400);
        expect(result.errors[0].detail).to.equal('"data.attributes.user-id" must be a number');
      });

      it(`returns 403 when user don't have access (CERTIF | METIER)`, async function () {
        // given
        sinon.stub(userController, 'reassignAuthenticationMethods').returns('ok');
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        sinon
          .stub(securityPreHandlers, 'checkAdminMemberHasRoleSupport')
          .callsFake((request, h) => h.response({ errors: new Error('forbidden') }).code(403));
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);
        const payload = {
          data: {
            attributes: {
              'user-id': 2,
            },
          },
        };

        // when
        const result = await httpTestServer.request('POST', '/api/admin/users/1/authentication-methods/1', payload);

        // then
        expect(result.statusCode).to.equal(403);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSuperAdmin);
        sinon.assert.calledOnce(securityPreHandlers.checkAdminMemberHasRoleSupport);
        sinon.assert.notCalled(userController.reassignAuthenticationMethods);
      });
    });
  });
});
