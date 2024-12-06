import { certificationCenterMembershipController } from '../../../../lib/application/certification-center-memberships/certification-center-membership-controller.js';
import { securityPreHandlers } from '../../../shared/application/security-pre-handlers.js';

export const certificationCenterMembershipAdminRoutes = [
  {
    method: 'PATCH',
    path: '/api/admin/certification-center-memberships/{id}',
    config: {
      handler: (request, h) => certificationCenterMembershipController.updateFromPixAdmin(request, h),
      pre: [
        {
          method: (request, h) =>
            securityPreHandlers.hasAtLeastOneAccessOf([
              securityPreHandlers.checkAdminMemberHasRoleSuperAdmin,
              securityPreHandlers.checkAdminMemberHasRoleCertif,
              securityPreHandlers.checkAdminMemberHasRoleSupport,
              securityPreHandlers.checkAdminMemberHasRoleMetier,
            ])(request, h),
          assign: 'hasAuthorizationToAccessAdminScope',
        },
      ],
      notes: [
        "- **Cette route est restreinte aux utilisateurs ayant les droits d'accès**\n" +
          "- Modification du rôle d'un membre d'un centre de certification\n",
      ],
      tags: ['api', 'team', 'admin', 'certification-center-membership'],
    },
  },
];
