import { PIX_ADMIN, PIX_ORGA } from '../../../authorization/domain/constants.js';
import { ForbiddenAccess, LocaleFormatError, LocaleNotSupportedError } from '../../../shared/domain/errors.js';
import { MissingOrInvalidCredentialsError, UserShouldChangePasswordError } from '../errors.js';
import { RefreshToken } from '../models/RefreshToken.js';

const authenticateUser = async function ({
  password,
  scope,
  source,
  username,
  localeFromCookie,
  refreshTokenRepository,
  pixAuthenticationService,
  tokenService,
  userRepository,
  userLoginRepository,
  adminMemberRepository,
}) {
  try {
    const foundUser = await pixAuthenticationService.getUserByUsernameAndPassword({
      username,
      password,
      userRepository,
    });

    if (foundUser.shouldChangePassword) {
      const passwordResetToken = tokenService.createPasswordResetToken(foundUser.id);
      throw new UserShouldChangePasswordError(undefined, passwordResetToken);
    }

    await _checkUserAccessScope(scope, foundUser, adminMemberRepository);

    const refreshToken = RefreshToken.generate({ userId: foundUser.id, scope, source });
    await refreshTokenRepository.save({ refreshToken });

    const { accessToken, expirationDelaySeconds } = await tokenService.createAccessTokenFromUser(foundUser.id, source);

    foundUser.setLocaleIfNotAlreadySet(localeFromCookie);
    if (foundUser.hasBeenModified) {
      await userRepository.update({ id: foundUser.id, locale: foundUser.locale });
    }

    await userLoginRepository.updateLastLoggedAt({ userId: foundUser.id });

    return { accessToken, refreshToken: refreshToken.value, expirationDelaySeconds };
  } catch (error) {
    if (
      error instanceof ForbiddenAccess ||
      error instanceof UserShouldChangePasswordError ||
      error instanceof LocaleFormatError ||
      error instanceof LocaleNotSupportedError
    ) {
      throw error;
    }
    throw new MissingOrInvalidCredentialsError();
  }
};

async function _checkUserAccessScope(scope, user, adminMemberRepository) {
  if (scope === PIX_ORGA.SCOPE && !user.isLinkedToOrganizations()) {
    throw new ForbiddenAccess(PIX_ORGA.NOT_LINKED_ORGANIZATION_MSG);
  }

  if (scope === PIX_ADMIN.SCOPE) {
    const adminMember = await adminMemberRepository.get({ userId: user.id });
    if (!adminMember?.hasAccessToAdminScope) {
      throw new ForbiddenAccess(PIX_ADMIN.NOT_ALLOWED_MSG);
    }
  }
}

export { authenticateUser };
