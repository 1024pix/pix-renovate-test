const { expect, sinon } = require('../../../test-helper');
const gRecaptcha = require('../../../../lib/infrastructure/validators/grecaptcha-validator');
const { InvalidRecaptchaTokenError } = require('../../../../lib/domain/errors');
const request = require('request');
const logger = require('../../../../lib/infrastructure/logger');
const { captcha } = require('../../../../lib/settings');

const INVALID_OR_UNKNOW_RECAPTCHA = 'INVALID_RECAPTCHA';
const RECAPTCHA_TOKEN = 'a-valid-recaptch-token-should-be-a-string-of-512-numalpha-characters';
const SUCCESSFULL_VERIFICATION_RESPONSE = { 'body': '{\n  "success": true,\n "hostname": "",\n  "error-codes": [\n    "timeout-or-duplicate"\n  ]\n}' };
const UNSUCCESSFULL_VERIFICATION_RESPONSE = { 'body': '{\n  "success": false,\n "hostname": "",\n  "error-codes": [\n    "timeout-or-duplicate"\n  ]\n}' };

describe('Unit | Service | google-recaptcha-validator', () => {

  describe('#verify', () => {

    it('should be a function', function() {
      expect(gRecaptcha.verify).to.be.a('function');
    });

    it('should call google verify with good url and query parameters', function() {
      // given
      sinon.stub(request, 'post').callsFake((uri, cb) => {
        // then
        expect(uri).to.equal(`https://www.google.com/recaptcha/api/siteverify?secret=${captcha.googleRecaptchaSecret}&response=${RECAPTCHA_TOKEN}`);

        cb(null, SUCCESSFULL_VERIFICATION_RESPONSE);
      });

      // when
      return gRecaptcha.verify(RECAPTCHA_TOKEN);
    });

    describe('Success case', function() {
      let requestPostErrorStub;

      beforeEach(() => {
        requestPostErrorStub = sinon.stub(request, 'post');
      });

      it('should return a resolved promise when user response token is valid', function() {
        // given
        requestPostErrorStub.callsArgWith(1, null, SUCCESSFULL_VERIFICATION_RESPONSE);

        // when
        const promise = gRecaptcha.verify(RECAPTCHA_TOKEN);

        // then
        return expect(promise).to.be.fulfilled;
      });

    });

    describe('Error cases', function() {

      let loggerStub;
      let requestPostErrorStub;
      const error = new Error();

      beforeEach(() => {
        loggerStub = sinon.stub(logger, 'error').returns({});
        requestPostErrorStub = sinon.stub(request, 'post');
      });

      it('should return a rejected promise, when user response token is invalid', function() {
        // given
        requestPostErrorStub.callsArgWith(1, null, UNSUCCESSFULL_VERIFICATION_RESPONSE);

        // when
        const promise = gRecaptcha.verify(INVALID_OR_UNKNOW_RECAPTCHA);

        // then
        return promise.catch((err) => {

          expect(promise).to.be.rejected;
          expect(promise).to.be.rejectedWith('Invalid reCaptcha token');
          expect(err instanceof InvalidRecaptchaTokenError).to.be.ok;

        });

      });

      it('should return a rejected promise when request failed for network reason', function() {
        // given
        requestPostErrorStub.callsArgWith(1, error);

        // when
        const promise = gRecaptcha.verify('foo-bar');
        return promise.catch((err) => {
          expect(promise).to.be.rejected;
          expect(err).to.be.equal('An error occurred during connection to the Google servers');
        });
      });

      it('should call logger once time, when request failed for network reason', function() {
        // given
        requestPostErrorStub.callsArgWith(1, error);
        // when
        return gRecaptcha.verify('foo-bar').catch(() => {
          sinon.assert.calledOnce(loggerStub);
        });
      });
    });

  });

});

