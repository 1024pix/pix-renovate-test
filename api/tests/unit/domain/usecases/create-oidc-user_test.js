const { expect, sinon, catchErr } = require('../../../test-helper');
const {
  AuthenticationKeyExpired,
  UserAlreadyExistsWithAuthenticationMethodError,
} = require('../../../../lib/domain/errors');
const createOidcUser = require('../../../../lib/domain/usecases/create-oidc-user');

describe('Unit | UseCase | create-user-from-external-identity-provider', function () {
  let authenticationMethodRepository, userToCreateRepository, userRepository;
  let authenticationSessionService, oidcAuthenticationService;
  let authenticationServiceRegistry;
  let clock;
  const now = new Date('2021-01-02');

  beforeEach(function () {
    clock = sinon.useFakeTimers(now);

    authenticationMethodRepository = {
      findOneByExternalIdentifierAndIdentityProvider: sinon.stub(),
    };

    authenticationSessionService = {
      getByKey: sinon.stub(),
    };

    oidcAuthenticationService = {
      getUserInfo: sinon.stub(),
      createUserAccount: sinon.stub(),
      createAccessToken: sinon.stub(),
      saveIdToken: sinon.stub(),
    };

    authenticationServiceRegistry = {
      lookupAuthenticationService: sinon.stub(),
    };

    userRepository = {
      updateLastLoggedAt: sinon.stub(),
    };
  });

  afterEach(function () {
    clock.restore();
  });

  context('when authentication key is expired', function () {
    it('should throw an AuthenticationKeyExpired', async function () {
      // given
      const authenticationKey = 'authenticationKey';
      authenticationSessionService.getByKey.withArgs(authenticationKey).resolves(null);

      // when
      const error = await catchErr(createOidcUser)({
        authenticationKey,
        authenticationMethodRepository,
        userToCreateRepository,
        authenticationSessionService,
      });

      // then
      expect(error).to.be.instanceOf(AuthenticationKeyExpired);
      expect(error.message).to.be.equal('This authentication key has expired.');
    });
  });

  context('when there is already an authentication method for this external id', function () {
    it('should throw UserAlreadyExistsWithAuthenticationMethodError', async function () {
      // given
      authenticationSessionService.getByKey.withArgs('AUTHENTICATION_KEY').resolves({
        sessionContent: { idToken: 'idToken', accessToken: 'accessToken' },
        userInfo: { firstName: 'Jean', lastName: 'Heymar', externalIdentityId: 'duGAR' },
      });
      authenticationServiceRegistry.lookupAuthenticationService
        .withArgs('SOME_IDP')
        .resolves(oidcAuthenticationService);
      authenticationMethodRepository.findOneByExternalIdentifierAndIdentityProvider
        .withArgs({ externalIdentifier: 'duGAR', identityProvider: 'SOME_IDP' })
        .resolves({ userId: 'FOUND_USER_ID' });

      // when
      const error = await catchErr(createOidcUser)({
        identityProvider: 'SOME_IDP',
        authenticationKey: 'AUTHENTICATION_KEY',
        authenticationServiceRegistry,
        authenticationSessionService,
        authenticationMethodRepository,
        userToCreateRepository,
      });

      // then
      expect(error).to.be.instanceOf(UserAlreadyExistsWithAuthenticationMethodError);
      expect(error.message).to.equal('Authentication method already exists for this external identifier.');
    });
  });

  it('should create user account and return an access token, the logout url uuid and update the last logged date with the existing external user id', async function () {
    // given
    const idToken = 'idToken';
    const expectedUser = {
      firstName: 'Jean',
      lastName: 'Heymar',
      cgu: true,
      lastTermsOfServiceValidatedAt: now,
    };
    authenticationSessionService.getByKey.withArgs('AUTHENTICATION_KEY').resolves({
      sessionContent: { idToken, accessToken: 'accessToken' },
      userInfo: { firstName: 'Jean', lastName: 'Heymar', externalIdentityId: 'externalId' },
    });
    authenticationServiceRegistry.lookupAuthenticationService.withArgs('SOME_IDP').resolves(oidcAuthenticationService);
    authenticationMethodRepository.findOneByExternalIdentifierAndIdentityProvider
      .withArgs({ externalIdentifier: 'externalId', identityProvider: 'SOME_IDP' })
      .resolves(null);
    oidcAuthenticationService.createUserAccount.resolves({ userId: 10, idToken });
    oidcAuthenticationService.createAccessToken.withArgs(10).returns('accessTokenForExistingExternalUser');
    oidcAuthenticationService.saveIdToken.withArgs({ idToken, userId: 10 }).resolves('logoutUrlUUID');

    // when
    const result = await createOidcUser({
      identityProvider: 'SOME_IDP',
      authenticationKey: 'AUTHENTICATION_KEY',
      authenticationServiceRegistry,
      authenticationSessionService,
      authenticationMethodRepository,
      userToCreateRepository,
      userRepository,
    });

    // then
    expect(oidcAuthenticationService.createUserAccount).to.have.been.calledWithMatch({
      user: expectedUser,
      sessionContent: { idToken, accessToken: 'accessToken' },
      externalIdentityId: 'externalId',
      userToCreateRepository,
      authenticationMethodRepository,
    });
    sinon.assert.calledOnce(oidcAuthenticationService.createAccessToken);
    sinon.assert.calledOnce(oidcAuthenticationService.saveIdToken);
    sinon.assert.calledOnceWithExactly(userRepository.updateLastLoggedAt, { userId: 10 });
    expect(result).to.deep.equal({
      accessToken: 'accessTokenForExistingExternalUser',
      logoutUrlUUID: 'logoutUrlUUID',
    });
  });
});
