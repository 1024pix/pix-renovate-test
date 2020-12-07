const { expect, sinon, catchErr, domainBuilder } = require('../../../../test-helper');
const AuthenticationMethod = require('../../../../../lib/domain/models/AuthenticationMethod');
const httpAgent = require('../../../../../lib/infrastructure/http/http-agent');
const authenticationMethodRepository = require('../../../../../lib/infrastructure/repositories/authentication-method-repository');
const poleEmploiSendingRepository = require('../../../../../lib/infrastructure/repositories/pole-emploi-sending-repository');
const { notify } = require('../../../../../lib/infrastructure/externals/pole-emploi/pole-emploi-notifier');
const settings = require('../../../../../lib/config');
const { UnexpectedUserAccount } = require('../../../../../lib/domain/errors');

describe('Unit | Infrastructure | Externals/Pole-Emploi | pole-emploi-notifier', () => {

  describe('#notify', () => {
    const originPoleEmploiSendingUrl = settings.poleEmploi.sendingUrl;

    beforeEach(() => {
      sinon.stub(httpAgent, 'post');
      sinon.stub(authenticationMethodRepository, 'findOneByUserIdAndIdentityProvider');
      sinon.stub(poleEmploiSendingRepository, 'create');
    });

    afterEach(() => {
      settings.poleEmploi.sendingUrl = originPoleEmploiSendingUrl;
      httpAgent.post.restore();
      authenticationMethodRepository.findOneByUserIdAndIdentityProvider.restore();
      poleEmploiSendingRepository.create.restore();
    });

    it('should throw an error if the user is not known as PoleEmploi user', async () => {
      // given
      const userId = 123;
      const payload = 'somePayload';
      httpAgent.post
        .withArgs({ userId, identityProvider: AuthenticationMethod.identityProviders.POLE_EMPLOI })
        .resolves(null);

      // when
      const error = await catchErr(notify)(userId, payload);

      // then
      expect(error).to.be.instanceOf(UnexpectedUserAccount);
      expect(error.message).to.equal('Le compte utilisateur n\'est pas rattaché à l\'organisation Pôle Emploi');
    });

    it('should send the notification to Pole Emploi', async () => {
      // given
      const poleEmploiSendingUrl = 'someUrlToPoleEmploi';
      settings.poleEmploi.sendingUrl = poleEmploiSendingUrl;
      const userId = 123;
      const payload = 'somePayload';
      const authenticationMethod = { authenticationComplement: { accessToken: 'someAccessToken' } };
      const code = 'someCode';
      const successState = 'someState';
      const poleEmploiSending = domainBuilder.buildPoleEmploiSending();
      authenticationMethodRepository.findOneByUserIdAndIdentityProvider
        .withArgs({ userId, identityProvider: AuthenticationMethod.identityProviders.POLE_EMPLOI })
        .resolves(authenticationMethod);
      httpAgent.post.resolves({ isSuccessful: successState, code });

      // when
      await notify(userId, payload, poleEmploiSending);

      // then
      expect(httpAgent.post).to.have.been.calledWithExactly(poleEmploiSendingUrl, payload, {
        'Authorization': `Bearer ${authenticationMethod.authenticationComplement.accessToken}`,
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Service-source': 'Pix',
      });
    });

    it('it should record the sending', async () => {
      // given
      const poleEmploiSendingUrl = 'someUrlToPoleEmploi';
      settings.poleEmploi.sendingUrl = poleEmploiSendingUrl;
      const userId = 123;
      const payload = 'somePayload';
      const authenticationMethod = { authenticationComplement: { accessToken: 'someAccessToken' } };
      const code = 'someCode';
      const successState = 'someState';
      const poleEmploiSending = domainBuilder.buildPoleEmploiSending();
      authenticationMethodRepository.findOneByUserIdAndIdentityProvider.resolves(authenticationMethod);
      httpAgent.post.resolves({ isSuccessful: successState, code });

      // when
      await notify(userId, payload, poleEmploiSending);

      // then
      expect(poleEmploiSendingRepository.create).to.have.been.calledWith({ poleEmploiSending });
    });

    context('when sending succeeds', () => {

      it('it should record that the sending has succeeded', async () => {
        // given
        const poleEmploiSendingUrl = 'someUrlToPoleEmploi';
        settings.poleEmploi.sendingUrl = poleEmploiSendingUrl;
        const userId = 123;
        const payload = 'somePayload';
        const authenticationMethod = { authenticationComplement: { accessToken: 'someAccessToken' } };
        const code = 'someCode';
        const poleEmploiSending = domainBuilder.buildPoleEmploiSending();
        authenticationMethodRepository.findOneByUserIdAndIdentityProvider.resolves(authenticationMethod);
        httpAgent.post.resolves({ isSuccessful: true, code });
        sinon.stub(poleEmploiSending, 'succeed');

        // when
        await notify(userId, payload, poleEmploiSending);

        // then
        expect(poleEmploiSending.succeed).to.have.been.calledWithExactly(code);
      });
    });

    context('when sending fails', () => {

      it('it should record that the sending has failed', async () => {
        // given
        const poleEmploiSendingUrl = 'someUrlToPoleEmploi';
        settings.poleEmploi.sendingUrl = poleEmploiSendingUrl;
        const userId = 123;
        const payload = 'somePayload';
        const authenticationMethod = { authenticationComplement: { accessToken: 'someAccessToken' } };
        const code = 'someCode';
        const poleEmploiSending = domainBuilder.buildPoleEmploiSending();
        authenticationMethodRepository.findOneByUserIdAndIdentityProvider.resolves(authenticationMethod);
        httpAgent.post.resolves({ isSuccessful: false, code });
        sinon.stub(poleEmploiSending, 'fail');

        // when
        await notify(userId, payload, poleEmploiSending);

        // then
        expect(poleEmploiSending.fail).to.have.been.calledWithExactly(code);
      });
    });
  });
});
