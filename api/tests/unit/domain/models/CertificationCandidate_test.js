import { CERTIFICATION_CANDIDATES_ERRORS } from '../../../../lib/domain/constants/certification-candidates-errors.js';
import {
  CertificationCandidatePersonalInfoFieldMissingError,
  CertificationCandidatePersonalInfoWrongFormat,
  CertificationCandidatesError,
} from '../../../../lib/domain/errors.js';
import { CertificationCandidate } from '../../../../lib/domain/models/index.js';
import { Subscription } from '../../../../src/certification/enrolment/domain/models/Subscription.js';
import { catchErr, catchErrSync, domainBuilder, expect } from '../../../test-helper.js';
import { getI18n } from '../../../tooling/i18n/i18n.js';

const FIRST_NAME_ERROR_CODE = CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_FIRST_NAME_REQUIRED.code;
const LAST_NAME_ERROR_CODE = CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_LAST_NAME_REQUIRED.code;
const BIRTHDATE_ERROR_CODE = CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_BIRTHDATE_REQUIRED.code;
const SEX_ERROR_CODE = CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_SEX_REQUIRED.code;

const i18n = getI18n();
const translate = i18n.__;

describe('Unit | Domain | Models | Certification Candidate', function () {
  let rawData;
  let expectedData;
  let coreSubscription;

  beforeEach(function () {
    coreSubscription = domainBuilder.buildCoreSubscription();

    rawData = {
      firstName: 'Jean-Pierre',
      lastName: 'Foucault',
      birthCity: 'Marseille',
      birthProvinceCode: '13',
      birthCountry: 'France',
      externalId: 'QVGDM',
      email: 'jp@fou.com',
      birthdate: '1940-05-05',
      extraTimePercentage: 0.3,
      sessionId: 1,
      userId: 2,
      sex: 'M',
      subscriptions: [coreSubscription],
      billingMode: 'FREE',
    };

    expectedData = {
      ...rawData,
      id: undefined,
      authorizedToStart: false,
      billingMode: 'FREE',
      birthINSEECode: undefined,
      birthPostalCode: undefined,
      createdAt: undefined,
      organizationLearnerId: null,
      prepaymentCode: null,
      resultRecipientEmail: undefined,
      complementaryCertification: null,
      subscriptions: [coreSubscription],
    };
  });

  describe('constructor', function () {
    describe('when there is no complementary certification', function () {
      it('should build a Certification Candidate', function () {
        const certificationCandidate = new CertificationCandidate(rawData);

        expect(certificationCandidate).to.deep.equal(expectedData);
      });
    });

    describe('when there is a complementary certification', function () {
      it('should build a Certification Candidate', function () {
        // given
        rawData = {
          ...rawData,
          complementaryCertification: { id: 99 },
        };

        expectedData = {
          ...expectedData,
          complementaryCertification: { id: 99 },
          subscriptions: [
            coreSubscription,
            domainBuilder.buildComplementarySubscription({ complementaryCertificationId: 99 }),
          ],
        };

        // when
        const certificationCandidate = new CertificationCandidate(rawData);

        // then
        expect(certificationCandidate).to.deep.equal(expectedData);
      });
    });
  });

  describe('validate', function () {
    const buildCertificationCandidate = (attributes) => new CertificationCandidate(attributes);

    context('when all required fields are presents', function () {
      it('should not throw when object is valid', function () {
        // given
        const certificationCandidate = buildCertificationCandidate(rawData);

        // when, then
        certificationCandidate.validate();
      });
    });

    // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      { name: 'firstName', code: 'CANDIDATE_FIRST_NAME_MUST_BE_A_STRING' },
      { name: 'lastName', code: 'CANDIDATE_LAST_NAME_MUST_BE_A_STRING' },
    ].forEach((field) => {
      it(`should throw an error when field ${field.name} is not a string`, async function () {
        // given
        const certificationCandidatesError = new CertificationCandidatesError({
          code: field.code,
          meta: 123,
        });

        // when
        const candidate = buildCertificationCandidate({ ...rawData, [field.name]: 123 });
        const error = catchErrSync(() => candidate.validate())();

        // then
        expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
      });

      [
        { name: 'firstName', code: 'CANDIDATE_FIRST_NAME_REQUIRED' },
        { name: 'lastName', code: 'CANDIDATE_LAST_NAME_REQUIRED' },
      ].forEach((field) => {
        it(`should throw an error when field ${field.name} is not present`, async function () {
          //given
          const certificationCandidate = buildCertificationCandidate({ ...rawData, [field.name]: undefined });
          const certificationCandidatesError = new CertificationCandidatesError({
            code: field.code,
          });

          // when
          const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

          // then
          expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
        });

        it(`should throw an error when field ${field.name} contains only spaces`, async function () {
          //given
          const certificationCandidate = buildCertificationCandidate({ ...rawData, [field.name]: ' ' });
          const certificationCandidatesError = new CertificationCandidatesError({
            code: field.code,
          });

          // when
          const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

          // then
          expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
        });

        it(`should throw an error when field ${field.name} is not present because null`, async function () {
          // given
          const certificationCandidate = buildCertificationCandidate({ ...rawData, [field.name]: null });
          const certificationCandidatesError = new CertificationCandidatesError({
            code: field.code,
          });

          // when
          const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

          // then
          expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
        });
      });
    });

    it('should throw an error when field sessionId is not a number', async function () {
      //given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sessionId: 'salut' });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_SESSION_ID_NOT_A_NUMBER',
        meta: 'salut',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when field sessionId is not present', async function () {
      //given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sessionId: undefined });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_SESSION_ID_REQUIRED',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when field sessionId is not present because null', async function () {
      //given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sessionId: null });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_SESSION_ID_REQUIRED',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when field externalId is not a string', async function () {
      //given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, externalId: 1235 });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_EXTERNAL_ID_MUST_BE_A_STRING',
        meta: 1235,
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when birthdate is not a date', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({
        ...rawData,
        birthdate: 'je mange des légumes',
      });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_BIRTHDATE_FORMAT_NOT_VALID',
        meta: 'je mange des légumes',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when birthdate is not a valid format', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, birthdate: '2020/02/01' });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_BIRTHDATE_FORMAT_NOT_VALID',
        meta: '2020/02/01',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when birthdate is null', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, birthdate: null });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_BIRTHDATE_REQUIRED',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when birthdate is not present', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, birthdate: undefined });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_BIRTHDATE_REQUIRED',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when field extraTimePercentage is not a number', async function () {
      const certificationCandidate = buildCertificationCandidate({
        ...rawData,
        extraTimePercentage: 'salut',
      });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_EXTRA_TIME_INTEGER',
        meta: NaN,
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when sex is neither M nor F', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sex: 'something_else' });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_SEX_NOT_VALID',
        meta: 'something_else',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should throw an error when the complementary certification format is not valid', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({
        ...rawData,
        complementaryCertification: {},
      });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: '"complementaryCertification.id" is required',
        meta: null,
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should return a report when email is not a valid format', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({
        ...rawData,
        email: 'email@example.net, anotheremail@example.net',
      });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_EMAIL_NOT_VALID',
        meta: 'email@example.net, anotheremail@example.net',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    it('should return a report when resultRecipientEmail is not a valid format', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({
        ...rawData,
        resultRecipientEmail: 'email@example.net, anotheremail@example.net',
      });
      const certificationCandidatesError = new CertificationCandidatesError({
        code: 'CANDIDATE_RESULT_RECIPIENT_EMAIL_NOT_VALID',
        meta: 'email@example.net, anotheremail@example.net',
      });

      // when
      const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

      // then
      expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
    });

    context('when the certification center is SCO', function () {
      context('when the billing mode is null', function () {
        it('should not throw an error', async function () {
          // given
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            ...rawData,
            billingMode: null,
          });
          const isSco = true;
          // when
          const call = () => {
            certificationCandidate.validate(isSco);
          };

          // then
          expect(call).to.not.throw();
        });
      });
    });

    context('when the certification center is not SCO', function () {
      it('should throw an error if billingMode is null', async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate({
          ...rawData,
          billingMode: null,
        });

        const certificationCandidatesError = new CertificationCandidatesError({
          code: 'CANDIDATE_BILLING_MODE_REQUIRED',
          meta: null,
        });

        // when
        const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

        // then
        expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
      });

      it('should throw an error if billingMode is not an expected value', async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate({
          ...rawData,
          billingMode: 'NOT_ALLOWED_VALUE',
        });
        const isSco = false;

        const certificationCandidatesError = new CertificationCandidatesError({
          code: 'CANDIDATE_BILLING_MODE_NOT_VALID',
          meta: 'NOT_ALLOWED_VALUE',
        });

        // when
        const error = await catchErr(certificationCandidate.validate, certificationCandidate)(isSco);

        // then
        expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
      });

      // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
      // eslint-disable-next-line mocha/no-setup-in-describe
      ['FREE', 'PAID', 'PREPAID'].forEach((billingMode) => {
        it(`should not throw if billing mode is an expected value ${billingMode}`, async function () {
          // given
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            ...rawData,
            billingMode,
            prepaymentCode: billingMode === CertificationCandidate.BILLING_MODES.PREPAID ? '12345' : undefined,
          });

          // when
          const call = () => {
            certificationCandidate.validate();
          };

          // then
          expect(call).to.not.throw();
        });
      });

      context('when billingMode is not PREPAID', function () {
        it('should throw an error if prepaymentCode is not null', async function () {
          // given
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            ...rawData,
            billingMode: 'PAID',
            prepaymentCode: 'NOT_NULL',
          });

          const certificationCandidatesError = new CertificationCandidatesError({
            code: 'CANDIDATE_PREPAYMENT_CODE_MUST_BE_EMPTY',
            meta: 'NOT_NULL',
          });

          // when
          const error = await catchErr(certificationCandidate.validate, certificationCandidate)();

          // then
          expect(error).to.deepEqualInstanceOmitting(certificationCandidatesError, ['message', 'stack']);
        });
      });

      context('when billingMode is PREPAID', function () {
        it('should not throw an error if prepaymentCode is not null', function () {
          // given
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            ...rawData,
            billingMode: 'PREPAID',
            prepaymentCode: 'NOT_NULL',
          });

          // when
          const call = () => {
            certificationCandidate.validate();
          };

          // then
          expect(call).to.not.throw();
        });
      });
    });
  });

  describe('validateForMassSessionImport', function () {
    const buildCertificationCandidate = (attributes) => new CertificationCandidate(attributes);

    context('when all required fields are presents', function () {
      it('should return nothing', function () {
        // given
        const certificationCandidate = buildCertificationCandidate(rawData);

        // when
        const report = certificationCandidate.validateForMassSessionImport();

        // then
        expect(report).to.be.undefined;
      });
    });

    // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      { field: 'firstName', expectedCode: FIRST_NAME_ERROR_CODE },
      { field: 'lastName', expectedCode: LAST_NAME_ERROR_CODE },
      { field: 'birthdate', expectedCode: BIRTHDATE_ERROR_CODE },
      {
        field: 'sex',
        expectedCode: SEX_ERROR_CODE,
      },
    ].forEach(({ field, expectedCode }) => {
      it(`should return a report when field ${field} is not present`, async function () {
        // given
        const certificationCandidate = buildCertificationCandidate({ ...rawData, [field]: undefined });

        // when
        const report = certificationCandidate.validateForMassSessionImport();

        // then
        expect(report).to.deep.equal([`${expectedCode}`]);
      });

      it(`should return a report when field ${field} is null`, async function () {
        // given
        const certificationCandidate = buildCertificationCandidate({ ...rawData, [field]: null });

        // when
        const report = certificationCandidate.validateForMassSessionImport();

        // then
        expect(report).to.deep.equal([expectedCode]);
      });
    });

    it('should return a report when birthdate is not a valid format', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, birthdate: '2020/02/01' });

      // when
      const report = certificationCandidate.validateForMassSessionImport();

      // then
      expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_BIRTHDATE_FORMAT_NOT_VALID.code]);
    });

    it('should return a report when birthdate is null', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, birthdate: null });

      // when
      const report = certificationCandidate.validateForMassSessionImport();

      // then
      expect(report).to.deep.equal([BIRTHDATE_ERROR_CODE]);
    });

    context('when extraTimePercentage field is presents', function () {
      it('should return a report when field extraTimePercentage is not a number', async function () {
        // given
        const certificationCandidate = buildCertificationCandidate({
          ...rawData,
          extraTimePercentage: 'salut',
        });

        // when
        const report = certificationCandidate.validateForMassSessionImport();

        //then
        expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_EXTRA_TIME_INTEGER.code]);
      });

      it('should throw an error when field extraTimePercentage is greater than 10', async function () {
        const certificationCandidate = buildCertificationCandidate({
          ...rawData,
          extraTimePercentage: 11,
        });

        const report = certificationCandidate.validateForMassSessionImport();

        // then
        expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_EXTRA_TIME_OUT_OF_RANGE.code]);
      });
    });

    it('should return a report when sex is neither M nor F', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sex: 'something_else' });

      // when
      const report = certificationCandidate.validateForMassSessionImport();

      // then
      expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_SEX_NOT_VALID.code]);
    });

    it('should return a report when sex is null', async function () {
      // given
      const certificationCandidate = buildCertificationCandidate({ ...rawData, sex: null });

      // when
      const report = certificationCandidate.validateForMassSessionImport();

      // then
      expect(report).to.deep.equal([SEX_ERROR_CODE]);
    });

    context('when billing mode field is presents', function () {
      context('when the certification center is SCO', function () {
        context('when the billing mode is null', function () {
          it('should return nothing', async function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: null,
            });
            const isSco = true;

            // when
            const report = certificationCandidate.validateForMassSessionImport(isSco);

            // then
            expect(report).to.be.undefined;
          });
        });

        context('when the billing mode is not null', function () {
          it('should return a report', async function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: 'FREE',
            });
            const isSco = true;

            // when
            const report = certificationCandidate.validateForMassSessionImport(isSco);

            // then
            expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_BILLING_MODE_MUST_BE_EMPTY.code]);
          });
        });
      });

      context('when the certification center is not SCO', function () {
        context('when the billing mode is not provided', function () {
          it('should return a report', async function () {
            // given
            const isSco = false;
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: null,
            });

            // when
            const report = certificationCandidate.validateForMassSessionImport(isSco);

            // then
            expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_BILLING_MODE_REQUIRED.code]);
          });
        });

        context('when the billing mode is not an expected value', function () {
          it('should return a report', async function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: 'NOT_ALLOWED_VALUE',
            });
            const isSco = false;

            // when
            const report = certificationCandidate.validateForMassSessionImport(isSco);

            // then
            expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_BILLING_MODE_NOT_VALID.code]);
          });
        });

        context('when billing mode is in the expected values', function () {
          // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
          // eslint-disable-next-line mocha/no-setup-in-describe
          ['FREE', 'PAID', 'PREPAID'].forEach((billingMode) => {
            it(`should return nothing for ${billingMode}`, async function () {
              // given
              const certificationCandidate = domainBuilder.buildCertificationCandidate({
                ...rawData,
                billingMode,
                prepaymentCode: billingMode === CertificationCandidate.BILLING_MODES.PREPAID ? '12345' : undefined,
              });

              // when
              const report = certificationCandidate.validateForMassSessionImport();

              // then
              expect(report).to.be.undefined;
            });
          });
        });

        context('when billingMode is not PREPAID', function () {
          context('when prepaymentCode is not null', function () {
            it('should return a report', async function () {
              // given
              const certificationCandidate = domainBuilder.buildCertificationCandidate({
                ...rawData,
                billingMode: 'PAID',
                prepaymentCode: 'NOT_NULL',
              });

              // when
              const report = certificationCandidate.validateForMassSessionImport();

              // then
              expect(report).to.deep.equal([
                CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_PREPAYMENT_CODE_MUST_BE_EMPTY.code,
              ]);
            });
          });
        });

        context('when billingMode is PREPAID', function () {
          it('should return nothing if prepaymentCode is not null', function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: 'PREPAID',
              prepaymentCode: 'NOT_NULL',
            });

            // when
            const report = certificationCandidate.validateForMassSessionImport();

            // then
            expect(report).to.be.undefined;
          });

          it('should return report if prepaymentCode is null', function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              ...rawData,
              billingMode: 'PREPAID',
              prepaymentCode: '',
            });

            // when
            const report = certificationCandidate.validateForMassSessionImport();

            // then
            expect(report).to.deep.equal([CERTIFICATION_CANDIDATES_ERRORS.CANDIDATE_PREPAYMENT_CODE_REQUIRED.code]);
          });
        });
      });
    });

    context('when there are multiple errors', function () {
      it('should return multiple message', function () {
        // given
        const certificationCandidate = buildCertificationCandidate({
          ...rawData,
          firstName: undefined,
          birthdate: undefined,
          billingMode: 'FREE',
        });

        // when
        const report = certificationCandidate.validateForMassSessionImport();

        // then
        expect(report).to.deep.equal([FIRST_NAME_ERROR_CODE, BIRTHDATE_ERROR_CODE]);
      });
    });
  });

  describe('validateParticipation', function () {
    it('should not throw when the object is valid', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate(rawData);

      // when, then
      certificationCandidate.validateParticipation();
    });

    it('should return an error if firstName is not defined', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, firstName: null });
      certificationCandidate.firstName = undefined;

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoFieldMissingError);
      }
    });

    it('should return an error if firstName is not a string', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, firstName: 123 });
      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should return an error if lastName is not defined', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, lastName: null });
      certificationCandidate.lastName = undefined;

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoFieldMissingError);
      }
    });

    it('should return an error if lastName is not a string', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, lastName: 123 });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should return an error if birthdate is not defined', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, birthdate: null });
      certificationCandidate.birthdate = undefined;

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoFieldMissingError);
      }
    });

    it('should return an error if birthdate is not a date in iso format', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, birthdate: '04/01/1990' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should return an error if birthdate not greater than 1900-01-01', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, birthdate: '1899-06-06' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should return an error if birthdate does not exist (such as 31th November)', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, birthdate: '1999-11-31' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should return an error if sessionId is not defined', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, sessionId: null });
      certificationCandidate.sessionId = undefined;

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoFieldMissingError);
      }
    });

    it('should return an error if sessionId is not a number', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, sessionId: 'a' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
    // eslint-disable-next-line mocha/no-setup-in-describe
    ['FREE', 'PAID', 'PREPAID'].forEach((billingMode) => {
      it(`should not throw if billing mode is expected value ${billingMode}`, async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate({
          ...rawData,
          billingMode,
          prepaymentCode: billingMode === CertificationCandidate.BILLING_MODES.PREPAID ? '12345' : undefined,
        });

        // when
        const call = () => {
          certificationCandidate.validateParticipation();
        };

        // then
        expect(call).to.not.throw();
      });
    });

    it('should throw an error when billing mode is none of the expected values', async function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, billingMode: 'Cadeau !' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoWrongFormat);
      }
    });

    it('should throw an error if billing mode is "Prépayée" but prepaymentCode is empty', async function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, billingMode: 'PREPAID' });

      // when
      try {
        certificationCandidate.validateParticipation();
        expect.fail('Expected error to have been thrown');
      } catch (err) {
        // then
        expect(err).to.be.instanceOf(CertificationCandidatePersonalInfoFieldMissingError);
      }
    });
  });

  describe('updateBirthInformation', function () {
    it("should update certification candidate's birth information", function () {
      // given
      const birthCountry = 'birthCountry';
      const birthINSEECode = 'birthINSEECode';
      const birthPostalCode = 'birthPostalCode';
      const birthCity = 'birthCity';

      const certificationCandidate = domainBuilder.buildCertificationCandidate(rawData);

      // when
      certificationCandidate.updateBirthInformation({ birthCountry, birthINSEECode, birthPostalCode, birthCity });

      // then
      expect(certificationCandidate.birthCountry).to.equal(birthCountry);
      expect(certificationCandidate.birthINSEECode).to.equal(birthINSEECode);
      expect(certificationCandidate.birthPostalCode).to.equal(birthPostalCode);
      expect(certificationCandidate.birthCity).to.equal(birthCity);
    });
  });

  describe('isAuthorizedToStart', function () {
    it('should return false when authorizedToStart is false', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        authorizedToStart: false,
      });

      // then
      expect(certificationCandidate.isAuthorizedToStart()).to.be.false;
    });

    it('should return true when authorizedToStart is true', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({ ...rawData, authorizedToStart: true });

      // then
      expect(certificationCandidate.isAuthorizedToStart()).to.be.true;
    });
  });

  describe('isBillingModePrepaid', function () {
    it('should return false when billingMode is not prepaid', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        billingMode: CertificationCandidate.BILLING_MODES.FREE,
      });

      // then
      expect(certificationCandidate.isBillingModePrepaid()).to.be.false;
    });

    it('should return true when billingMode is prepaid', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        billingMode: CertificationCandidate.BILLING_MODES.PREPAID,
      });

      // then
      expect(certificationCandidate.isBillingModePrepaid()).to.be.true;
    });
  });

  describe('parseBillingMode', function () {
    // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      { value: 'Gratuite', expectedTranslation: 'FREE' },
      { value: 'Payante', expectedTranslation: 'PAID' },
      { value: 'Prépayée', expectedTranslation: 'PREPAID' },
    ].forEach(({ value, expectedTranslation }) => {
      it(`should return ${expectedTranslation} when ${value} is translated`, function () {
        expect(CertificationCandidate.parseBillingMode({ billingMode: value, translate })).to.equal(
          expectedTranslation,
        );
      });
    });
  });

  describe('translateBillingMode', function () {
    // Rule disabled to allow dynamic generated tests. See https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-setup-in-describe.md#disallow-setup-in-describe-blocks-mochano-setup-in-describe
    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      { value: 'FREE', expectedTranslation: 'Gratuite' },
      { value: 'PAID', expectedTranslation: 'Payante' },
      { value: 'PREPAID', expectedTranslation: 'Prépayée' },
    ].forEach(({ value, expectedTranslation }) => {
      it(`should return ${expectedTranslation} when ${value} is translated`, function () {
        expect(CertificationCandidate.translateBillingMode({ billingMode: value, translate })).to.equal(
          expectedTranslation,
        );
      });
    });
  });

  describe('#isGranted', function () {
    it('should return true when certification candidate has acquired complementary certification', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        complementaryCertification: domainBuilder.buildComplementaryCertification({ key: 'PIX+' }),
      });

      // when/then
      expect(certificationCandidate.isGranted('PIX+')).to.be.true;
    });

    it('should return false when certification candidate has not acquired complementary certification', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        complementaryCertification: domainBuilder.buildComplementaryCertification({ key: 'toto' }),
      });

      // when/then
      expect(certificationCandidate.isGranted('PIX+')).to.be.false;
    });
  });

  describe('convertExtraTimePercentageToDecimal', function () {
    it('should convert extraTimePercentageToDecimal integer to decimal', function () {
      // given
      const certificationCandidate = domainBuilder.buildCertificationCandidate({
        ...rawData,
        extraTimePercentage: 20,
      });

      // when
      certificationCandidate.convertExtraTimePercentageToDecimal();

      // when / then
      expect(certificationCandidate.extraTimePercentage).to.equal(0.2);
    });
  });

  describe('#addSubscription', function () {
    describe('when there is no subscription yet', function () {
      describe('when adding a CORE subscription', function () {
        it('should add CORE', function () {
          // given
          const coreSubscription = Subscription.buildCore({ id: 1 });
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            subscriptions: [],
            complementaryCertification: null,
          });

          // when
          certificationCandidate.addSubscription(coreSubscription);

          // when / then
          expect(certificationCandidate.subscriptions).to.deep.equal([coreSubscription]);
        });
      });

      describe('when adding a complementary subscription', function () {
        it('should add a complementary', function () {
          // given
          const complementarySubscription = Subscription.buildComplementary({ complementaryCertificationId: 99 });
          const certificationCandidate = domainBuilder.buildCertificationCandidate({
            subscriptions: [],
            complementaryCertification: null,
          });

          // when
          certificationCandidate.addSubscription(complementarySubscription);

          // when / then
          expect(certificationCandidate.subscriptions).to.deep.equal([complementarySubscription]);
        });
      });
    });

    describe('when there already is a subscription', function () {
      describe('when the subscription is CORE', function () {
        describe('when adding a CORE subscription', function () {
          it('should replace the CORE', function () {
            // given
            const coreSubscription = Subscription.buildCore({ id: 1 });
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              subscriptions: [Subscription.buildCore({ id: 22 })],
              complementaryCertification: null,
            });

            // when
            certificationCandidate.addSubscription(coreSubscription);

            // when / then
            expect(certificationCandidate.subscriptions).to.deep.equal([coreSubscription]);
          });
        });

        describe('when adding a complementary subscription', function () {
          it('should add a complementary', function () {
            // given
            const complementarySubscription = Subscription.buildComplementary({ complementaryCertificationId: 99 });
            const coreSubscription = Subscription.buildCore({ id: 22 });
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              subscriptions: [coreSubscription],
              complementaryCertification: null,
            });

            // when
            certificationCandidate.addSubscription(complementarySubscription);

            // when / then
            expect(certificationCandidate.subscriptions).to.deep.equal([coreSubscription, complementarySubscription]);
          });
        });
      });

      describe('when the subscription is complementary', function () {
        describe('when adding a CORE subscription', function () {
          it('should add the core', function () {
            // given
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              subscriptions: [],
              complementaryCertification: { id: 99 },
            });
            const coreSubscription = Subscription.buildCore({ certificationCandidate: certificationCandidate.id });

            // when
            certificationCandidate.addSubscription(coreSubscription);

            // then
            expect(certificationCandidate.subscriptions).to.deep.equal([
              Subscription.buildComplementary({
                certificationCandidateId: certificationCandidate.id,
                complementaryCertificationId: 99,
              }),
              coreSubscription,
            ]);
          });
        });

        describe('when adding a complementary subscription', function () {
          it('should replace the complementary', function () {
            // given
            const complementarySubscription = Subscription.buildComplementary({ complementaryCertificationId: 99 });
            const certificationCandidate = domainBuilder.buildCertificationCandidate({
              subscriptions: [],
              complementaryCertification: { id: 99 },
            });

            // when
            certificationCandidate.addSubscription(complementarySubscription);

            // when / then
            expect(certificationCandidate.subscriptions).to.deep.equal([
              Subscription.buildComplementary({ complementaryCertificationId: 99 }),
            ]);
          });
        });
      });
    });
  });
});
