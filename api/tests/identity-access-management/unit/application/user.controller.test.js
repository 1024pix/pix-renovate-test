import { userController } from '../../../../src/identity-access-management/application/user/user.controller.js';
import { User } from '../../../../src/identity-access-management/domain/models/User.js';
import { usecases } from '../../../../src/identity-access-management/domain/usecases/index.js';
import * as requestResponseUtils from '../../../../src/shared/infrastructure/utils/request-response-utils.js';
import { domainBuilder, expect, hFake, sinon } from '../../../test-helper.js';

describe('Unit | Identity Access Management | Application | Controller | User', function () {
  let userSerializer;

  beforeEach(function () {
    userSerializer = {
      deserialize: sinon.stub(),
      serialize: sinon.stub(),
    };
  });

  describe('#getCurrentUser', function () {
    it('gets the current user', async function () {
      // given
      const request = { auth: { credentials: { userId: 1 } } };
      const currentUser = Symbol('current-user');
      const getCurrentUserStub = sinon.stub(usecases, 'getCurrentUser');
      const userWithActivitySerializer = { serialize: sinon.stub() };

      usecases.getCurrentUser.withArgs({ authenticatedUserId: 1 }).resolves(currentUser);
      userWithActivitySerializer.serialize.withArgs(currentUser).returns('ok');

      // when
      const response = await userController.getCurrentUser(request, hFake, { userWithActivitySerializer });

      // then
      expect(response).to.be.equal('ok');
      expect(getCurrentUserStub).to.have.been.calledWithExactly({ authenticatedUserId: 1 });
      expect(userWithActivitySerializer.serialize).to.have.been.calledWithExactly(currentUser);
    });
  });

  describe('#getUserAuthenticationMethods', function () {
    it('calls the usecase to find user authentication methods', async function () {
      // given
      const user = domainBuilder.buildUser();
      const authenticationMethods = [
        domainBuilder.buildAuthenticationMethod.withPoleEmploiAsIdentityProvider({ userId: user.id }),
      ];

      const responseSerialized = Symbol('an response serialized');
      sinon.stub(usecases, 'findUserAuthenticationMethods');
      const authenticationMethodsSerializer = { serialize: sinon.stub() };

      usecases.findUserAuthenticationMethods.withArgs({ userId: user.id }).resolves(authenticationMethods);
      authenticationMethodsSerializer.serialize.withArgs(authenticationMethods).returns(responseSerialized);

      const request = {
        auth: {
          credentials: {
            userId: user.id,
          },
        },
        params: {
          id: user.id,
        },
      };

      // when
      const response = await userController.getUserAuthenticationMethods(request, hFake, {
        authenticationMethodsSerializer,
      });

      // then
      expect(response).to.deep.equal(responseSerialized);
    });
  });

  describe('#save', function () {
    const email = 'to-be-free@ozone.airplane';
    const password = 'Password123';

    const deserializedUser = new User();
    const savedUser = new User({ email });
    const localeFromHeader = 'fr-fr';
    let dependencies;

    beforeEach(function () {
      userSerializer.deserialize.returns(deserializedUser);

      const validationErrorSerializer = {
        deserialize: sinon.stub(),
        serialize: sinon.stub(),
      };
      const cryptoService = {
        hashPassword: sinon.stub(),
      };
      const mailService = {
        sendAccountCreationEmail: sinon.stub(),
      };
      const localeService = {
        getCanonicalLocale: sinon.stub(),
      };

      dependencies = {
        userSerializer,
        validationErrorSerializer,
        cryptoService,
        mailService,
        localeService,
        requestResponseUtils,
      };

      sinon.stub(usecases, 'createUser').returns(savedUser);
    });

    describe('when request is valid', function () {
      describe('when there is no locale cookie', function () {
        it('should return a serialized user and a 201 status code', async function () {
          // given
          const expectedSerializedUser = { message: 'serialized user' };
          userSerializer.serialize.returns(expectedSerializedUser);

          // when
          const response = await userController.save(
            {
              payload: {
                data: {
                  attributes: {
                    'first-name': 'John',
                    'last-name': 'DoDoe',
                    email: 'john.dodoe@example.net',
                    cgu: true,
                    password,
                  },
                },
              },
            },
            hFake,
            dependencies,
          );

          // then
          expect(dependencies.userSerializer.serialize).to.have.been.calledWithExactly(savedUser);
          expect(dependencies.localeService.getCanonicalLocale).to.not.have.been.called;
          expect(response.source).to.deep.equal(expectedSerializedUser);
          expect(response.statusCode).to.equal(201);
        });
      });

      describe('when there is a locale cookie', function () {
        it('should return a serialized user with "locale" attribute and a 201 status code', async function () {
          // given
          const localeFromCookie = 'fr-FR';
          const expectedSerializedUser = { message: 'serialized user', locale: localeFromCookie };
          const savedUser = new User({ email, locale: localeFromCookie });

          const useCaseParameters = {
            user: { ...deserializedUser, locale: localeFromCookie },
            password,
            localeFromHeader,
            campaignCode: null,
          };

          dependencies.localeService.getCanonicalLocale.returns(localeFromCookie);
          dependencies.userSerializer.serialize.returns(expectedSerializedUser);
          usecases.createUser.resolves(savedUser);

          // when
          const response = await userController.save(
            {
              payload: {
                data: {
                  attributes: {
                    'first-name': 'John',
                    'last-name': 'DoDoe',
                    email: 'john.dodoe@example.net',
                    cgu: true,
                    password,
                  },
                },
              },
              state: {
                locale: localeFromCookie,
              },
            },
            hFake,
            dependencies,
          );

          // then
          expect(usecases.createUser).to.have.been.calledWithExactly(useCaseParameters);
          expect(dependencies.localeService.getCanonicalLocale).to.have.been.calledWithExactly(localeFromCookie);
          expect(dependencies.userSerializer.serialize).to.have.been.calledWithExactly(savedUser);
          expect(response.statusCode).to.equal(201);
        });
      });
    });
  });

  describe('#updatePassword', function () {
    const userId = 7;
    const userPassword = 'Pix2017!';
    const userTemporaryKey = 'good-temporary-key';
    const payload = {
      data: {
        attributes: {
          password: userPassword,
        },
      },
    };
    const request = {
      params: {
        id: userId,
      },
      query: {
        'temporary-key': userTemporaryKey,
      },
      payload,
    };

    beforeEach(function () {
      sinon.stub(usecases, 'updateUserPassword');
    });

    it('updates password', async function () {
      // given
      usecases.updateUserPassword
        .withArgs({
          userId,
          password: userPassword,
          temporaryKey: userTemporaryKey,
        })
        .resolves({});

      // when
      const response = await userController.updatePassword(request, hFake);

      // then
      expect(response.statusCode).to.equal(204);
    });
  });
});
