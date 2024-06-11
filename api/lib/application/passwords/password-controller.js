import * as resetPasswordSerializer from '../../../src/identity-access-management/infrastructure/serializers/jsonapi/reset-password.serializer.js';
import * as userSerializer from '../../../src/shared/infrastructure/serializers/jsonapi/user-serializer.js';
import { extractLocaleFromRequest } from '../../../src/shared/infrastructure/utils/request-response-utils.js';
import { usecases } from '../../domain/usecases/index.js';

const createResetDemand = async function (
  request,
  h,
  dependencies = {
    resetPasswordSerializer,
  },
) {
  const { email } = request.payload.data.attributes;
  const locale = extractLocaleFromRequest(request);

  const passwordResetDemand = await usecases.createPasswordResetDemand({
    email,
    locale,
  });
  const serializedPayload = dependencies.resetPasswordSerializer.serialize(passwordResetDemand.attributes);

  return h.response(serializedPayload).created();
};

const checkResetDemand = async function (request, h, dependencies = { userSerializer }) {
  const temporaryKey = request.params.temporaryKey;
  const user = await usecases.getUserByResetPasswordDemand({ temporaryKey });
  return dependencies.userSerializer.serialize(user);
};

const updateExpiredPassword = async function (request, h) {
  const passwordResetToken = request.payload.data.attributes['password-reset-token'];
  const newPassword = request.payload.data.attributes['new-password'];
  const login = await usecases.updateExpiredPassword({ passwordResetToken, newPassword });

  return h
    .response({
      data: {
        type: 'reset-expired-password-demands',
        attributes: {
          login,
        },
      },
    })
    .created();
};

const passwordController = { createResetDemand, checkResetDemand, updateExpiredPassword };

export { passwordController };
