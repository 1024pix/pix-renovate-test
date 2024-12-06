import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
} from '../../../test-helper.js';

describe('Acceptance | Route | Certification Centers', function () {
  let server;

  beforeEach(async function () {
    server = await createServer();
  });

  describe('GET /api/certification-centers/{certificationCenterId}/divisions', function () {
    it('should return 200 with divisions', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      const externalId = 'baldurs-gates';
      const certificationCenterId = databaseBuilder.factory.buildCertificationCenter({
        externalId,
        type: 'SCO',
      }).id;
      databaseBuilder.factory.buildCertificationCenterMembership({ userId, certificationCenterId });
      const organizationId = databaseBuilder.factory.buildOrganization({ externalId, type: 'SCO' }).id;
      databaseBuilder.factory.buildOrganizationLearner({
        id: 1,
        organizationId,
        division: '2ndB',
        firstName: 'Laura',
        lastName: 'Certif4Ever',
      });
      await databaseBuilder.commit();

      // when
      const { result, statusCode } = await server.inject({
        headers: {
          authorization: generateValidRequestAuthorizationHeader(userId),
        },
        method: 'GET',
        payload: {},
        url: `/api/certification-centers/${certificationCenterId}/divisions`,
      });

      // then
      expect(statusCode).to.equal(200);
      expect(result).to.deep.equal({
        data: [
          {
            type: 'divisions',
            id: '2ndB',
            attributes: {
              name: '2ndB',
            },
          },
        ],
      });
    });
  });
});
