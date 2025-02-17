import querystring from 'node:querystring';

import dayjs from 'dayjs';

import * as OidcIdentityProviders from '../../../../../../../src/identity-access-management/domain/constants/oidc-identity-providers.js';
import { AuthenticationMethod } from '../../../../../../../src/identity-access-management/domain/models/AuthenticationMethod.js';
import { notify } from '../../../../../../../src/prescription/campaign-participation/infrastructure/externals/pole-emploi/pole-emploi-notifier.js';
import { config as settings } from '../../../../../../../src/shared/config.js';
import { UnexpectedUserAccountError } from '../../../../../../../src/shared/domain/errors.js';
import { catchErr, expect, sinon } from '../../../../../../test-helper.js';

describe('Unit | Infrastructure | Externals/Pole-Emploi | pole-emploi-notifier', function () {
  describe('#notify', function () {
    let clock;
    let authenticationMethodRepository;
    let httpAgent;
    let httpErrorsHelper;
    let logger;
    let payload;

    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line mocha/no-setup-in-describe
    const originPoleEmploiSendingUrl = settings.poleEmploi.sendingUrl;
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line mocha/no-setup-in-describe
    const originPoleEmploiTokenUrl = settings.poleEmploi.tokenUrl;

    const userId = 123;
    const code = 'someCode';
    const data = {
      access_token: 'accessToken',
      refresh_token: 'refreshToken',
      expires_in: 10,
    };

    const accessToken = 'someAccessToken';
    const refreshToken = 'someRefreshToken';
    const expiredDate = new Date('2021-01-01');
    const authenticationMethod = { authenticationComplement: { accessToken, expiredDate, refreshToken } };

    beforeEach(function () {
      clock = sinon.useFakeTimers({ now: Date.now(), toFake: ['Date'] });
      httpAgent = {
        post: sinon.stub(),
      };
      httpErrorsHelper = {
        serializeHttpErrorResponse: sinon.stub(),
      };
      authenticationMethodRepository = {
        findOneByUserIdAndIdentityProvider: sinon.stub(),
        updateAuthenticationComplementByUserIdAndIdentityProvider: sinon.stub(),
      };
      logger = {
        error: sinon.stub(),
        info: sinon.stub(),
      };

      settings.poleEmploi.tokenUrl = 'someTokenUrlToPoleEmploi';
      settings.poleEmploi.sendingUrl = 'someSendingUrlToPoleEmploi';
      payload = { test: { progression: 0, referenceExterne: 777 } };
    });

    afterEach(function () {
      clock.restore();
      settings.poleEmploi.sendingUrl = originPoleEmploiSendingUrl;
      settings.poleEmploi.tokenUrl = originPoleEmploiTokenUrl;
    });

    it('should throw an error if the user is not known as PoleEmploi user', async function () {
      // given
      authenticationMethodRepository.findOneByUserIdAndIdentityProvider
        .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
        .resolves(null);

      // when
      const error = await catchErr(notify)(userId, payload, {
        authenticationMethodRepository,
        httpAgent,
        httpErrorsHelper,
        logger,
      });

      // then
      expect(error).to.be.instanceOf(UnexpectedUserAccountError);
      expect(error.message).to.equal("Le compte utilisateur n'est pas rattaché à l'organisation Pôle Emploi");
    });

    context('when access token is valid', function () {
      context('when pole emploi deprecate push env variable is set', function () {
        beforeEach(function () {
          sinon.stub(settings.featureToggles, 'deprecatePoleEmploiPushNotification').value('true');
        });
        it('should send the notification to Pole Emploi with deprectation message', async function () {
          // given
          const expiredDate = dayjs().add(10, 'm').toDate();
          const authenticationMethod = { authenticationComplement: { accessToken, expiredDate, refreshToken } };

          const expectedHeaders = {
            Authorization: `Bearer ${authenticationMethod.authenticationComplement.accessToken}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
            'Service-source': 'Pix',
          };

          authenticationMethodRepository.findOneByUserIdAndIdentityProvider
            .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
            .resolves(authenticationMethod);
          httpAgent.post.resolves({ isSuccessful: true, code });

          // when
          await notify(userId, payload, {
            authenticationMethodRepository,
            httpAgent,
            httpErrorsHelper,
            logger,
          });

          // then
          expect(httpAgent.post).to.have.been.calledWithExactly({
            url: settings.poleEmploi.sendingUrl,
            payload: { ...payload, deprecated: true },
            headers: expectedHeaders,
            timeout: settings.partner.fetchTimeOut,
          });
        });
      });
      it('should send the notification to Pole Emploi', async function () {
        // given
        const expiredDate = dayjs().add(10, 'm').toDate();
        const authenticationMethod = { authenticationComplement: { accessToken, expiredDate, refreshToken } };

        const expectedHeaders = {
          Authorization: `Bearer ${authenticationMethod.authenticationComplement.accessToken}`,
          'Content-type': 'application/json',
          Accept: 'application/json',
          'Service-source': 'Pix',
        };

        authenticationMethodRepository.findOneByUserIdAndIdentityProvider
          .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
          .resolves(authenticationMethod);
        httpAgent.post.resolves({ isSuccessful: true, code });

        // when
        await notify(userId, payload, { authenticationMethodRepository, httpAgent, httpErrorsHelper, logger });

        // then
        expect(httpAgent.post).to.have.been.calledWithExactly({
          url: settings.poleEmploi.sendingUrl,
          payload,
          headers: expectedHeaders,
          timeout: settings.partner.fetchTimeOut,
        });
      });

      it('should log the notification to Pole Emploi', async function () {
        // given
        payload = { test: { progression: 100, referenceExterne: 777 } };
        const expiredDate = dayjs().add(10, 'm').toDate();
        const authenticationMethod = { authenticationComplement: { accessToken, expiredDate, refreshToken } };

        authenticationMethodRepository.findOneByUserIdAndIdentityProvider
          .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
          .resolves(authenticationMethod);
        httpAgent.post.resolves({ isSuccessful: true, code });
        // when
        await notify(userId, payload, { authenticationMethodRepository, httpAgent, httpErrorsHelper, logger });

        // then
        expect(logger.info).to.have.been.calledWithExactly({
          event: 'participation-send-pole-emploi',
          'pole-emploi-action': 'send-results',
          'participation-state': 'PARTICIPATION_COMPLETED',
          'participation-id': 777,
        });
      });
    });

    context('when access token is invalid', function () {
      it('should try to refresh the access token', async function () {
        // given
        const expectedHeaders = { 'content-type': 'application/x-www-form-urlencoded' };
        authenticationMethodRepository.findOneByUserIdAndIdentityProvider
          .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
          .resolves(authenticationMethod);
        const params = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_secret: settings.poleEmploi.clientSecret,
          client_id: settings.poleEmploi.clientId,
        };
        httpAgent.post.resolves({ isSuccessful: true, code, data });

        // when
        await notify(userId, payload, { authenticationMethodRepository, httpAgent, httpErrorsHelper, logger });

        // then
        expect(httpAgent.post).to.have.been.calledWithExactly({
          url: settings.poleEmploi.tokenUrl,
          payload: querystring.stringify(params),
          headers: expectedHeaders,
          timeout: settings.partner.fetchTimeOut,
        });
      });

      it('logs the attempt to refresh the access token', async function () {
        // given
        authenticationMethodRepository.findOneByUserIdAndIdentityProvider
          .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
          .resolves(authenticationMethod);
        httpAgent.post.resolves({ isSuccessful: true, code, data });

        // when
        await notify(userId, payload, { authenticationMethodRepository, httpAgent, httpErrorsHelper, logger });

        // then
        expect(logger.info).to.have.been.calledWithExactly({
          event: 'participation-send-pole-emploi',
          'pole-emploi-action': 'refresh-token',
          'participation-state': 'PARTICIPATION_STARTED',
          'expired-date': expiredDate,
          'participation-id': 777,
        });
      });

      context('when it succeeds', function () {
        it('should update the authentication method', async function () {
          // given
          authenticationMethodRepository.findOneByUserIdAndIdentityProvider
            .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
            .resolves(authenticationMethod);
          httpAgent.post.resolves({ isSuccessful: true, code, data });
          const authenticationComplement = new AuthenticationMethod.PoleEmploiOidcAuthenticationComplement({
            accessToken: data['access_token'],
            refreshToken: data['refresh_token'],
            expiredDate: dayjs().add(data['expires_in'], 's').toDate(),
          });

          // when
          await notify(userId, payload, {
            authenticationMethodRepository,
            httpAgent,
            httpErrorsHelper,
            logger,
          });

          // then
          expect(
            authenticationMethodRepository.updateAuthenticationComplementByUserIdAndIdentityProvider,
          ).to.have.been.calledWithExactly({
            authenticationComplement,
            userId,
            identityProvider: OidcIdentityProviders.POLE_EMPLOI.code,
          });
        });

        it('should send the notification to Pole Emploi', async function () {
          // given
          const authenticationComplement = new AuthenticationMethod.PoleEmploiOidcAuthenticationComplement({
            accessToken: data['access_token'],
            refreshToken: data['refresh_token'],
            expiredDate: dayjs().add(data['expires_in'], 's').toDate(),
          });

          const expectedHeaders = {
            Authorization: `Bearer ${authenticationComplement.accessToken}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
            'Service-source': 'Pix',
          };

          authenticationMethodRepository.updateAuthenticationComplementByUserIdAndIdentityProvider
            .withArgs({ authenticationComplement, userId })
            .resolves();

          authenticationMethodRepository.findOneByUserIdAndIdentityProvider
            .withArgs({ userId, identityProvider: OidcIdentityProviders.POLE_EMPLOI.code })
            .resolves(authenticationMethod);

          httpAgent.post
            .onFirstCall()
            .resolves({ isSuccessful: true, code, data })
            .onSecondCall()
            .resolves({ isSuccessful: true, code });

          // when
          await notify(userId, payload, {
            authenticationMethodRepository,
            httpAgent,
            httpErrorsHelper,
            logger,
          });

          // then
          expect(httpAgent.post).to.have.been.calledWithExactly({
            url: settings.poleEmploi.sendingUrl,
            payload,
            headers: expectedHeaders,
            timeout: settings.partner.fetchTimeOut,
          });
        });
      });

      context('when it fails', function () {
        it('should log error and return httpResponse with error if retrieve PE tokens fails', async function () {
          // given
          const errorData = {
            error: 'invalid_client',
            error_description: 'Invalid authentication method for accessing this endpoint.',
          };
          const tokenResponse = {
            isSuccessful: false,
            code: 400,
            data: errorData,
          };

          authenticationMethodRepository.findOneByUserIdAndIdentityProvider.resolves(authenticationMethod);

          httpAgent.post
            .withArgs({
              url: settings.poleEmploi.tokenUrl,
              headers: sinon.match.any,
              payload: sinon.match.any,
              timeout: settings.partner.fetchTimeOut,
            })
            .resolves(tokenResponse);
          httpErrorsHelper.serializeHttpErrorResponse.returns(JSON.stringify(tokenResponse.data));
          logger.error.resolves();

          const expectedLoggerMessage = JSON.stringify(tokenResponse.data);
          const expectedResult = {
            code: tokenResponse.code,
            isSuccessful: tokenResponse.isSuccessful,
          };

          // when
          const result = await notify(userId, payload, {
            authenticationMethodRepository,
            httpAgent,
            httpErrorsHelper,
            logger,
          });

          // then
          expect(logger.error).to.have.been.calledWithExactly({
            event: 'participation-send-pole-emploi',
            'pole-emploi-action': 'refresh-token',
            'participation-state': 'PARTICIPATION_STARTED',
            'participation-id': 777,
            message: expectedLoggerMessage,
          });
          expect(result).to.deep.equal(expectedResult);
        });

        it('should log error and return httpResponse with error if sending to PE fails', async function () {
          // given
          payload = { test: { referenceExterne: 777, dateValidation: new Date() } };

          const tokenResponse = {
            isSuccessful: true,
            data: {
              access_token: 'TOKEN',
            },
          };
          const httpResponse = {
            isSuccessful: false,
            code: 429,
            data: 'Too Many Requests',
          };

          authenticationMethodRepository.findOneByUserIdAndIdentityProvider.resolves(authenticationMethod);
          authenticationMethodRepository.updateAuthenticationComplementByUserIdAndIdentityProvider.resolves();

          httpAgent.post
            .withArgs({
              url: settings.poleEmploi.tokenUrl,
              headers: sinon.match.any,
              payload: sinon.match.any,
              timeout: settings.partner.fetchTimeOut,
            })
            .resolves(tokenResponse)
            .withArgs({
              url: settings.poleEmploi.sendingUrl,
              headers: sinon.match.any,
              payload: sinon.match.any,
              timeout: settings.partner.fetchTimeOut,
            })
            .resolves(httpResponse);
          httpErrorsHelper.serializeHttpErrorResponse.returns(httpResponse.data);
          logger.error.resolves();

          const expectedLoggerMessage = httpResponse.data;
          const expectedResult = {
            code: httpResponse.code,
            isSuccessful: httpResponse.isSuccessful,
          };

          // when
          const result = await notify(userId, payload, {
            authenticationMethodRepository,
            httpAgent,
            httpErrorsHelper,
            logger,
          });

          // then
          expect(logger.error).to.have.been.calledWithExactly({
            event: 'participation-send-pole-emploi',
            'pole-emploi-action': 'send-results',
            'participation-state': 'PARTICIPATION_SHARED',
            message: expectedLoggerMessage,
            'participation-id': 777,
          });
          expect(result).to.deep.equal(expectedResult);
        });
      });
    });
  });
});
