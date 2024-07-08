import Joi from 'joi';

import { securityPreHandlers } from '../../../shared/application/security-pre-handlers.js';
import { identifiersType } from '../../../shared/domain/types/identifiers-type.js';
import { organizationInvitationController } from './organization-invitation.controller.js';

export const organizationInvitationAdminRoutes = [
  {
    method: 'DELETE',
    path: '/api/admin/organizations/{id}/invitations/{organizationInvitationId}',
    config: {
      pre: [
        {
          method: (request, h) =>
            securityPreHandlers.hasAtLeastOneAccessOf([
              securityPreHandlers.checkAdminMemberHasRoleSuperAdmin,
              securityPreHandlers.checkAdminMemberHasRoleSupport,
              securityPreHandlers.checkAdminMemberHasRoleMetier,
            ])(request, h),
          assign: 'hasAuthorizationToAccessAdminScope',
        },
      ],
      validate: {
        params: Joi.object({
          id: identifiersType.organizationId,
          organizationInvitationId: identifiersType.organizationInvitationId,
        }),
      },
      handler: (request, h) => organizationInvitationController.cancelOrganizationInvitation(request, h),
      tags: ['team', 'api', 'admin', 'invitations', 'cancel'],
      notes: [
        "- **Cette route est restreinte aux utilisateurs authentifiés ayant les droits d'accès**\n" +
          "- Elle permet d'annuler une invitation envoyée mais non acceptée encore.",
      ],
    },
  },
];
