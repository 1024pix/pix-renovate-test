import { NON_OIDC_IDENTITY_PROVIDERS } from '../../../../../src/identity-access-management/domain/constants/identity-providers.js';
import * as OidcIdentityProviders from '../../../../../src/identity-access-management/domain/constants/oidc-identity-providers.js';
import { removeAuthenticationMethod } from '../../../../../src/identity-access-management/domain/usecases/remove-authentication-method.usecase.js';
import { UserNotAuthorizedToRemoveAuthenticationMethod } from '../../../../../src/shared/domain/errors.js';
import { catchErr, domainBuilder, expect, sinon } from '../../../../test-helper.js';

describe('Unit | Identity Access Management | Domain | UseCase | remove-authentication-method', function () {
  let userRepository;
  let authenticationMethodRepository;

  beforeEach(function () {
    userRepository = {
      get: sinon.stub(),
      updateEmail: sinon.stub(),
      updateUsername: sinon.stub(),
    };
    authenticationMethodRepository = {
      findByUserId: sinon.stub(),
      removeByUserIdAndIdentityProvider: sinon.stub(),
    };
  });

  function buildPIXAndGARAndPoleEmploiAuthenticationMethod(userId) {
    return [
      domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({ userId }),
      domainBuilder.buildAuthenticationMethod.withGarAsIdentityProvider({ userId }),
      domainBuilder.buildAuthenticationMethod.withPoleEmploiAsIdentityProvider({
        userId,
      }),
    ];
  }

  function buildAllAuthenticationMethodsForUser(userId) {
    return [
      domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({ userId }),
      domainBuilder.buildAuthenticationMethod.withGarAsIdentityProvider({ userId }),
      domainBuilder.buildAuthenticationMethod.withPoleEmploiAsIdentityProvider({
        userId,
      }),
      domainBuilder.buildAuthenticationMethod.withIdentityProvider({
        userId,
        identityProvider: 'genericOidcProviderCode',
      }),
    ];
  }

  context('When authentication method type is EMAIL', function () {
    const authenticationMethodType = 'EMAIL';

    it('sets the email to null', async function () {
      // given
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
      authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

      // when
      await removeAuthenticationMethod({
        userId: user.id,
        authenticationMethodType,
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(userRepository.updateEmail).to.have.been.calledWithExactly({ id: user.id, email: null });
    });

    context('When user does not have a username', function () {
      it('removes PIX authentication method', async function () {
        // given
        const user = domainBuilder.buildUser({ username: null });
        userRepository.get.resolves(user);
        const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
        authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

        // when
        await removeAuthenticationMethod({
          userId: user.id,
          authenticationMethodType,
          userRepository,
          authenticationMethodRepository,
        });

        // then
        expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.have.been.calledWithExactly({
          userId: user.id,
          identityProvider: NON_OIDC_IDENTITY_PROVIDERS.PIX.code,
        });
      });
    });

    context('When user has a username', function () {
      it('does not remove PIX authentication method', async function () {
        // given
        const user = domainBuilder.buildUser({ username: 'john.doe0101' });
        userRepository.get.resolves(user);
        const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
        authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

        // when
        await removeAuthenticationMethod({
          userId: user.id,
          authenticationMethodType,
          userRepository,
          authenticationMethodRepository,
        });

        // then
        expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.not.have.been.called;
      });
    });
  });

  context('When authentication method type is USERNAME', function () {
    const authenticationMethodType = 'USERNAME';

    it('sets the username to null', async function () {
      // given
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
      authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

      // when
      await removeAuthenticationMethod({
        userId: user.id,
        authenticationMethodType,
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(userRepository.updateUsername).to.have.been.calledWithExactly({ id: user.id, username: null });
    });

    context('When user does not have an email', function () {
      it('removes PIX authentication method', async function () {
        // given
        const user = domainBuilder.buildUser({ email: null });
        userRepository.get.resolves(user);
        const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
        authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

        // when
        await removeAuthenticationMethod({
          userId: user.id,
          authenticationMethodType,
          userRepository,
          authenticationMethodRepository,
        });

        // then
        expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.have.been.calledWithExactly({
          userId: user.id,
          identityProvider: NON_OIDC_IDENTITY_PROVIDERS.PIX.code,
        });
      });
    });

    context('When user has an email', function () {
      it('does not remove PIX authentication method', async function () {
        // given
        const user = domainBuilder.buildUser({ email: 'john.doe@example.net' });
        userRepository.get.resolves(user);
        const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
        authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

        // when
        await removeAuthenticationMethod({
          userId: user.id,
          authenticationMethodType,
          userRepository,
          authenticationMethodRepository,
        });

        // then
        expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.not.have.been.called;
      });
    });
  });

  context('When authentication method type is GAR', function () {
    const authenticationMethodType = 'GAR';

    it('removes GAR authentication method', async function () {
      // given
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
      authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

      // when
      await removeAuthenticationMethod({
        userId: user.id,
        authenticationMethodType,
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.have.been.calledWithExactly({
        userId: user.id,
        identityProvider: NON_OIDC_IDENTITY_PROVIDERS.GAR.code,
      });
    });
  });

  context('When authentication method type is POLE_EMPLOI', function () {
    it('removes POLE_EMPLOI authentication method', async function () {
      // given
      const authenticationMethodType = OidcIdentityProviders.POLE_EMPLOI.code;
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethods = buildPIXAndGARAndPoleEmploiAuthenticationMethod(user.id);
      authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

      // when
      await removeAuthenticationMethod({
        userId: user.id,
        authenticationMethodType,
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.have.been.calledWithExactly({
        userId: user.id,
        identityProvider: OidcIdentityProviders.POLE_EMPLOI.code,
      });
    });
  });
  context('When authentication method type is a generic OIDC SSO', function () {
    it('removes the identity provider authentication method', async function () {
      // given

      const authenticationMethodType = 'genericOidcProviderCode';
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethods = buildAllAuthenticationMethodsForUser(user.id);
      authenticationMethodRepository.findByUserId.resolves(authenticationMethods);

      // when
      await removeAuthenticationMethod({
        userId: user.id,
        authenticationMethodType,
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.have.been.calledWithExactly({
        userId: user.id,
        identityProvider: authenticationMethodType,
      });
    });
  });
  context('When there is only one remaining authentication method', function () {
    it('throws a UserNotAuthorizedToRemoveAuthenticationMethod', async function () {
      // given
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethod = domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({
        userId: user.id,
      });
      authenticationMethodRepository.findByUserId.resolves([authenticationMethod]);

      // when
      const error = await catchErr(removeAuthenticationMethod)({
        userId: user.id,
        authenticationMethodType: 'EMAIL',
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(error).to.be.an.instanceOf(UserNotAuthorizedToRemoveAuthenticationMethod);
    });

    it('does not remove the authentication method', async function () {
      // given
      const user = domainBuilder.buildUser();
      userRepository.get.resolves(user);
      const authenticationMethod = domainBuilder.buildAuthenticationMethod.withPixAsIdentityProviderAndHashedPassword({
        userId: user.id,
      });
      authenticationMethodRepository.findByUserId.resolves([authenticationMethod]);

      // when
      await catchErr(removeAuthenticationMethod)({
        userId: user.id,
        authenticationMethodType: 'EMAIL',
        userRepository,
        authenticationMethodRepository,
      });

      // then
      expect(authenticationMethodRepository.removeByUserIdAndIdentityProvider).to.not.have.been.called;
    });
  });
});
