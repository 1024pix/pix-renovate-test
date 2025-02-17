import * as events from '../../../../../lib/domain/events/index.js';
import { usecases } from '../../../../../lib/domain/usecases/index.js';
import { DomainTransaction } from '../../../../../lib/infrastructure/DomainTransaction.js';
import { usecases as certificationUsecases } from '../../../../../src/certification/session-management/domain/usecases/index.js';
import { usecases as devcompUsecases } from '../../../../../src/devcomp/domain/usecases/index.js';
import { usecases as questUsecases } from '../../../../../src/quest/domain/usecases/index.js';
import { assessmentController } from '../../../../../src/shared/application/assessments/assessment-controller.js';
import { config } from '../../../../../src/shared/config.js';
import { domainBuilder, expect, hFake, sinon } from '../../../../test-helper.js';

describe('Unit | Controller | assessment-controller', function () {
  describe('#createAssessmentPreviewForPix1d', function () {
    it('should call the expected usecase', async function () {
      const assessmentSerializer = { serialize: sinon.stub() };
      const createdAssessment = Symbol('created-assessment');
      assessmentSerializer.serialize.withArgs(createdAssessment).resolves(Symbol('serialized-assessment'));
      sinon.stub(usecases, 'createPreviewAssessment').resolves(createdAssessment);

      const result = await assessmentController.createAssessmentPreviewForPix1d({}, hFake, {
        assessmentSerializer,
      });

      expect(result.statusCode).to.be.equal(201);
      expect(assessmentSerializer.serialize).to.have.been.calledWithExactly(createdAssessment);
    });
  });

  describe('#get', function () {
    const authenticatedUserId = '12';
    const locale = 'fr';
    const assessmentId = 104974;

    const assessment = { id: assessmentId, title: 'Ordinary Wizarding Level assessment' };
    let assessmentSerializerStub;

    beforeEach(function () {
      sinon.stub(usecases, 'getAssessment').withArgs({ assessmentId, locale }).resolves(assessment);
      assessmentSerializerStub = { serialize: sinon.stub() };
      assessmentSerializerStub.serialize.resolvesArg(0);
    });

    it('should call the expected usecase', async function () {
      // given
      const request = {
        auth: {
          credentials: {
            userId: authenticatedUserId,
          },
        },
        params: {
          id: assessmentId,
        },
        headers: { 'accept-language': locale },
      };

      // when
      const result = await assessmentController.get(request, hFake, { assessmentSerializer: assessmentSerializerStub });

      // then
      expect(result).to.be.equal(assessment);
    });
  });

  describe('#completeAssessment', function () {
    let assessmentId, assessment, locale;

    beforeEach(function () {
      assessmentId = 2;
      assessment = Symbol('completed-assessment');
      locale = 'fr-fr';
      sinon.stub(DomainTransaction, 'execute').callsFake((lambda) => {
        return lambda();
      });

      sinon.stub(usecases, 'completeAssessment');
      sinon.stub(usecases, 'handleBadgeAcquisition');
      sinon.stub(devcompUsecases, 'handleTrainingRecommendation');
      sinon.stub(usecases, 'handleStageAcquisition');
      sinon.stub(questUsecases, 'rewardUser');
      usecases.completeAssessment.resolves(assessment);
      usecases.handleBadgeAcquisition.resolves();
      sinon.stub(events.eventDispatcher, 'dispatch');
    });

    it('should call the completeAssessment use case', async function () {
      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(usecases.completeAssessment).to.have.been.calledWithExactly({ assessmentId, locale });
    });

    it('should call the handleBadgeAcquisition use case', async function () {
      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(usecases.handleBadgeAcquisition).to.have.been.calledWithExactly({ assessment });
    });

    it('should call the handleTrainingRecommendation use case', async function () {
      // given
      const locale = 'fr-fr';

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(devcompUsecases.handleTrainingRecommendation).to.have.been.calledWithExactly({
        assessment,
        locale,
      });
    });

    it('should not call the rewardUser usecase if the questEnabled flag is false', async function () {
      // given
      config.featureToggles.isQuestEnabled = false;
      usecases.completeAssessment.resolves({ userId: 12 });

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(questUsecases.rewardUser).to.have.not.been.called;
    });

    it('should call the rewardUser use case if there is a userId', async function () {
      // given
      config.featureToggles.isQuestEnabled = true;
      usecases.completeAssessment.resolves({ userId: 12 });

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(questUsecases.rewardUser).to.have.been.calledWithExactly({
        userId: 12,
      });
    });

    it('should not call the rewardUser use case if there is no userId', async function () {
      // given
      usecases.completeAssessment.resolves({ userId: null });

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });

      // then
      expect(questUsecases.rewardUser).to.be.not.called;
    });
  });

  describe('#findCompetenceEvaluations', function () {
    it('should return the competence evaluations', async function () {
      // given
      const userId = 123;
      const assessmentId = 456;
      const competenceEvaluation1 = domainBuilder.buildCompetenceEvaluation({ assessmentId, userId });
      const competenceEvaluation2 = domainBuilder.buildCompetenceEvaluation({ assessmentId, userId });
      sinon
        .stub(usecases, 'findCompetenceEvaluationsByAssessment')
        .withArgs({ assessmentId, userId })
        .resolves([competenceEvaluation1, competenceEvaluation2]);
      const request = {
        auth: { credentials: { userId } },
        params: {
          id: assessmentId,
        },
      };

      // when
      const result = await assessmentController.findCompetenceEvaluations(request, hFake);

      // then
      expect(result.data).to.be.deep.equal([
        {
          type: 'competence-evaluations',
          id: competenceEvaluation1.id.toString(),
          attributes: {
            'competence-id': competenceEvaluation1.competenceId,
            'user-id': competenceEvaluation1.userId,
            'created-at': competenceEvaluation1.createdAt,
            'updated-at': competenceEvaluation1.updatedAt,
            status: competenceEvaluation1.status,
          },
          relationships: {
            assessment: {
              data: {
                id: assessmentId.toString(),
                type: 'assessments',
              },
            },
            scorecard: {
              links: {
                related: `/api/scorecards/${userId}_${competenceEvaluation1.competenceId}`,
              },
            },
          },
        },
        {
          type: 'competence-evaluations',
          id: competenceEvaluation2.id.toString(),
          attributes: {
            'competence-id': competenceEvaluation2.competenceId,
            'user-id': competenceEvaluation2.userId,
            'created-at': competenceEvaluation2.createdAt,
            'updated-at': competenceEvaluation2.updatedAt,
            status: competenceEvaluation2.status,
          },
          relationships: {
            assessment: {
              data: {
                id: assessmentId.toString(),
                type: 'assessments',
              },
            },
            scorecard: {
              links: {
                related: `/api/scorecards/${userId}_${competenceEvaluation2.competenceId}`,
              },
            },
          },
        },
      ]);
    });
  });

  describe('#createCertificationChallengeLiveAlert', function () {
    it('should call the createCertificationChallengeLiveAlert use case', async function () {
      // given
      const assessmentId = 2;
      const challengeId = '123';
      sinon.stub(certificationUsecases, 'createCertificationChallengeLiveAlert');
      certificationUsecases.createCertificationChallengeLiveAlert.resolves();
      const payload = { data: { attributes: { 'challenge-id': challengeId } } };
      const request = { params: { id: assessmentId }, payload };

      // when
      const response = await assessmentController.createCertificationChallengeLiveAlert(request, hFake);

      // then
      expect(response.statusCode).to.be.equal(204);
      expect(certificationUsecases.createCertificationChallengeLiveAlert).to.have.been.calledWithExactly({
        assessmentId,
        challengeId,
      });
    });
  });
});
