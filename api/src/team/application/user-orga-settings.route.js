import Joi from 'joi';

import { securityPreHandlers } from '../../../src/shared/application/security-pre-handlers.js';
import { identifiersType } from '../../../src/shared/domain/types/identifiers-type.js';
import { userOrgaSettingsController } from './user-orga-settings.controller.js';

export const userOrgaSettingsRoute = [
  {
    method: 'PUT',
    path: '/api/user-orga-settings/{id}',
    config: {
      pre: [
        {
          method: securityPreHandlers.checkRequestedUserIsAuthenticatedUser,
          assign: 'requestedUserIsAuthenticatedUser',
        },
      ],
      validate: {
        options: {
          allowUnknown: true,
        },
        params: Joi.object({
          id: identifiersType.userId,
        }),
        payload: Joi.object({
          data: {
            relationships: {
              organization: {
                data: {
                  id: identifiersType.organizationId,
                },
              },
            },
          },
        }),
      },
      handler: (request, h) => userOrgaSettingsController.createOrUpdate(request, h),
      notes: [
        '- **Cette route est restreinte aux utilisateurs authentifiés**\n' +
          '- Création ou Mise à jour des paramètres utilisateurs liés à Pix Orga, permet notamment d’enregistrer les préférences d’un prescripteur vis à vis de son espace Orga.\n' +
          '- L’id en paramètre doit correspondre à celui de l’utilisateur authentifié',
      ],
      tags: ['api', 'user-orga-settings'],
    },
  },
];
