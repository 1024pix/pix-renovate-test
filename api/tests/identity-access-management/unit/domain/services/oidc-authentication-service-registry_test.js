import { OidcProvider } from '../../../../../src/identity-access-management/domain/models/OidcProvider.js';
import { FwbOidcAuthenticationService } from '../../../../../src/identity-access-management/domain/services/fwb-oidc-authentication-service.js';
import { OidcAuthenticationService } from '../../../../../src/identity-access-management/domain/services/oidc-authentication-service.js';
import { OidcAuthenticationServiceRegistry } from '../../../../../src/identity-access-management/domain/services/oidc-authentication-service-registry.js';
import { PoleEmploiOidcAuthenticationService } from '../../../../../src/identity-access-management/domain/services/pole-emploi-oidc-authentication-service.js';
import { oidcProviderRepository } from '../../../../../src/identity-access-management/infrastructure/repositories/oidc-provider-repository.js';
import { expect, sinon } from '../../../../test-helper.js';

describe('Unit | Identity Access Management | Domain | Services | oidc-authentication-service-registry', function () {
  let oidcAuthenticationServiceRegistry;

  beforeEach(function () {
    oidcAuthenticationServiceRegistry = new OidcAuthenticationServiceRegistry();
  });

  describe('#loadOidcProviderServices', function () {
    describe('when oidc provider services are already loaded', function () {
      it('returns undefined', async function () {
        // given
        sinon
          .stub(oidcProviderRepository, 'findAllOidcProviders')
          .resolves([{ code: 'ONE' }, { code: 'OIDC' }, { code: 'OIDC_FOR_PIX_ADMIN' }]);

        const oidcProviderServices = [
          { code: 'ONE' },
          { code: 'OIDC', isReady: true },
          { code: 'OIDC_FOR_PIX_ADMIN', isReadyForPixAdmin: true },
        ];
        await oidcAuthenticationServiceRegistry.loadOidcProviderServices(oidcProviderServices);

        // when
        const result = await oidcAuthenticationServiceRegistry.loadOidcProviderServices(oidcProviderServices);

        // then
        expect(result).to.be.undefined;
      });
    });

    describe('when oidc provider services are not loaded', function () {
      it('loads all given oidc provider services, filters them and returns true', async function () {
        // given
        const oidcProviderServices = [
          { code: 'ONE' },
          { code: 'OIDC', isReady: true },
          { code: 'OIDC_FOR_PIX_ADMIN', isReadyForPixAdmin: true },
        ];

        // when
        const result = await oidcAuthenticationServiceRegistry.loadOidcProviderServices(oidcProviderServices);

        // then
        const allOidcProviderServices = oidcAuthenticationServiceRegistry.getAllOidcProviderServices();
        const readyOidcProviderServices = oidcAuthenticationServiceRegistry.getReadyOidcProviderServices();
        const readyOidcProviderServicesForPixAdmin =
          oidcAuthenticationServiceRegistry.getReadyOidcProviderServicesForPixAdmin();

        expect(result).to.be.true;
        expect(allOidcProviderServices).to.have.lengthOf(3);

        expect(readyOidcProviderServices).to.have.lengthOf(1);
        expect(readyOidcProviderServices.map((service) => service.code)).to.contain('OIDC');

        expect(readyOidcProviderServicesForPixAdmin).to.have.lengthOf(1);
        expect(readyOidcProviderServicesForPixAdmin.map((service) => service.code)).to.contain('OIDC_FOR_PIX_ADMIN');
      });
    });

    describe('when oidc provider services loads providers', function () {
      it('instantciates the correct OIDC authentication services', async function () {
        // given
        sinon
          .stub(oidcProviderRepository, 'findAllOidcProviders')
          .resolves([
            new OidcProvider({ identityProvider: 'GENERIC' }),
            new OidcProvider({ identityProvider: 'FWB' }),
            new OidcProvider({ identityProvider: 'POLE_EMPLOI' }),
          ]);

        // when
        await oidcAuthenticationServiceRegistry.loadOidcProviderServices();
        const services = oidcAuthenticationServiceRegistry.getAllOidcProviderServices();

        // then
        expect(services).to.have.lengthOf(3);

        const genericService = services.find((service) => service.identityProvider === 'GENERIC');
        expect(genericService).not.to.be.empty;
        expect(genericService).to.be.instanceOf(OidcAuthenticationService);

        const fwbService = services.find((service) => service.identityProvider === 'FWB');
        expect(fwbService).not.to.be.empty;
        expect(fwbService).to.be.instanceOf(FwbOidcAuthenticationService);

        const poleEmploiService = services.find((service) => service.identityProvider === 'POLE_EMPLOI');
        expect(poleEmploiService).not.to.be.empty;
        expect(poleEmploiService).to.be.instanceOf(PoleEmploiOidcAuthenticationService);
      });
    });
  });

  describe('#configureReadyOidcProviderServiceByCode', function () {
    context('when oidc provider service does not exist', function () {
      it('returns undefined', async function () {
        // when
        const result = await oidcAuthenticationServiceRegistry.configureReadyOidcProviderServiceByCode('OIDC');

        // then
        expect(result).to.be.undefined;
      });
    });

    context('when oidc provider service exists and loaded', function () {
      it('configures openid client for ready oidc provider service and returns true', async function () {
        // given
        const createClient = sinon.stub().resolves();
        const oidcProviderServices = [
          {
            code: 'OIDC',
            isReady: true,
            createClient,
          },
        ];
        await oidcAuthenticationServiceRegistry.loadOidcProviderServices(oidcProviderServices);

        // when
        const result = await oidcAuthenticationServiceRegistry.configureReadyOidcProviderServiceByCode(
          oidcProviderServices[0].code,
        );

        // then
        expect(result).to.be.true;
        expect(createClient).to.have.been.calledOnce;
      });

      context('when there is already a client instantiated', function () {
        it('returns undefined', async function () {
          // given
          const oidcProviderServices = [
            {
              code: 'OIDC',
              isReady: true,
              client: {},
            },
          ];
          await oidcAuthenticationServiceRegistry.loadOidcProviderServices(oidcProviderServices);

          // when
          const result = await oidcAuthenticationServiceRegistry.configureReadyOidcProviderServiceByCode('OIDC');

          // then
          expect(result).to.be.undefined;
        });
      });
    });
  });
});
