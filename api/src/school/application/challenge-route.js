import Joi from 'joi';

import { securityPreHandlers } from '../../shared/application/security-pre-handlers.js';
import { identifiersType } from '../../shared/domain/types/identifiers-type.js';
import { challengeController } from './challenge-controller.js';

const register = async function (server) {
  server.route([
    {
      method: 'GET',
      path: '/api/pix1d/challenges/{id}',
      config: {
        pre: [{ method: securityPreHandlers.checkPix1dActivated }],
        auth: false,
        validate: {
          params: Joi.object({
            id: identifiersType.challengeId,
          }),
        },
        handler: challengeController.get,
        tags: ['api'],
      },
    },
  ]);
};

const name = 'school-challenges-api';
export { name, register };
