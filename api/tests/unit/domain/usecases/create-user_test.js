const { expect, sinon } = require('../../../test-helper');
const usecases = require('../../../../lib/domain/usecases');
const errors = require('../../../../lib/domain/errors');
const User = require('../../../../lib/domain/models/User');

describe('Unit | UseCase | create-user', () => {

  const userRepository = {
    isEmailAvailable: () => undefined,
    save: () => undefined,
  };
  const userValidator = { validate: () => undefined };
  const encryptionService = { hashPassword: () => undefined };
  const mailService = { sendAccountCreationEmail: () => undefined };
  const reCaptchaValidator = { verify: () => undefined };

  const userId = 123;
  const userEmail = 'test@example.net';
  const password = 'PASSWORD';
  const reCaptchaToken = 'ReCaptchaToken';
  const user = new User({ email: userEmail, password });
  const encryptedPassword = '3ncrypt3dP@$$w@rd';
  const savedUser = new User({ id: userId, email: userEmail });

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(userRepository, 'isEmailAvailable');
    sandbox.stub(userRepository, 'save');
    sandbox.stub(userValidator, 'validate');
    sandbox.stub(encryptionService, 'hashPassword');
    sandbox.stub(mailService, 'sendAccountCreationEmail');
    sandbox.stub(reCaptchaValidator, 'verify');

    userRepository.isEmailAvailable.resolves();
    userRepository.save.resolves(savedUser);
    userValidator.validate.resolves();
    encryptionService.hashPassword.resolves(encryptedPassword);
    mailService.sendAccountCreationEmail.resolves();
    reCaptchaValidator.verify.resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('step validation of user', () => {

    context('when user email is already in use', () => {

      it('should check the non existence of email in UserRepository', () => {
        // given
        userRepository.isEmailAvailable.resolves();

        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        // then
        return promise
          .catch(() => {
            expect(userRepository.isEmailAvailable).to.have.been.calledWith(userEmail);
          });
      });

      it('should reject with an error EntityValidationError on email already registered', () => {
        // given
        const emailExistError = new errors.AlreadyRegisteredEmailError('email already exists');
        const expectedValidationError = new errors.EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'email',
              message: 'Cette adresse electronique est déjà enregistrée.',
            }
          ]
        });

        userRepository.isEmailAvailable.rejects(emailExistError);

        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        // then
        return promise
          .catch((error) => {
            expect(error).to.be.instanceOf(errors.EntityValidationError);
            expect(error.invalidAttributes).to.deep.equal(expectedValidationError.invalidAttributes);
          });
      });
    });

    context('when user validator fails', () => {

      it('should validate the user', () => {
        // given
        userValidator.validate.resolves();

        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        //then
        return promise
          .catch(() => {
            expect(userValidator.validate).to.have.been.calledWith(user);
          });
      });

      it('should reject with an error EntityValidationError containing the entityValidationError', () => {
        // given
        const expectedValidationError = new errors.EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'firstName',
              message: 'Votre prénom n’est pas renseigné.',
            },
            {
              attribute: 'password',
              message: 'Votre mot de passe n’est pas renseigné.',
            },
          ]
        });

        userValidator.validate.rejects(expectedValidationError);

        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        //then
        return promise
          .catch((error) => {
            expect(error).to.be.instanceOf(errors.EntityValidationError);
            expect(error.invalidAttributes).to.deep.equal(expectedValidationError.invalidAttributes);
          });
      });
    });

    context('when reCAPTCHA token is not valid', () => {

      it('should validate the token', () => {
        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        //then
        return promise
          .catch(() => {
            expect(reCaptchaValidator.verify).to.have.been.calledWith(reCaptchaToken);
          });
      });

      it('should reject with an error EntityValidationError containing the entityValidationError', () => {
        // given
        const invalidReCaptchaTokenError = new errors.InvalidRecaptchaTokenError('Invalid reCaptcha token');
        const expectedValidationError = new errors.EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'recaptchaToken',
              message: 'Merci de cocher la case ci-dessous :'
            }
          ]
        });

        reCaptchaValidator.verify.rejects(invalidReCaptchaTokenError);

        // when
        const promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        //then
        return promise
          .catch((error) => {
            expect(error).to.be.instanceOf(errors.EntityValidationError);
            expect(error.invalidAttributes).to.deep.equal(expectedValidationError.invalidAttributes);
          });
      });
    });

    context('when user email is already in use, user validator fails and invalid captcha token', () => {

      let promise;
      const entityValidationError = new errors.EntityValidationError({
        invalidAttributes: [
          {
            attribute: 'firstName',
            message: 'Votre prénom n’est pas renseigné.',
          },
          {
            attribute: 'password',
            message: 'Votre mot de passe n’est pas renseigné.',
          }
        ]
      });
      const emailExistError = new errors.AlreadyRegisteredEmailError('email already exists');
      const invalidReCaptchaTokenError = new errors.InvalidRecaptchaTokenError('Invalid reCaptcha token');

      it('should reject with an error EntityValidationError containing the entityValidationError and the AlreadyRegisteredEmailError', () => {
        // given
        userRepository.isEmailAvailable.rejects(emailExistError);
        userValidator.validate.rejects(entityValidationError);
        reCaptchaValidator.verify.rejects(invalidReCaptchaTokenError);

        // when
        promise = usecases.createUser({
          user, reCaptchaToken, userRepository, userValidator, reCaptchaValidator, encryptionService, mailService
        });

        // then
        return promise
          .catch((error) => {
            expect(error).to.be.instanceOf(errors.EntityValidationError);
            expect(error.invalidAttributes).to.have.lengthOf(4);
          });
      });
    });
  });

  context('when user is valid', () => {

    context('step hash password and save user', () => {

      // given
      let promise;
      const userWithEncryptedPassword = new User({ email: userEmail, password: encryptedPassword });

      beforeEach(() => {
        // when
        promise = usecases.createUser({
          user,
          reCaptchaToken,
          userRepository,
          userValidator,
          reCaptchaValidator,
          encryptionService,
          mailService,
        });
      });

      it('should encrypt the password', () => {
        // then
        return promise
          .then(() => {
            expect(encryptionService.hashPassword).to.have.been.calledWith(password);
          });
      });

      it('should save the user with a properly encrypted password', () => {
        // then
        return promise
          .then(() => {
            expect(userRepository.save).to.have.been.calledWith(userWithEncryptedPassword);
          });
      });
    });

    context('step send account creation email to user', () => {

      // given
      let promise;
      const user = new User({ email: userEmail });

      beforeEach(() => {
        // when
        promise = usecases.createUser({
          user,
          reCaptchaToken,
          userRepository,
          userValidator,
          reCaptchaValidator,
          encryptionService,
          mailService,
        });
      });

      // then
      it('should send the account creation email', () => {
        return promise
          .then(() => {
            expect(mailService.sendAccountCreationEmail).to.have.been.calledWith(userEmail);
          });
      });
    });

    it('should return saved user (with id)', () => {
      // when
      const promise = usecases.createUser({
        user,
        reCaptchaToken,
        userRepository,
        userValidator,
        reCaptchaValidator,
        encryptionService,
        mailService,
      });

      // then
      return promise
        .then((user) => {
          expect(user).to.deep.equal(savedUser);
        });
    });
  });
});
