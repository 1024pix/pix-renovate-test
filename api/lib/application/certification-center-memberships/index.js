import Joi from 'joi';

import { securityPreHandlers } from '../../../src/shared/application/security-pre-handlers.js';
import { identifiersType } from '../../../src/shared/domain/types/identifiers-type.js';
import { certificationCenterMembershipController } from './certification-center-membership-controller.js';

const register = async function (server) {
  const globalRoutes = [
    {
      method: 'PATCH',
      path: '/api/certification-centers/{certificationCenterId}/certification-center-memberships/{id}',
      config: {
        validate: {
          params: Joi.object({
            certificationCenterId: identifiersType.certificationCenterId,
            id: identifiersType.certificationCenterMembershipId,
          }),
        },
        handler: certificationCenterMembershipController.updateFromPixCertif,
        pre: [
          {
            method: securityPreHandlers.checkUserIsAdminOfCertificationCenter,
            assign: 'hasAuthorizationToAccessAdminScope',
          },
        ],
        notes: [
          "- **Cette route est restreinte aux utilisateurs ayant les droits d'accès**\n" +
            "- Modification du rôle d'un membre d'un centre de certification\n",
        ],
        tags: ['api', 'certification-center-membership'],
      },
    },
    {
      method: 'DELETE',
      path: '/api/certification-center-memberships/{certificationCenterMembershipId}',
      config: {
        validate: {
          params: Joi.object({
            certificationCenterMembershipId: identifiersType.certificationCenterMembershipId,
          }),
        },
        pre: [
          {
            method: securityPreHandlers.checkUserIsAdminOfCertificationCenterWithCertificationCenterMembershipId,
          },
        ],
        handler: certificationCenterMembershipController.disableFromPixCertif,
        notes: [
          "- **Cette route est restreinte aux utilisateurs ayant les droits d'accès**\n" +
            "- Suppression d'un membre d'un centre de certification\n",
        ],
        tags: ['api', 'certification-center-membership'],
      },
    },
  ];
  const adminRoutes = [
    {
      method: 'DELETE',
      path: '/api/admin/certification-center-memberships/{id}',
      config: {
        handler: certificationCenterMembershipController.disableFromPixAdmin,
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
            '- Désactivation d‘un lien entre un utilisateur et un centre de certification\n',
        ],
        tags: ['api', 'certification-center-membership'],
      },
    },
  ];

  server.route([...globalRoutes, ...adminRoutes]);
};

const name = 'certification-center-memberships-api';
export { name, register };
