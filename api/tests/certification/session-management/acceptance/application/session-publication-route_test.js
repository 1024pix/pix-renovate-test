import { status } from '../../../../../src/shared/domain/models/AssessmentResult.js';
import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  knex,
  sinon,
} from '../../../../test-helper.js';

describe('Certification | Session-Management | Acceptance | Application | Routes | session-publication', function () {
  describe('PATCH /api/admin/sessions/:id/publish', function () {
    let server;
    const options = { method: 'PATCH' };
    let userId;

    beforeEach(async function () {
      server = await createServer();
    });

    context('when user does not have the role Super Admin', function () {
      beforeEach(function () {
        userId = databaseBuilder.factory.buildUser().id;
        return databaseBuilder.commit();
      });

      it('should return a 403 error code', async function () {
        // given
        options.url = '/api/admin/sessions/1/publish';
        options.headers = { authorization: generateValidRequestAuthorizationHeader(userId) };

        // when
        const response = await server.inject(options);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    context('when user has role Super Admin', function () {
      beforeEach(function () {
        // given
        userId = databaseBuilder.factory.buildUser.withRole().id;
        options.headers = { authorization: generateValidRequestAuthorizationHeader(userId) };
        return databaseBuilder.commit();
      });

      context('when the session id has an invalid format', function () {
        it('should return a 400 error code', async function () {
          // given
          options.url = '/api/admin/sessions/any/publish';

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(400);
        });
      });

      context('when the session id is a number', function () {
        context('when the session does not exist', function () {
          it('should return a 404 error code', async function () {
            // given
            options.url = '/api/admin/sessions/1/publish';

            // when
            const response = await server.inject(options);

            // then
            expect(response.statusCode).to.equal(404);
          });
        });

        context('when the session exists', function () {
          let sessionId;
          let certificationId;
          const now = new Date('2000-01-01T10:00:00Z');

          let clock;

          afterEach(async function () {
            clock.restore();
          });

          beforeEach(function () {
            clock = sinon.useFakeTimers({
              now,
              toFake: ['Date'],
            });
            sessionId = databaseBuilder.factory.buildSession({ publishedAt: null }).id;
            databaseBuilder.factory.buildFinalizedSession({ sessionId });
            options.url = `/api/admin/sessions/${sessionId}/publish`;
            certificationId = databaseBuilder.factory.buildCertificationCourse({ sessionId, isPublished: false }).id;
            databaseBuilder.factory.buildAssessmentResult.last({
              certificationCourseId: certificationId,
              status: status.VALIDATED,
            });

            return databaseBuilder.commit();
          });

          it('should return a 200 status code', async function () {
            // when
            const response = await server.inject(options);

            // then
            expect(response.statusCode).to.equal(200);
          });

          it('should return the serialized session with an updated publishedAt date', async function () {
            // when
            const response = await server.inject(options);

            // then
            // expect(response.result.data.attributes['published-at']).to.be.an.instanceOf(Date);
            expect(response.result.data.attributes['published-at']).deepEqualInstance(now);
          });

          it('should update the published information', async function () {
            // when
            await server.inject(options);

            // then
            const [certificationCourse] = await knex('certification-courses').where({ id: certificationId });
            const [session] = await knex('sessions').where({ id: sessionId });
            expect(certificationCourse.isPublished).to.be.true;
            expect(session.publishedAt).deepEqualInstance(now);
          });
        });
      });
    });
  });

  describe('PATCH /api/admin/sessions/:id/unpublish', function () {
    let server;
    const options = { method: 'PATCH' };
    let userId;

    beforeEach(async function () {
      server = await createServer();
    });

    context('when user does not have the role Super Admin', function () {
      beforeEach(function () {
        userId = databaseBuilder.factory.buildUser().id;
        return databaseBuilder.commit();
      });

      it('should return a 403 error code', async function () {
        // given
        options.url = '/api/admin/sessions/1/unpublish';
        options.headers = { authorization: generateValidRequestAuthorizationHeader(userId) };

        // when
        const response = await server.inject(options);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    context('when user has role Super Admin', function () {
      beforeEach(function () {
        // given
        userId = databaseBuilder.factory.buildUser.withRole().id;
        options.headers = { authorization: generateValidRequestAuthorizationHeader(userId) };
        return databaseBuilder.commit();
      });

      context('when the session id has an invalid format', function () {
        it('should return a 400 error code', async function () {
          // given
          options.url = '/api/admin/sessions/any/unpublish';

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(400);
        });
      });

      context('when the session id is a number', function () {
        context('when the session does not exist', function () {
          it('should return a 404 error code', async function () {
            // given
            options.url = '/api/admin/sessions/1/unpublish';

            // when
            const response = await server.inject(options);

            // then
            expect(response.statusCode).to.equal(404);
          });
        });

        context('when the session exists', function () {
          let sessionId;
          let certificationId;
          const date = new Date('2000-01-01T10:00:00Z');

          beforeEach(function () {
            sessionId = databaseBuilder.factory.buildSession({ publishedAt: date }).id;
            databaseBuilder.factory.buildFinalizedSession({ sessionId, publishedAt: date });
            options.url = `/api/admin/sessions/${sessionId}/unpublish`;
            certificationId = databaseBuilder.factory.buildCertificationCourse({
              sessionId,
              isPublished: true,
            }).id;

            return databaseBuilder.commit();
          });

          it('should return a 200 status code', async function () {
            // when
            const response = await server.inject(options);

            // then
            expect(response.statusCode).to.equal(200);
          });

          it('should update the published information', async function () {
            // when
            await server.inject(options);

            // then
            const [session] = await knex('sessions').where({ id: sessionId });
            const [certificationCourse] = await knex('certification-courses').where({ id: certificationId });
            expect(session.publishedAt).to.be.null;
            expect(certificationCourse.isPublished).to.be.false;
          });
        });
      });
    });
  });
});
