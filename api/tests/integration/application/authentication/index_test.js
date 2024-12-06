import { tokenService } from '../../../../src/shared/domain/services/token-service.js';
import { createServer, databaseBuilder, expect } from '../../../test-helper.js';

describe('Integration | Application | Route | AuthenticationRouter', function () {
  let server;

  beforeEach(async function () {
    server = await createServer();
  });

  describe('POST /api/token-from-external-user', function () {
    const method = 'POST';
    const url = '/api/token-from-external-user';

    let payload;

    beforeEach(function () {
      payload = {
        data: {
          attributes: {
            username: 'saml.jackson0101',
            password: 'password',
            'external-user-token': 'expectedExternalToken',
            'expected-user-id': 1,
          },
          type: 'external-user-authentication-requests',
        },
      };
    });

    it('should return a 400 Bad Request if username is missing', async function () {
      // given
      payload.data.attributes.username = undefined;

      // when
      const response = await server.inject({ method, url, payload });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('should return a 400 Bad Request if password is missing', async function () {
      // given
      payload.data.attributes.password = undefined;

      // when
      const response = await server.inject({ method, url, payload });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('should return a 400 Bad Request if external-user-token is missing', async function () {
      // given
      payload.data.attributes['external-user-token'] = undefined;

      // when
      const response = await server.inject({ method, url, payload });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('should return a 400 Bad Request if expected-user-id is missing', async function () {
      // given
      payload.data.attributes['expected-user-id'] = undefined;

      // when
      const response = await server.inject({ method, url, payload });

      // then
      expect(response.statusCode).to.equal(400);
    });

    context('when user is blocked', function () {
      context('when the given username is an email', function () {
        it('returns 403', async function () {
          // given
          const email = 'i.am.blocked@example.net';
          const password = 'pix123';
          const userAttributes = {
            firstName: 'I_am',
            lastName: 'Blocked',
            samlId: 'someSamlId',
          };
          const user = databaseBuilder.factory.buildUser.withRawPassword({
            email,
            rawPassword: password,
          });
          databaseBuilder.factory.buildUserLogin({ userId: user.id, failureCount: 50, blockedAt: new Date() });
          const expectedExternalToken = tokenService.createIdTokenForUserReconciliation(userAttributes);

          await databaseBuilder.commit();

          const options = {
            method: 'POST',
            url: '/api/token-from-external-user',
            payload: {
              data: {
                attributes: {
                  username: email,
                  password,
                  'external-user-token': expectedExternalToken,
                  'expected-user-id': user.id,
                },
                type: 'external-user-authentication-requests',
              },
            },
          };

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(403);
        });
      });

      context('when the given username is not an email', function () {
        it('returns 403', async function () {
          // given
          const username = 'i_am_blocked';
          const password = 'pix123';
          const userAttributes = {
            firstName: 'I_am',
            lastName: 'Blocked',
            samlId: 'someSamlId',
          };
          const user = databaseBuilder.factory.buildUser.withRawPassword({
            username,
            rawPassword: password,
          });
          databaseBuilder.factory.buildUserLogin({ userId: user.id, failureCount: 50, blockedAt: new Date() });
          const expectedExternalToken = tokenService.createIdTokenForUserReconciliation(userAttributes);

          await databaseBuilder.commit();

          const options = {
            method: 'POST',
            url: '/api/token-from-external-user',
            payload: {
              data: {
                attributes: {
                  username,
                  password,
                  'external-user-token': expectedExternalToken,
                  'expected-user-id': user.id,
                },
                type: 'external-user-authentication-requests',
              },
            },
          };

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(403);
        });
      });
    });
  });
});
