import { PIX_ADMIN } from '../../../../src/authorization/domain/constants.js';
import {
  createServer,
  databaseBuilder,
  expect,
  generateValidRequestAuthorizationHeader,
  insertUserWithRoleSuperAdmin,
} from '../../../test-helper.js';

const { ROLES } = PIX_ADMIN;

describe('Acceptance | Application | Admin-members | Routes', function () {
  describe('GET /api/admin/admin-members/me', function () {
    it('should return 200 http status code', async function () {
      // given
      databaseBuilder.factory.buildUser.withRole();
      const admin = await insertUserWithRoleSuperAdmin();
      await databaseBuilder.commit();
      const server = await createServer();

      // when
      const response = await server.inject({
        headers: {
          authorization: generateValidRequestAuthorizationHeader(admin.id),
        },
        method: 'GET',
        url: '/api/admin/admin-members/me',
      });

      // then
      expect(response.statusCode).to.equal(200);
    });

    context('when user is not a member of pix admin and has no role', function () {
      it('should return 403 http status code', async function () {
        // given
        const user = databaseBuilder.factory.buildUser();
        await databaseBuilder.commit();
        const server = await createServer();

        // when
        const response = await server.inject({
          headers: {
            authorization: generateValidRequestAuthorizationHeader(user.id),
          },
          method: 'GET',
          url: '/api/admin/admin-members/me',
        });

        // then
        expect(response.statusCode).to.equal(403);
        expect(response.statusMessage).to.equal('Forbidden');
      });
    });
  });

  describe('PATCH /api/admin/admin-members/{id}', function () {
    it('should return 200 http status code if admin member has role "SUPER_ADMIN"', async function () {
      // given
      const superAdmin = databaseBuilder.factory.buildUser.withRole();
      const pixAdminUserToUpdate = databaseBuilder.factory.buildUser.withRole();
      const pixAdminRole = databaseBuilder.factory.buildPixAdminRole({
        userId: pixAdminUserToUpdate.id,
        role: ROLES.SUPPORT,
      });
      await databaseBuilder.commit();
      const server = await createServer();

      // when
      const response = await server.inject({
        headers: {
          authorization: generateValidRequestAuthorizationHeader(superAdmin.id),
        },
        method: 'PATCH',
        url: `/api/admin/admin-members/${pixAdminRole.id}`,
        payload: {
          data: {
            attributes: {
              role: ROLES.CERTIF,
            },
          },
        },
      });

      // then
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('PUT /api/admin/admin-members/{id}/deactivate', function () {
    it('should return 204 http status code if admin member has role "SUPER_ADMIN" and admin member has been successfully deactivated', async function () {
      // given
      const superAdmin = await databaseBuilder.factory.buildUser.withRole({ role: ROLES.SUPER_ADMIN });
      const user = databaseBuilder.factory.buildUser();
      const adminMemberToDeactivate = databaseBuilder.factory.buildPixAdminRole({
        userId: user.id,
        role: ROLES.SUPPORT,
      });

      await databaseBuilder.commit();
      const server = await createServer();

      // when
      const response = await server.inject({
        headers: {
          authorization: generateValidRequestAuthorizationHeader(superAdmin.id),
        },
        method: 'PUT',
        url: `/api/admin/admin-members/${adminMemberToDeactivate.id}/deactivate`,
      });

      // then
      expect(response.statusCode).to.equal(204);
    });
  });
});
