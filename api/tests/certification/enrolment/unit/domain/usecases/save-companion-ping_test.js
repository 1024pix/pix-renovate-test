import { NotFoundError } from '../../../../../../lib/domain/errors.js';
import { CertificationCandidateCompanion } from '../../../../../../src/certification/enrolment/domain/models/CertificationCandidateCompanion.js';
import { saveCompanionPing } from '../../../../../../src/certification/enrolment/domain/usecases/save-companion-ping.js';
import { catchErr, expect, sinon } from '../../../../../test-helper.js';

describe('Unit | UseCase | save-companion-ping', function () {
  describe('#saveCompanionPing', function () {
    describe('when the user is in a running session', function () {
      it('should persist the companion ping in redis', async function () {
        // given
        const userId = 123;
        const certificationCandidateCompanion = new CertificationCandidateCompanion({
          sessionId: 99,
          id: 101,
        });
        const certificationCandidateRepository = { findCertificationCandidateCompanionInfoByUserId: sinon.stub() };
        const temporaryCompanionStorageService = { save: sinon.stub() };
        certificationCandidateRepository.findCertificationCandidateCompanionInfoByUserId
          .withArgs({ userId })
          .resolves(certificationCandidateCompanion);

        // when
        await saveCompanionPing({
          userId,
          certificationCandidateRepository,
          temporaryCompanionStorageService,
        });

        // then
        expect(temporaryCompanionStorageService.save).to.have.been.calledWithExactly(certificationCandidateCompanion);
      });
    });

    describe('when the user is not in a running session', function () {
      it('should throw a Not Found error', async function () {
        // given
        const userId = 123;

        // when
        const error = await catchErr(saveCompanionPing)({
          userId,
        });

        // then
        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal(`No candidate found for user id ${userId}`);
      });
    });
  });
});
