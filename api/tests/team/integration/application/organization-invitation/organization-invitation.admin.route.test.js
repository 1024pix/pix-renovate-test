import { securityPreHandlers } from '../../../../../src/shared/application/security-pre-handlers.js';
import { organizationInvitationController } from '../../../../../src/team/application/organization-invitations/organization-invitation.controller.js';
import { teamRoutes } from '../../../../../src/team/application/routes.js';
import { expect, HttpTestServer, sinon } from '../../../../test-helper.js';

describe('Integration | Team | Application | Route | Admin | organization-invitations', function () {
  describe('GET /api/admin/organizations/{id}/invitations', function () {
    it('returns an HTTP status code 200', async function () {
      // given
      const method = 'GET';
      const url = '/api/admin/organizations/1/invitations';

      sinon.stub(securityPreHandlers, 'hasAtLeastOneAccessOf').returns(() => true);
      sinon.stub(organizationInvitationController, 'findPendingInvitations').returns('ok');
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(teamRoutes[0]);

      // when
      const response = await httpTestServer.request(method, url);

      // then
      expect(response.statusCode).to.equal(200);
      expect(organizationInvitationController.findPendingInvitations).to.have.been.calledOnce;
    });
  });

  describe('POST /api/organization-invitations/{id}/response', function () {
    const method = 'POST';
    const url = '/api/organization-invitations/1/response';
    let httpTestServer;

    beforeEach(async function () {
      sinon
        .stub(organizationInvitationController, 'acceptOrganizationInvitation')
        .callsFake((request, h) => h.response().code(204));

      httpTestServer = new HttpTestServer();
      await httpTestServer.register(teamRoutes[0]);
    });

    it('should return 200 when payload is valid', async function () {
      // given
      const payload = {
        data: {
          id: '100047_DZWMP7L5UM',
          type: 'organization-invitation-responses',
          attributes: {
            code: 'DZWMP7L5UM',
            email: 'user@example.net',
          },
        },
      };

      // when
      const response = await httpTestServer.request(method, url, payload);

      // then
      expect(response.statusCode).to.equal(204);
    });

    it('should return 400 when payload is missing', async function () {
      // when
      const response = await httpTestServer.request(method, url);

      // then
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('DELETE /api/admin/organizations/:organizationId/invitations/:organizationInvitationId', function () {
    it('returns an HTTP status code 204', async function () {
      // given
      const method = 'DELETE';
      const url = '/api/admin/organizations/1/invitations/1';

      sinon.stub(securityPreHandlers, 'hasAtLeastOneAccessOf').returns(() => true);
      sinon
        .stub(organizationInvitationController, 'cancelOrganizationInvitation')
        .returns((request, h) => h.response().code(204));

      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(teamRoutes[0]);

      // when
      const { statusCode } = await httpTestServer.request(method, url);

      // then
      expect(statusCode).to.equal(204);
      expect(organizationInvitationController.cancelOrganizationInvitation).to.have.been.calledOnce;
    });
  });
});
