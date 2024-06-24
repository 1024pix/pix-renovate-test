import _ from 'lodash';

import {
  CertificationCandidateMultipleUserLinksWithinSessionError,
  NotFoundError,
} from '../../../../../../lib/domain/errors.js';
import * as certificationCandidateRepository from '../../../../../../src/certification/enrolment/infrastructure/repositories/certification-candidate-repository.js';
import { ComplementaryCertification } from '../../../../../../src/certification/session-management/domain/models/ComplementaryCertification.js';
import { ComplementaryCertificationKeys } from '../../../../../../src/certification/shared/domain/models/ComplementaryCertificationKeys.js';
import { SubscriptionTypes } from '../../../../../../src/certification/shared/domain/models/SubscriptionTypes.js';
import { catchErr, databaseBuilder, domainBuilder, expect, knex } from '../../../../../test-helper.js';

describe('Integration | Repository | CertificationCandidate', function () {
  let sessionId;
  let candidateData;
  let candidateSavedData;
  let coreSubscription;

  beforeEach(async function () {
    sessionId = databaseBuilder.factory.buildSession().id;
    candidateData = {
      firstName: 'Lena',
      lastName: 'Rine',
      sex: 'F',
      birthPostalCode: '75000',
      birthINSEECode: '75001',
      birthCity: 'HaussmanPolis',
      externalId: 'ABCDEF123',
      birthdate: '1990-07-12',
      extraTimePercentage: 0.05,
      sessionId,
      birthProvinceCode: '66',
      birthCountry: 'France',
      email: 'lena.rine@example.net',
      resultRecipientEmail: 'lara.pafromage@example.com',
      userId: null,
      organizationLearnerId: null,
    };

    candidateSavedData = {
      ...candidateData,
      extraTimePercentage: '0.05',
      authorizedToStart: false,
      billingMode: null,
      prepaymentCode: null,
    };

    coreSubscription = {
      type: SubscriptionTypes.CORE,
      complementaryCertificationId: null,
    };

    await databaseBuilder.commit();
  });

  describe('#saveInSession', function () {
    context('when a proper candidate is being saved', function () {
      it('should save the Certification candidate in session', async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate.notPersisted({
          ...candidateData,
          subscriptions: [domainBuilder.buildCoreSubscription()],
        });

        // when
        const certificationCandidateId = await certificationCandidateRepository.saveInSession({
          certificationCandidate,
          sessionId,
        });

        // then
        const addedCertificationCandidate = await knex('certification-candidates').where({ sessionId }).first();
        expect(addedCertificationCandidate).to.contains(candidateSavedData);

        const subscriptions = await knex('certification-subscriptions')
          .select('type', 'complementaryCertificationId')
          .where({
            certificationCandidateId,
          });

        expect(subscriptions).to.have.deep.members([coreSubscription]);
      });

      context('when adding a new candidate', function () {
        it('should add a single row in the table', async function () {
          // given
          const certificationCandidate = domainBuilder.buildCertificationCandidate.notPersisted({
            ...candidateData,
            subscriptions: [domainBuilder.buildCoreSubscription()],
          });

          const numberOfCertificationCandidatesBeforeSave = await knex('certification-candidates');
          expect(numberOfCertificationCandidatesBeforeSave).to.have.length(0);

          // when
          await certificationCandidateRepository.saveInSession({
            certificationCandidate,
            sessionId,
          });

          // then
          const numberOfCertificationCandidatesAfterSave = await knex('certification-candidates');
          expect(numberOfCertificationCandidatesAfterSave).to.have.length(1);
        });
      });

      context('when there is complementary certifications to save', function () {
        afterEach(function () {
          return knex('certification-subscriptions').del();
        });

        it('should save the complementary certification subscription', async function () {
          // given
          const complementaryCertificationId = databaseBuilder.factory.buildComplementaryCertification().id;
          await databaseBuilder.commit();

          const certificationCandidate = domainBuilder.buildCertificationCandidate.notPersisted({
            sessionId,
            complementaryCertification:
              domainBuilder.certification.sessionManagement.buildCertificationSessionComplementaryCertification({
                id: complementaryCertificationId,
              }),
            subscriptions: [domainBuilder.buildCoreSubscription()],
          });

          // when
          const savedCertificationCandidateId = await certificationCandidateRepository.saveInSession({
            certificationCandidate,
            sessionId,
          });

          // then
          const subscriptions = await knex('certification-subscriptions')
            .select('type', 'complementaryCertificationId')
            .where({
              certificationCandidateId: savedCertificationCandidateId,
            });

          expect(subscriptions).to.have.deep.members([
            coreSubscription,
            {
              type: SubscriptionTypes.COMPLEMENTARY,
              complementaryCertificationId: complementaryCertificationId,
            },
          ]);
        });
      });
    });
  });

  describe('linkToUser', function () {
    let certificationCandidate;
    let userId;

    beforeEach(function () {
      // given
      certificationCandidate = databaseBuilder.factory.buildCertificationCandidate({ userId: null });
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidate.id });
      userId = databaseBuilder.factory.buildUser().id;

      return databaseBuilder.commit();
    });

    context('when the user is not linked to any candidate in the same session', function () {
      it('should successfully link the candidate to the user', async function () {
        // when
        await certificationCandidateRepository.linkToUser({ id: certificationCandidate.id, userId });

        // then
        const linkedCertificationCandidate = await knex('certification-candidates')
          .where({ id: certificationCandidate.id })
          .select('userId');
        expect(linkedCertificationCandidate[0].userId).to.equal(userId);
      });
    });

    context('when the user is already linked to a candidate in the same session', function () {
      beforeEach(function () {
        const candidate = databaseBuilder.factory.buildCertificationCandidate({
          userId,
          sessionId: certificationCandidate.sessionId,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
        return databaseBuilder.commit();
      });

      it('should throw a CertificationCandidateMultipleUserLinksWithinSessionError', async function () {
        // when
        const result = await catchErr(certificationCandidateRepository.linkToUser)({
          id: certificationCandidate.id,
          userId,
        });

        // then
        expect(result).to.be.instanceOf(CertificationCandidateMultipleUserLinksWithinSessionError);
      });
    });
  });

  describe('#remove', function () {
    context('when the record to delete is in the table', function () {
      let certificationCandidateToDeleteId;

      beforeEach(function () {
        // given
        certificationCandidateToDeleteId = databaseBuilder.factory.buildCertificationCandidate().id;
        databaseBuilder.factory.buildCoreSubscription({
          certificationCandidateId: certificationCandidateToDeleteId.id,
        });
        _.times(5, () => {
          const candidate = databaseBuilder.factory.buildCertificationCandidate();
          databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
        });
        return databaseBuilder.commit();
      });

      it('should return true when deletion goes well', async function () {
        // when
        const isDeleted = await certificationCandidateRepository.remove({ id: certificationCandidateToDeleteId });

        // then
        expect(isDeleted).to.be.true;
      });

      it('should delete a single row in the table', async function () {
        const { count: numberOfCertificationCandidatesBeforeDeletion } = await knex('certification-candidates')
          .count('*')
          .first();

        // when
        await certificationCandidateRepository.remove({ id: certificationCandidateToDeleteId });
        const { count: numberOfCertificationCandidatesAfterDeletion } = await knex('certification-candidates')
          .count('*')
          .first();

        // then
        expect(numberOfCertificationCandidatesAfterDeletion).to.equal(
          numberOfCertificationCandidatesBeforeDeletion - 1,
        );
      });
    });

    context('when the candidate has complementary certification subscriptions', function () {
      it('should delete both candidate and subscription', async function () {
        // given
        const certificationCandidateId = databaseBuilder.factory.buildCertificationCandidate().id;
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId });
        const complementaryCertification = databaseBuilder.factory.buildComplementaryCertification();
        databaseBuilder.factory.buildComplementaryCertificationSubscription({
          complementaryCertificationId: complementaryCertification.id,
          certificationCandidateId,
        });
        await databaseBuilder.commit();

        // when
        const isDeleted = await certificationCandidateRepository.remove({ id: certificationCandidateId });

        // then
        const complementaryCertificationSubscriptions = await knex.select().from('certification-subscriptions').first();
        expect(complementaryCertificationSubscriptions).to.be.undefined;
        expect(isDeleted).to.be.true;
      });
    });
  });

  describe('#isNotLinked', function () {
    context('when the candidate is linked', function () {
      let certificationCandidateId;

      beforeEach(function () {
        // given
        certificationCandidateId = databaseBuilder.factory.buildCertificationCandidate().id;
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId });
        return databaseBuilder.commit();
      });

      it('should return false', async function () {
        // when
        const isNotLinked = await certificationCandidateRepository.isNotLinked({ id: certificationCandidateId });

        // then
        expect(isNotLinked).to.be.false;
      });
    });

    context('when the candidate is not linked', function () {
      let certificationCandidateToDeleteId;

      beforeEach(function () {
        // given
        certificationCandidateToDeleteId = databaseBuilder.factory.buildCertificationCandidate({ userId: null }).id;
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidateToDeleteId });
        return databaseBuilder.commit();
      });

      it('should return true', async function () {
        // when
        const isNotLinked = await certificationCandidateRepository.isNotLinked({
          id: certificationCandidateToDeleteId,
        });

        // then
        expect(isNotLinked).to.be.true;
      });
    });
  });

  describe('#findBySessionId', function () {
    beforeEach(async function () {
      // given
      const anotherSessionId = databaseBuilder.factory.buildSession().id;
      _.each(
        [
          { lastName: 'Rine', firstName: 'Lena', sessionId },
          { lastName: 'Pafromage', firstName: 'Lara', sessionId },
          { lastName: 'Mate', firstName: 'Otto', sessionId },
          { lastName: 'Attrak', firstName: 'Pat', sessionId: anotherSessionId },
          { lastName: 'Registre', firstName: 'Jean', sessionId: anotherSessionId },
          { lastName: 'Damant', firstName: 'Evy', sessionId },
        ],
        (candidate) => {
          const aCandidate = databaseBuilder.factory.buildCertificationCandidate(candidate);
          databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: aCandidate.id });
        },
      );

      await databaseBuilder.commit();
    });

    context('when there are some certification candidates with the given session id', function () {
      it('should fetch, alphabetically sorted, the certification candidates with a specific session ID', async function () {
        // when
        const actualCandidates = await certificationCandidateRepository.findBySessionId(sessionId);

        // then
        expect(actualCandidates[0].firstName).to.equal('Evy');
        expect(actualCandidates[1].firstName).to.equal('Otto');
        expect(actualCandidates[2].firstName).to.equal('Lara');
        expect(actualCandidates[3].firstName).to.equal('Lena');
        expect(actualCandidates).to.have.lengthOf(4);
      });
    });

    context('when some returned candidates have complementary certification subscription', function () {
      it('return ordered candidates with associated subscription', async function () {
        // given
        const sessionId = databaseBuilder.factory.buildSession().id;
        const rockCertification = databaseBuilder.factory.buildComplementaryCertification({
          label: 'Pix+Rock',
          key: ComplementaryCertificationKeys.CLEA,
        });
        const ottoMate = databaseBuilder.factory.buildCertificationCandidate({
          lastName: 'Mate',
          firstName: 'Otto',
          sessionId,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: ottoMate.id });
        const patAttrak = databaseBuilder.factory.buildCertificationCandidate({
          lastName: 'Attrak',
          firstName: 'Pat',
          sessionId,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: patAttrak.id });
        const evyDamant = databaseBuilder.factory.buildCertificationCandidate({
          lastName: 'Damant',
          firstName: 'Evy',
          sessionId,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: evyDamant.id });

        databaseBuilder.factory.buildComplementaryCertificationSubscription({
          complementaryCertificationId: rockCertification.id,
          certificationCandidateId: ottoMate.id,
        });
        databaseBuilder.factory.buildComplementaryCertificationSubscription({
          complementaryCertificationId: rockCertification.id,
          certificationCandidateId: patAttrak.id,
        });

        await databaseBuilder.commit();

        // when
        const candidates = await certificationCandidateRepository.findBySessionId(sessionId);

        // then
        expect(candidates).to.have.lengthOf(3);
        const firstCandidate = candidates[0];
        const secondCandidate = candidates[1];
        const thirdCandidate = candidates[2];

        expect(firstCandidate.firstName).to.equal('Pat');
        expect(firstCandidate.lastName).to.equal('Attrak');
        expect(firstCandidate.complementaryCertification).to.deepEqualInstance(
          new ComplementaryCertification({
            id: rockCertification.id,
            label: 'Pix+Rock',
            key: ComplementaryCertificationKeys.CLEA,
          }),
        );

        expect(secondCandidate.firstName).to.equal('Evy');
        expect(secondCandidate.lastName).to.equal('Damant');
        expect(secondCandidate.complementaryCertification).to.equal(null);

        expect(thirdCandidate.firstName).to.equal('Otto');
        expect(thirdCandidate.lastName).to.equal('Mate');
        expect(thirdCandidate.complementaryCertification).to.deepEqualInstance(
          new ComplementaryCertification({
            id: rockCertification.id,
            label: 'Pix+Rock',
            key: ComplementaryCertificationKeys.CLEA,
          }),
        );
      });
    });

    context('when there is no certification candidates with the given session ID', function () {
      it('should return an empty array', async function () {
        // when
        const actualCandidates = await certificationCandidateRepository.findBySessionId(-1);

        // then
        expect(actualCandidates).to.deep.equal([]);
      });
    });
  });

  describe('#findBySessionIdAndPersonalInfo', function () {
    context('when there is one certification candidate with the given info in the session', function () {
      it('should fetch the candidate ignoring case', async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate({
          ...candidateData,
          subscriptions: [domainBuilder.buildCoreSubscription()],
        });
        const candidate = databaseBuilder.factory.buildCertificationCandidate(certificationCandidate);
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
        await databaseBuilder.commit();
        const personalInfoAndId = {
          lastName: candidateData.lastName,
          firstName: candidateData.firstName,
          birthdate: candidateData.birthdate,
          sessionId,
        };

        // when
        const actualCandidates =
          await certificationCandidateRepository.findBySessionIdAndPersonalInfo(personalInfoAndId);

        // then
        expect(actualCandidates).to.have.lengthOf(1);
        expect(actualCandidates[0]).to.deep.equal(certificationCandidate);
      });

      it('should fetch the candidate ignoring special characters, non canonical characters and zero-width spaces', async function () {
        // given
        const certificationCandidate = domainBuilder.buildCertificationCandidate({
          ...candidateData,
          subscriptions: [domainBuilder.buildCoreSubscription()],
        });
        const candidate = databaseBuilder.factory.buildCertificationCandidate(certificationCandidate);
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
        await databaseBuilder.commit();
        const zeroWidthSpaceChar = '​';
        const personalInfoAndId = {
          lastName: 'Rïn é',
          firstName: `l' e-n${zeroWidthSpaceChar}a`,
          birthdate: candidateData.birthdate,
          sessionId,
        };

        // when
        const actualCandidates =
          await certificationCandidateRepository.findBySessionIdAndPersonalInfo(personalInfoAndId);

        // then
        expect(actualCandidates).to.have.lengthOf(1);
        expect(actualCandidates[0]).to.deep.equal(certificationCandidate);
      });
    });

    context('when there is no certification candidates with the given info in the session', function () {
      let onlyCandidateInBDD;
      let notMatchingCandidateInfo;

      beforeEach(function () {
        onlyCandidateInBDD = {
          lastName: candidateData.lastName,
          firstName: candidateData.firstName,
          birthdate: candidateData.birthdate,
          sessionId,
        };
        const candidate = databaseBuilder.factory.buildCertificationCandidate(onlyCandidateInBDD);
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });

        notMatchingCandidateInfo = {
          lastName: 'Jean',
          firstName: 'Michel',
          birthdate: '2018-01-01',
          sessionId,
        };

        return databaseBuilder.commit();
      });

      it('should not find any candidate', async function () {
        // when
        const actualCandidates =
          await certificationCandidateRepository.findBySessionIdAndPersonalInfo(notMatchingCandidateInfo);

        // then
        expect(actualCandidates).to.be.empty;
      });
    });

    context('when there are more than one certification candidate with the given info in the session', function () {
      it('should find two candidates', async function () {
        //given
        const commonCandidateInfo = {
          lastName: candidateData.lastName,
          firstName: candidateData.firstName,
          birthdate: candidateData.birthdate,
          sessionId,
        };

        databaseBuilder.factory.buildOrganizationLearner({ id: 666 });
        databaseBuilder.factory.buildOrganizationLearner({ id: 777 });

        const certificationCandidates1 = databaseBuilder.factory.buildCertificationCandidate({
          ...commonCandidateInfo,
          organizationLearnerId: 777,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidates1.id });
        const certificationCandidates2 = databaseBuilder.factory.buildCertificationCandidate({
          ...commonCandidateInfo,
          organizationLearnerId: 666,
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidates2.id });

        await databaseBuilder.commit();

        // when
        const actualCandidates =
          await certificationCandidateRepository.findBySessionIdAndPersonalInfo(commonCandidateInfo);

        // then
        expect(actualCandidates).to.have.lengthOf(2);
        expect(actualCandidates[0].lastName).to.equal(commonCandidateInfo.lastName);
        expect(actualCandidates[1].lastName).to.equal(commonCandidateInfo.lastName);
        expect([actualCandidates[0].organizationLearnerId, actualCandidates[1].organizationLearnerId]).to.have.members([
          certificationCandidates1.organizationLearnerId,
          certificationCandidates2.organizationLearnerId,
        ]);
        expect(actualCandidates[0].id).to.not.equal(actualCandidates[1].id);
      });
    });
  });

  describe('#getBySessionIdAndUserId', function () {
    let userId;
    let complementaryCertificationId;

    beforeEach(function () {
      // given
      userId = databaseBuilder.factory.buildUser().id;
      complementaryCertificationId = databaseBuilder.factory.buildComplementaryCertification().id;
      const certificationCandidateId = databaseBuilder.factory.buildCertificationCandidate({ sessionId, userId }).id;
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId });
      databaseBuilder.factory.buildComplementaryCertificationSubscription({
        complementaryCertificationId,
        certificationCandidateId,
      });

      return databaseBuilder.commit();
    });

    context('when there is one certification candidate with the given session id and user id', function () {
      it('should fetch the candidate', async function () {
        // when
        const actualCandidates = await certificationCandidateRepository.getBySessionIdAndUserId({ sessionId, userId });

        // then
        expect(actualCandidates.sessionId).to.equal(sessionId);
        expect(actualCandidates.userId).to.equal(userId);
        expect(actualCandidates.complementaryCertification).not.to.be.null;
        expect(actualCandidates.complementaryCertification.id).to.equal(complementaryCertificationId);
      });
    });

    context('when there is no certification candidate with the given session id', function () {
      it('should return undefined', async function () {
        // when
        const result = await certificationCandidateRepository.getBySessionIdAndUserId({
          sessionId: sessionId + 1,
          userId: userId,
        });

        // then
        expect(result).to.be.undefined;
      });
    });

    context('when there is no certification candidate with the given user id', function () {
      it('should return undefined', async function () {
        // when
        const result = await certificationCandidateRepository.getBySessionIdAndUserId({
          sessionId: sessionId,
          userId: userId + 1,
        });

        // then
        expect(result).to.be.undefined;
      });
    });
  });

  describe('#findOneBySessionIdAndUserId', function () {
    let userId;

    beforeEach(function () {
      // given
      userId = databaseBuilder.factory.buildUser().id;
      const candidate = databaseBuilder.factory.buildCertificationCandidate({ sessionId: sessionId, userId: userId });
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
      return databaseBuilder.commit();
    });

    context('when there is one certification candidate with the given session id and user id', function () {
      it('should fetch the candidate', async function () {
        // when
        const actualCandidates = await certificationCandidateRepository.findOneBySessionIdAndUserId({
          sessionId,
          userId,
        });

        // then
        expect(actualCandidates.sessionId).to.equal(sessionId);
        expect(actualCandidates.userId).to.equal(userId);
      });
    });

    context('when there is no certification candidate with the given session id and user id', function () {
      it('should not find any candidate', async function () {
        // when
        const actualCandidates = await certificationCandidateRepository.findOneBySessionIdAndUserId({
          sessionId: sessionId + 1,
          userId: userId + 1,
        });

        // then
        expect(actualCandidates).to.be.undefined;
      });
    });
  });

  describe('#doesLinkedCertificationCandidateInSessionExist', function () {
    let sessionId;

    beforeEach(function () {
      sessionId = databaseBuilder.factory.buildSession().id;
      return databaseBuilder.commit();
    });

    context('when there are candidates in the session that are already linked to a user', function () {
      beforeEach(function () {
        // given
        const userId = databaseBuilder.factory.buildUser().id;
        const candidateA = databaseBuilder.factory.buildCertificationCandidate({ sessionId, userId });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidateA.id });
        const candidateB = databaseBuilder.factory.buildCertificationCandidate({ sessionId, userId: null });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidateB.id });
        return databaseBuilder.commit();
      });

      it('should return true', async function () {
        // when
        const linkedCandidateExists =
          await certificationCandidateRepository.doesLinkedCertificationCandidateInSessionExist({ sessionId });

        // then
        expect(linkedCandidateExists).to.be.true;
      });
    });

    context('when there are no candidate in the session that are linked to any user', function () {
      beforeEach(function () {
        // given
        const candidateA = databaseBuilder.factory.buildCertificationCandidate({ sessionId, userId: null });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidateA.id });
        const candidateB = databaseBuilder.factory.buildCertificationCandidate({ sessionId, userId: null });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidateB.id });
        return databaseBuilder.commit();
      });

      it('should return false', async function () {
        // when
        const linkedCandidateExists =
          await certificationCandidateRepository.doesLinkedCertificationCandidateInSessionExist({ sessionId });

        // then
        expect(linkedCandidateExists).to.be.false;
      });
    });
  });

  describe('#update', function () {
    describe('when certification candidate exists', function () {
      it('should update authorizedToStart certification candidate attribute', async function () {
        // given
        const session = databaseBuilder.factory.buildSession();
        databaseBuilder.factory.buildUser({ id: 1234 });
        const certificationCandidate = databaseBuilder.factory.buildCertificationCandidate({
          sessionId: session.id,
          userId: 1234,
          authorizedToStart: true,
          birthdate: '2000-01-04',
          extraTimePercentage: '0.30',
          firstName: 'first-name',
          id: 456,
          lastName: 'last-name',
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidate.id });
        await databaseBuilder.commit();

        // when
        await certificationCandidateRepository.update(
          domainBuilder.buildCertificationCandidate({
            id: certificationCandidate.id,
            authorizedToStart: false,
            subscriptions: [domainBuilder.buildCoreSubscription()],
          }),
        );

        // then
        const updatedCertificationCandidate = await knex
          .select('authorizedToStart')
          .from('certification-candidates')
          .where({ id: certificationCandidate.id })
          .first();

        expect(updatedCertificationCandidate.authorizedToStart).to.be.false;
      });
    });

    describe('when certification candidate is not found', function () {
      it('should throw', async function () {
        // given
        const session = databaseBuilder.factory.buildSession({ id: 23049 });
        databaseBuilder.factory.buildUser({ id: 1234 });
        const candidate = databaseBuilder.factory.buildCertificationCandidate({
          sessionId: session.id,
          userId: 1234,
          authorizedToStart: false,
          birthdate: '2000-01-04',
          extraTimePercentage: '0.30',
          firstName: 'first-name',
          id: 456,
          lastName: 'last-name',
        });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });

        await databaseBuilder.commit();
        const wrongCandidateId = 1298;

        // when
        const error = await catchErr(certificationCandidateRepository.update)(
          domainBuilder.buildCertificationCandidate({
            id: wrongCandidateId,
            authorizedToStart: false,
            subscriptions: [domainBuilder.buildCoreSubscription()],
          }),
        );

        // then
        expect(error).to.be.an.instanceOf(NotFoundError);
      });
    });
  });

  describe('#deleteBySessionId', function () {
    it('should remove the certification candidates and their subscriptions by a session id', async function () {
      // given
      const complementaryCertificationId = databaseBuilder.factory.buildComplementaryCertification().id;
      const sessionId = databaseBuilder.factory.buildSession().id;
      const firstCandidateId = databaseBuilder.factory.buildCertificationCandidate({ sessionId }).id;
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: firstCandidateId });
      databaseBuilder.factory.buildComplementaryCertificationSubscription({
        complementaryCertificationId,
        certificationCandidateId: firstCandidateId,
      });

      const secondCandidateId = databaseBuilder.factory.buildCertificationCandidate({ sessionId }).id;
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: secondCandidateId });
      databaseBuilder.factory.buildComplementaryCertificationSubscription({
        complementaryCertificationId,
        certificationCandidateId: secondCandidateId,
      });

      const thirdCandidateId = databaseBuilder.factory.buildCertificationCandidate({ sessionId }).id;
      databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: thirdCandidateId });
      databaseBuilder.factory.buildComplementaryCertificationSubscription({
        complementaryCertificationId,
        certificationCandidateId: thirdCandidateId,
      });
      await databaseBuilder.commit();

      // when
      await certificationCandidateRepository.deleteBySessionId({ sessionId });

      // then
      const subscriptionsInDB = await knex('certification-subscriptions').select();
      const certificationCandidateInDB = await knex('certification-candidates').select();
      expect(subscriptionsInDB).to.deep.equal([]);
      expect(certificationCandidateInDB).to.deep.equal([]);
    });
  });

  describe('#getWithComplementaryCertification', function () {
    context('when certification candidate is not found', function () {
      it('should throw NotFound error', async function () {
        // given
        const candidate = databaseBuilder.factory.buildCertificationCandidate({ id: 1 });
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: candidate.id });
        const wrongCandidateId = 99;
        await databaseBuilder.commit();

        // when
        const error = await catchErr(certificationCandidateRepository.getWithComplementaryCertification)(
          wrongCandidateId,
        );

        // then
        expect(error).to.be.an.instanceOf(NotFoundError);
      });
    });

    context('when the candidate has no complementary certification subscription', function () {
      it('should return the candidate with empty complementary certification', async function () {
        // given
        const certificationCandidate = databaseBuilder.factory.buildCertificationCandidate();
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidate.id });
        await databaseBuilder.commit();

        // when
        const certificationCandidateWithComplementaryCertifications =
          await certificationCandidateRepository.getWithComplementaryCertification(certificationCandidate.id);

        // then
        expect(certificationCandidateWithComplementaryCertifications).to.deep.equal(
          domainBuilder.buildCertificationCandidate({
            ...certificationCandidate,
            complementaryCertification: null,
            subscriptions: [domainBuilder.buildCoreSubscription()],
          }),
        );
      });
    });

    context('when the candidate has complementary certification subscriptions', function () {
      it('should return the candidate with his complementary certification', async function () {
        // given
        const certificationCandidate = databaseBuilder.factory.buildCertificationCandidate();
        databaseBuilder.factory.buildCoreSubscription({ certificationCandidateId: certificationCandidate.id });
        const complementaryCertification = databaseBuilder.factory.buildComplementaryCertification({
          label: 'Complementary certification 2',
        });
        databaseBuilder.factory.buildComplementaryCertificationSubscription({
          complementaryCertificationId: complementaryCertification.id,
          certificationCandidateId: certificationCandidate.id,
        });
        await databaseBuilder.commit();

        // when
        const certificationCandidateWithComplementaryCertification =
          await certificationCandidateRepository.getWithComplementaryCertification(certificationCandidate.id);

        // then
        expect(certificationCandidateWithComplementaryCertification).to.deep.equal(
          domainBuilder.buildCertificationCandidate({
            ...certificationCandidate,
            subscriptions: [domainBuilder.buildCoreSubscription()],
            complementaryCertification:
              domainBuilder.certification.sessionManagement.buildCertificationSessionComplementaryCertification(
                complementaryCertification,
              ),
          }),
        );
      });
    });
  });
});
