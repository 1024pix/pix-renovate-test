import querystring from 'node:querystring';

import { tokenController } from '../../../src/identity-access-management/application/token/token.controller.js';
import { createServer, expect, sinon } from '../../test-helper.js';

describe('Integration | Identity Access Management | Application | Router', function () {
  let server;

  beforeEach(async function () {
    sinon.stub(tokenController, 'createToken').callsFake((request, h) =>
      h.response({
        token_type: 'bearer',
        access_token: 'some-jwt-access-token',
        user_id: 'the-user-id',
      }),
    );
    server = await createServer();
  });

  describe('POST /api/token', function () {
    const method = 'POST';
    const url = '/api/token';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    };

    it('returns a response with HTTP status code 200 even if there is no scope in the request', async function () {
      // given
      const payload = querystring.stringify({
        grant_type: 'password',
        username: 'user@email.com',
        password: 'user_password',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('returns a 400 when grant type is not "password"', async function () {
      // given
      const payload = querystring.stringify({
        grant_type: 'authorization_code',
        username: 'valid@email.com',
        password: 'valid_password',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('returns a 400 when username is missing', async function () {
      // given
      const payload = querystring.stringify({
        grant_type: 'password',
        password: 'valid_password',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('returns a 400 when password is missing', async function () {
      // given
      const payload = querystring.stringify({
        grant_type: 'password',
        username: 'valid@email.com',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('returns a 400 when username is not an email', async function () {
      // given
      const payload = querystring.stringify({
        grant_type: 'authorization_code',
        username: 'a_login_not_an_email',
        password: 'valid_password',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('returns a JSON API error (415) when request "Content-Type" header is not "application/x-www-form-urlencoded"', async function () {
      // given
      headers['content-type'] = 'text/html';
      const payload = querystring.stringify({
        grant_type: 'password',
        username: 'user.username2453  ',
        password: 'user_password',
        scope: 'pix-orga',
      });

      // when
      const response = await server.inject({ method, url, payload, auth: null, headers });

      // then
      expect(response.statusCode).to.equal(415);
    });
  });
});
