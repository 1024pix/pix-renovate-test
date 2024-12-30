import _ from 'lodash';

import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  insertUserWithRoleSuperAdmin,
  knex,
} from '../../../test-helper.js';

describe('Acceptance | API | Certification Center', function () {
  let server, request;

  beforeEach(async function () {
    server = await createServer();
    await insertUserWithRoleSuperAdmin();
  });

  describe('GET /api/certification-centers/{certificationCenterId}/sessions/{sessionId}/divisions', function () {
    it('should return the divisions', async function () {
      // given
      const externalId = 'anExternalId';
      const { certificationCenter, user } = _buildUserWithCertificationCenterMemberShip(externalId);
      const organization = databaseBuilder.factory.buildOrganization({ externalId, type: 'SCO' });

      _buildOrganizationLearners(
        organization,
        { id: 1, division: '2ndB', firstName: 'Laura', lastName: 'Certif4Ever' },
        { id: 2, division: '2ndA', firstName: 'Laura', lastName: 'Booooo' },
        { id: 3, division: '2ndA', firstName: 'Laura', lastName: 'aaaaa' },
        { id: 4, division: '2ndA', firstName: 'Bart', lastName: 'Coucou' },
        { id: 5, division: '2ndA', firstName: 'Arthur', lastName: 'Coucou' },
      );
      await databaseBuilder.commit();

      const request = {
        method: 'GET',
        url: '/api/certification-centers/' + certificationCenter.id + '/divisions',
        headers: { authorization: generateValidRequestAuthorizationHeader(user.id) },
      };

      // when
      const response = await server.inject(request);

      // then
      expect(response.statusCode).to.equal(200);
      expect(_.map(response.result.data, 'id')).to.deep.equal(['2ndA', '2ndB']);
    });
  });

  describe('GET /api/admin/certification-centers/{id}/certification-center-memberships', function () {
    context('when certification center membership is linked to the certification center', function () {
      it('should return 200 HTTP status', async function () {
        // given
        const certificationCenter = databaseBuilder.factory.buildCertificationCenter();
        const user1 = databaseBuilder.factory.buildUser();
        databaseBuilder.factory.buildCertificationCenterMembership({
          certificationCenterId: certificationCenter.id,
          userId: user1.id,
        });
        await databaseBuilder.commit();

        // when
        const response = await server.inject({
          headers: {
            authorization: generateValidRequestAuthorizationHeader(),
          },
          method: 'GET',
          url: `/api/admin/certification-centers/${certificationCenter.id}/certification-center-memberships`,
        });

        // then
        expect(response.statusCode).to.equal(200);
      });

      it('should return certification center memberships', async function () {
        // given
        const certificationCenter = databaseBuilder.factory.buildCertificationCenter();
        const user1 = databaseBuilder.factory.buildUser();
        const user2 = databaseBuilder.factory.buildUser();
        const certificationCenterMembership1 = databaseBuilder.factory.buildCertificationCenterMembership({
          certificationCenterId: certificationCenter.id,
          userId: user1.id,
        });
        const certificationCenterMembership2 = databaseBuilder.factory.buildCertificationCenterMembership({
          certificationCenterId: certificationCenter.id,
          userId: user2.id,
        });
        await databaseBuilder.commit();

        // when
        const response = await server.inject({
          headers: {
            authorization: generateValidRequestAuthorizationHeader(),
          },
          method: 'GET',
          url: `/api/admin/certification-centers/${certificationCenter.id}/certification-center-memberships`,
        });

        // then
        expect(response.result.data[0].id).to.equal(certificationCenterMembership1.id.toString());
        expect(response.result.data[0].attributes['created-at']).to.deep.equal(
          certificationCenterMembership1.createdAt,
        );
        expect(response.result.data[0].attributes['role']).to.deep.equal(certificationCenterMembership1.role);

        expect(response.result.data[1].id).to.equal(certificationCenterMembership2.id.toString());
        expect(response.result.data[1].attributes['created-at']).to.deep.equal(
          certificationCenterMembership2.createdAt,
        );
        expect(response.result.data[1].attributes['role']).to.deep.equal(certificationCenterMembership2.role);

        const expectedIncluded = [
          {
            id: certificationCenter.id.toString(),
            type: 'certificationCenters',
            attributes: {
              name: certificationCenter.name,
              type: certificationCenter.type,
            },
            relationships: {
              sessions: {
                links: {
                  related: `/api/certification-centers/${certificationCenter.id}/sessions`,
                },
              },
            },
          },
          {
            id: user1.id.toString(),
            type: 'users',
            attributes: {
              email: user1.email,
              'first-name': user1.firstName,
              'last-name': user1.lastName,
            },
          },
          {
            id: user2.id.toString(),
            type: 'users',
            attributes: {
              email: user2.email,
              'first-name': user2.firstName,
              'last-name': user2.lastName,
            },
          },
        ];
        expect(response.result.included).to.deep.equal(expectedIncluded);
      });
    });
  });

  describe('GET /api/certification-centers/{id}/session-summaries', function () {
    it('should return 200 http status with serialized sessions summaries', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      const certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
      databaseBuilder.factory.buildCertificationCenterMembership({ userId, certificationCenterId });
      databaseBuilder.factory.buildSession({
        id: 123,
        address: 'ici',
        room: 'labas',
        date: '2021-05-05',
        time: '17:00:00',
        examiner: 'Jeanine',
        finalizedAt: null,
        publishedAt: null,
        certificationCenterId,
      });
      const candidate = databaseBuilder.factory.buildCertificationCandidate({ sessionId: 123 });
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
      await databaseBuilder.commit();
      const request = {
        headers: {
          authorization: generateValidRequestAuthorizationHeader(userId),
        },
        method: 'GET',
        url: `/api/certification-centers/${certificationCenterId}/session-summaries?page[number]=1&page[size]=10`,
      };

      // when
      const response = await server.inject(request);

      // then
      expect(response.statusCode).to.equal(200);
      expect(response.result.data).to.deep.equal([
        {
          type: 'session-summaries',
          id: '123',
          attributes: {
            address: 'ici',
            room: 'labas',
            date: '2021-05-05',
            time: '17:00:00',
            examiner: 'Jeanine',
            'enrolled-candidates-count': 1,
            'effective-candidates-count': 0,
            status: 'created',
          },
        },
      ]);
    });
  });

  describe('POST /api/admin/certification-centers/{certificationCenterId}/certification-center-memberships', function () {
    let certificationCenterId;
    let email;

    beforeEach(async function () {
      email = 'user@example.net';

      certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
      databaseBuilder.factory.buildUser({ email });

      request = {
        headers: {
          authorization: generateValidRequestAuthorizationHeader(),
        },
        method: 'POST',
        url: `/api/admin/certification-centers/${certificationCenterId}/certification-center-memberships`,
        payload: { email },
      };

      await databaseBuilder.commit();
    });

    it('should return 201 HTTP status', async function () {
      // when
      const response = await server.inject(request);

      // then
      expect(response.statusCode).to.equal(201);
    });

    context('when user is not SuperAdmin', function () {
      it('should return 403 HTTP status code ', async function () {
        // given
        request.headers.authorization = generateValidRequestAuthorizationHeader(1111);

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    context('when user is not authenticated', function () {
      it('should return 401 HTTP status code', async function () {
        // given
        request.headers.authorization = 'invalid.access.token';

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(401);
      });
    });

    context('when certification center does not exist', function () {
      it('should return 404 HTTP status code', async function () {
        // given
        request.url = '/api/admin/certification-centers/1/certification-center-memberships';

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(400);
      });
    });

    context("when user's email does not exist", function () {
      it('should return 404 HTTP status code', async function () {
        // given
        request.payload.email = 'notexist@example.net';

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(404);
      });
    });

    context('when user is already member of the certification center', function () {
      it('should return 412 HTTP status code', async function () {
        // given
        email = 'alreadyExist@example.net';
        const userId = databaseBuilder.factory.buildUser({ email }).id;
        databaseBuilder.factory.buildCertificationCenterMembership({
          certificationCenterId,
          userId,
        });
        request.payload.email = email;

        await databaseBuilder.commit();

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(412);
      });
    });
  });

  describe('POST /api/certif/certification-centers/{certificationCenterId}/update-referer', function () {
    it('should return 204 HTTP status', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      const certificationCenterMemberId = databaseBuilder.factory.buildUser().id;
      const certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
      databaseBuilder.factory.buildCertificationCenterMembership({
        userId,
        certificationCenterId,
        isReferer: false,
      });
      databaseBuilder.factory.buildCertificationCenterMembership({
        userId: certificationCenterMemberId,
        certificationCenterId,
        isReferer: false,
        role: 'ADMIN',
      });
      await databaseBuilder.commit();

      const payload = {
        data: {
          attributes: {
            isReferer: true,
            userId,
          },
        },
      };

      const options = {
        method: 'POST',
        url: `/api/certif/certification-centers/${certificationCenterId}/update-referer`,
        payload,
        headers: { authorization: generateValidRequestAuthorizationHeader(certificationCenterMemberId) },
      };

      // when
      const response = await server.inject(options);

      // then
      expect(response.statusCode).to.equal(204);
    });
  });

  describe('POST /api/certification-centers/{certificationCenterId}/session', function () {
    describe('when certification center is not V3 certification pilot center', function () {
      it('should return a 200 HTTP status with a V2 session', async function () {
        // given
        const userId = databaseBuilder.factory.buildUser().id;
        const certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
        databaseBuilder.factory.buildCertificationCenterMembership({
          userId,
          certificationCenterId,
        });
        await databaseBuilder.commit();

        const payload = {
          data: {
            attributes: {
              address: 'site',
              'access-code': null,
              date: '2023-06-17',
              time: '12:00',
              description: null,
              examiner: 'surveillant',
              room: 'salle',
              'certification-center-id': certificationCenterId,
            },
            type: 'sessions',
          },
        };

        const options = {
          method: 'POST',
          url: `/api/certification-centers/${certificationCenterId}/session`,
          payload,
          headers: { authorization: generateValidRequestAuthorizationHeader(userId) },
        };

        // when
        const response = await server.inject(options);

        // then
        expect(response.statusCode).to.equal(200);
        const [session] = await knex('sessions');
        expect(session.version).to.equal(2);
      });
    });

    describe('when certification center is a V3 certification pilot center', function () {
      it('should return a 200 HTTP status with a V3 session', async function () {
        // given
        const userId = databaseBuilder.factory.buildUser().id;
        const certificationCenterId = databaseBuilder.factory.buildCertificationCenter({ isV3Pilot: true }).id;
        databaseBuilder.factory.buildCertificationCenterMembership({
          userId,
          certificationCenterId,
        });
        await databaseBuilder.commit();

        const payload = {
          data: {
            attributes: {
              address: 'site',
              'access-code': null,
              date: '2023-06-17',
              time: '12:00',
              description: null,
              examiner: 'surveillant',
              room: 'salle',
              status: null,
              'examiner-global-comment': null,
              'supervisor-password': null,
              'has-supervisor-access': false,
              'has-some-clea-acquired': false,
              'has-incident': false,
              'has-joining-issue': false,
              'certification-center-id': certificationCenterId,
            },
            type: 'sessions',
          },
        };

        const options = {
          method: 'POST',
          url: `/api/certification-centers/${certificationCenterId}/session`,
          payload,
          headers: { authorization: generateValidRequestAuthorizationHeader(userId) },
        };

        // when
        const response = await server.inject(options);

        // then
        expect(response.statusCode).to.equal(200);
        const [session] = await knex('sessions');
        expect(session.version).to.equal(3);
      });
    });
  });

  function _buildOrganizationLearners(organization, ...students) {
    const AFTER_BEGINNING_OF_THE_2020_SCHOOL_YEAR = '2020-10-15';
    return students.map((student) =>
      databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        ...student,
        updatedAt: AFTER_BEGINNING_OF_THE_2020_SCHOOL_YEAR,
      }),
    );
  }

  function _buildUserWithCertificationCenterMemberShip(certificationCenterExternalId) {
    const user = databaseBuilder.factory.buildUser({});
    const certificationCenter = databaseBuilder.factory.buildCertificationCenter({
      externalId: certificationCenterExternalId,
      type: 'SCO',
    });
    databaseBuilder.factory.buildCertificationCenterMembership({
      certificationCenterId: certificationCenter.id,
      userId: user.id,
    });
    return { user, certificationCenter };
  }
});
