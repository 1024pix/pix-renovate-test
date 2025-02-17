import { PIX_ADMIN } from '../../../../../src/authorization/domain/constants.js';
import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  knex,
} from '../../../../test-helper.js';

describe('Acceptance | Application | flash-assessment-configuration-route', function () {
  let server;

  beforeEach(async function () {
    server = await createServer();
  });

  describe('GET /api/flash-assessment-configuration', function () {
    describe('when called without being authenticated', function () {
      it('should return a 401', async function () {
        // given
        const options = {
          method: 'GET',
          url: '/api/admin/flash-assessment-configuration',
        };
        // when
        const response = await server.inject(options);
        // then
        expect(response.statusCode).to.equal(401);
      });
    });

    describe('when called without a super admin role', function () {
      it('should return a 403', async function () {
        // given
        const authorization = generateValidRequestAuthorizationHeader();

        const options = {
          method: 'GET',
          url: '/api/admin/flash-assessment-configuration',
          headers: {
            authorization,
          },
        };
        // when
        const response = await server.inject(options);
        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    describe('when called with a super admin role', function () {
      describe('when there is an available configuration', function () {
        it('should return a 200', async function () {
          // given
          const enablePassageByAllCompetences = true;
          const superAdmin = databaseBuilder.factory.buildUser.withRole({
            role: PIX_ADMIN.ROLES.SUPER_ADMIN,
          });

          databaseBuilder.factory.buildFlashAlgorithmConfiguration({
            createdAt: new Date('2020-01-01'),
          });

          databaseBuilder.factory.buildFlashAlgorithmConfiguration({
            createdAt: new Date('2021-01-01'),
            enablePassageByAllCompetences,
          });

          await databaseBuilder.commit();

          const authorization = generateValidRequestAuthorizationHeader(superAdmin.id);

          const options = {
            method: 'GET',
            url: '/api/admin/flash-assessment-configuration',
            headers: {
              authorization,
            },
          };

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(200);
          expect(response.result.data.attributes['enable-passage-by-all-competences']).to.be.true;
        });
      });
    });
  });

  describe('POST /api/flash-assessment-configuration', function () {
    describe('when called without being authenticated', function () {
      it('should return a 401', async function () {
        // given
        const options = {
          method: 'POST',
          url: '/api/admin/flash-assessment-configuration',
        };
        // when
        const response = await server.inject(options);
        // then
        expect(response.statusCode).to.equal(401);
      });
    });

    describe('when called without a super admin role', function () {
      it('should return a 403', async function () {
        // given
        const authorization = generateValidRequestAuthorizationHeader();

        const options = {
          method: 'POST',
          url: '/api/admin/flash-assessment-configuration',
          headers: {
            authorization,
          },
          payload: {},
        };

        // when
        const response = await server.inject(options);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    describe('when called with a super admin role', function () {
      describe('when called with an invalid payload', function () {
        it('should return a 400', async function () {
          // given
          const superAdmin = databaseBuilder.factory.buildUser.withRole({
            role: PIX_ADMIN.ROLES.SUPER_ADMIN,
          });

          databaseBuilder.factory.buildFlashAlgorithmConfiguration({
            variationPercent: 0.2,
            createdAt: new Date('2020-01-01'),
          });

          await databaseBuilder.commit();

          const authorization = generateValidRequestAuthorizationHeader(superAdmin.id);

          const options = {
            method: 'POST',
            url: '/api/admin/flash-assessment-configuration',
            headers: {
              authorization,
            },
            payload: {
              lol: 0.5,
            },
          };

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(400);
        });
      });

      describe('when called with a valid payload', function () {
        it('should return a 204 and update the configuration', async function () {
          // given
          const superAdmin = databaseBuilder.factory.buildUser.withRole({
            role: PIX_ADMIN.ROLES.SUPER_ADMIN,
          });

          databaseBuilder.factory.buildFlashAlgorithmConfiguration({
            variationPercent: 0.2,
            createdAt: new Date('2020-01-01'),
          });

          await databaseBuilder.commit();

          const authorization = generateValidRequestAuthorizationHeader(superAdmin.id);

          const options = {
            method: 'POST',
            url: '/api/admin/flash-assessment-configuration',
            headers: {
              authorization,
            },
            payload: {
              variationPercent: 0.5,
            },
          };

          // when
          const response = await server.inject(options);

          // then
          expect(response.statusCode).to.equal(204);

          const { count: configurationsCount } = await knex('flash-algorithm-configurations').count().first();

          expect(configurationsCount).to.equal(2);

          const configuration = await knex('flash-algorithm-configurations').orderBy('createdAt', 'desc').first();
          expect(configuration.variationPercent).to.equal(0.5);
        });
      });
    });
  });
});
