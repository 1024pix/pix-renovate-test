import { CertificationCenterInvitation } from '../../../../src/team/domain/models/CertificationCenterInvitation.js';
import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  insertUserWithRoleSuperAdmin,
  knex,
  sinon,
} from '../../../test-helper.js';

describe('Acceptance | Team | Route', function () {
  let server, request;

  beforeEach(async function () {
    server = await createServer();
  });

  describe('POST /api/certification-centers/{id}/invitations', function () {
    let certificationCenterId, userId;
    const CERTIFICATION_CENTER_INVITATIONS_TABLE_NAME = 'certification-center-invitations';

    beforeEach(async function () {
      certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
      userId = databaseBuilder.factory.buildUser().id;

      await databaseBuilder.commit();
    });

    context('When user is not admin of the certification center', function () {
      it('returns an 403 HTTP error code', async function () {
        databaseBuilder.factory.buildCertificationCenterMembership({ userId, certificationCenterId, role: 'MEMBER' });

        await databaseBuilder.commit();

        request = {
          headers: {
            authorization: generateValidRequestAuthorizationHeader(userId),
          },
          method: 'POST',
          url: `/api/certification-centers/${certificationCenterId}/invitations`,
          payload: {},
        };

        // when
        const response = await server.inject(request);

        // then
        expect(response.statusCode).to.equal(403);
      });
    });

    context('When user is admin of the certification center', function () {
      it('returns 204 HTTP status code', async function () {
        const emails = ['dev@example.net', 'com@example.net'];
        databaseBuilder.factory.buildCertificationCenterMembership({ userId, certificationCenterId, role: 'ADMIN' });

        await databaseBuilder.commit();

        request = {
          headers: {
            authorization: generateValidRequestAuthorizationHeader(userId),
          },
          method: 'POST',
          url: `/api/certification-centers/${certificationCenterId}/invitations`,
          payload: {
            data: {
              attributes: {
                emails,
              },
            },
          },
        };

        // when
        const response = await server.inject(request);

        // then
        const certificationCenterInvitations = await knex(CERTIFICATION_CENTER_INVITATIONS_TABLE_NAME)
          .where({ certificationCenterId })
          .whereIn('email', emails);
        expect(response.statusCode).to.equal(204);
        expect(certificationCenterInvitations.length).to.equal(2);
      });
    });
  });

  describe('POST /api/admin/certification-centers/{certificationCenterId}/invitations', function () {
    let clock;
    const now = new Date('2021-05-01');

    beforeEach(async function () {
      clock = sinon.useFakeTimers({
        now,
        toFake: ['Date'],
      });
    });

    afterEach(async function () {
      clock.restore();
    });

    it('returns 201 HTTP status code with created invitation', async function () {
      // given
      const adminMember = await insertUserWithRoleSuperAdmin();
      const certificationCenterId = databaseBuilder.factory.buildCertificationCenter().id;
      await databaseBuilder.commit();

      // when
      const { result, statusCode } = await server.inject({
        headers: {
          authorization: generateValidRequestAuthorizationHeader(adminMember.id),
        },
        method: 'POST',
        payload: {
          data: {
            attributes: {
              email: 'some.user@example.net',
              lang: 'fr-fr',
              role: CertificationCenterInvitation.Roles.ADMIN,
            },
          },
        },
        url: `/api/admin/certification-centers/${certificationCenterId}/invitations`,
      });

      // then
      expect(statusCode).to.equal(201);
      expect(result.data.type).to.equal('certification-center-invitations');
      expect(result.data).to.have.property('id');
      expect(result.data.attributes).to.deep.equal({
        'updated-at': now,
        email: 'some.user@example.net',
        role: 'ADMIN',
      });
    });
  });
});
