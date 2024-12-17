import * as moduleUnderTest from '../../../../lib/application/sessions/index.js';
import { sessionController } from '../../../../lib/application/sessions/session-controller.js';
import { authorization } from '../../../../src/certification/shared/application/pre-handlers/authorization.js';
import { NotFoundError } from '../../../../src/shared/application/http-errors.js';
import { securityPreHandlers } from '../../../../src/shared/application/security-pre-handlers.js';
import { expect, HttpTestServer, sinon } from '../../../test-helper.js';

describe('Unit | Application | Sessions | Routes', function () {
  describe('For admin', function () {
    describe('GET /api/admin/sessions/{id}/jury-certification-summaries', function () {
      it('should exist', async function () {
        // given
        sinon.stub(securityPreHandlers, 'hasAtLeastOneAccessOf').returns(() => true);
        sinon.stub(sessionController, 'getJuryCertificationSummaries').returns('ok');
        const httpTestServer = new HttpTestServer();
        await httpTestServer.register(moduleUnderTest);

        // when
        const response = await httpTestServer.request('GET', '/api/admin/sessions/1/jury-certification-summaries');

        // then
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  describe('DELETE /api/sessions/{id}', function () {
    it('returns a 404 NOT_FOUND error if verifySessionAuthorization fails', async function () {
      // given
      sinon.stub(authorization, 'verifySessionAuthorization').throws(new NotFoundError());
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('DELETE', '/api/sessions/3');

      // then
      expect(response.statusCode).to.equal(404);
    });
  });
});
