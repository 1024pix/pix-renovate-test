import {
  SessionAlreadyFinalizedError,
  SessionWithAbortReasonOnCompletedCertificationCourseError,
  SessionWithoutStartedCertificationError,
} from '../../../../src/certification/session-management/domain/errors.js';
import { SiecleXmlImportError } from '../../../../src/prescription/learner-management/domain/errors.js';
import * as DomainErrors from '../../../../src/shared/domain/errors.js';
import { expect, HttpTestServer, sinon } from '../../../test-helper.js';

describe('Integration | API | Controller Error', function () {
  let server;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line mocha/no-setup-in-describe
  const routeHandler = sinon.stub();

  const routeUrl = '/test_route';
  const request = { method: 'GET', url: routeUrl };

  function responseDetail(response) {
    const payload = JSON.parse(response.payload);
    return payload.errors[0].detail;
  }

  function responseCode(response) {
    const payload = JSON.parse(response.payload);
    return payload.errors[0].code;
  }

  before(async function () {
    const moduleUnderTest = {
      name: 'test-route',
      register: async function (server) {
        server.route([
          {
            method: 'GET',
            path: routeUrl,
            handler: routeHandler,
            config: {
              auth: false,
            },
          },
        ]);
      },
    };
    server = new HttpTestServer({ mustThrowOn5XXError: false });
    await server.register(moduleUnderTest);
  });

  context('412 Precondition Failed', function () {
    const PRECONDITION_FAILED = 412;
    it('responds Precondition Failed when a SiecleXmlImportError error occurs', async function () {
      routeHandler.throws(new SiecleXmlImportError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(PRECONDITION_FAILED);
    });
  });

  context('409 Conflict', function () {
    const CONFLICT_ERROR = 409;

    it('responds Conflict when a SessionWithAbortReasonOnCompletedCertificationCourseError error occurs', async function () {
      routeHandler.throws(new SessionWithAbortReasonOnCompletedCertificationCourseError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(CONFLICT_ERROR);
      expect(responseCode(response)).to.equal('SESSION_WITH_ABORT_REASON_ON_COMPLETED_CERTIFICATION_COURSE');
    });

    it('responds Conflict when a SessionAlreadyFinalizedError error occurs', async function () {
      routeHandler.throws(new SessionAlreadyFinalizedError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(CONFLICT_ERROR);
      expect(responseCode(response)).to.equal('SESSION_ALREADY_FINALIZED');
    });
  });

  context('400 Bad Request', function () {
    const BAD_REQUEST_ERROR = 400;

    it('responds Bad Request when a SessionWithoutStartedCertificationError error occurs', async function () {
      routeHandler.throws(new SessionWithoutStartedCertificationError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(BAD_REQUEST_ERROR);
      expect(responseDetail(response)).to.equal(
        "This session hasn't started, you can't finalise it. However, you can delete it.",
      );
      expect(responseCode(response)).to.equal('SESSION_WITHOUT_STARTED_CERTIFICATION');
    });

    it('responds Bad Request when a InvalidSessionResultTokenError error occurs', async function () {
      routeHandler.throws(new DomainErrors.InvalidSessionResultTokenError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(BAD_REQUEST_ERROR);
      expect(responseDetail(response)).to.equal(
        'The token used to retrieve the results of the certification session is invalid.',
      );
      expect(responseCode(response)).to.equal('INVALID_SESSION_RESULT_TOKEN');
    });
  });

  context('403 Forbidden', function () {
    const FORBIDDEN_ERROR = 403;

    it('responds Forbidden when a UserNotAuthorizedToAccessEntityError error occurs', async function () {
      routeHandler.throws(new DomainErrors.UserNotAuthorizedToAccessEntityError());
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(FORBIDDEN_ERROR);
      expect(responseDetail(response)).to.equal('Utilisateur non autorisé à accéder à la ressource');
    });
    it('responds Forbidden when a UserNotAuthorizedToUpdatePasswordError error occurs', async function () {
      routeHandler.throws(
        new DomainErrors.UserNotAuthorizedToUpdatePasswordError(
          "Cet utilisateur n'est pas autorisé à récupérer les résultats de la campagne.",
        ),
      );
      const response = await server.requestObject(request);

      expect(response.statusCode).to.equal(FORBIDDEN_ERROR);
      expect(responseDetail(response)).to.equal(
        "Cet utilisateur n'est pas autorisé à récupérer les résultats de la campagne.",
      );
    });
  });
});
