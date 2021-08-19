const { expect, sinon, domainBuilder, catchErr } = require('../../../test-helper');
const improveCompetenceEvaluation = require('../../../../lib/domain/usecases/improve-competence-evaluation');
const Assessment = require('../../../../lib/domain/models/Assessment');
const { MAX_REACHABLE_LEVEL } = require('../../../../lib/domain/constants');
const { ImproveCompetenceEvaluationForbiddenError } = require('../../../../lib/domain/errors');

describe('Unit | UseCase | Improve Competence Evaluation', function() {
  let competenceEvaluation, userId, competenceEvaluationRepository, assessmentRepository;
  let getCompetenceLevel;
  let competenceId;
  let expectedAssessment;
  let createdAssessment;
  const assessmentId = 'created-assessment-id';
  const domainTransaction = Symbol('DomainTransaction');

  beforeEach(function() {
    const currentAssessment = new Assessment({
      state: 'completed',
      userId,
      competenceId,
      isImproving: false,
      courseId: '[NOT USED] CompetenceId is in Competence Evaluation.',
      type: 'COMPETENCE_EVALUATION',
    });

    competenceEvaluation = domainBuilder.buildCompetenceEvaluation({ assessment: currentAssessment });
    userId = 'validUserId';
    competenceId = 'recCompetence';
    expectedAssessment = new Assessment({
      state: 'started',
      userId,
      competenceId,
      isImproving: true,
      courseId: '[NOT USED] CompetenceId is in Competence Evaluation.',
      type: 'COMPETENCE_EVALUATION',
    });
    createdAssessment = { ...expectedAssessment, id: assessmentId };

    competenceEvaluationRepository = {
      getByCompetenceIdAndUserId: sinon.stub().resolves(competenceEvaluation),
      updateAssessmentId: sinon.stub().resolves({ ...competenceEvaluation, assessmentId }),
    };
    assessmentRepository = { save: sinon.stub().resolves(createdAssessment) };
    getCompetenceLevel = sinon.stub().resolves(3);
  });

  it('should retrieve competence evaluation from id', async function() {
    // when
    await improveCompetenceEvaluation({
      assessmentRepository,
      competenceEvaluationRepository,
      getCompetenceLevel,
      userId,
      competenceId,
      domainTransaction,
    });

    // then
    expect(competenceEvaluationRepository.getByCompetenceIdAndUserId).to.be.calledWith({
      competenceId,
      userId,
      domainTransaction,
    });
  });

  it('should create an improving assessment', async function() {
    // when
    await improveCompetenceEvaluation({ assessmentRepository, competenceEvaluationRepository, getCompetenceLevel, userId, competenceId, domainTransaction });

    // then
    expect(assessmentRepository.save).to.be.calledWith({ assessment: expectedAssessment, domainTransaction });
  });

  it('should update competence evaluation with newly created assessment', async function() {
    // when
    await improveCompetenceEvaluation({ assessmentRepository, competenceEvaluationRepository, getCompetenceLevel, userId, competenceId, domainTransaction });

    // then
    expect(competenceEvaluationRepository.updateAssessmentId).to.be.calledWith({
      currentAssessmentId: competenceEvaluation.assessmentId,
      newAssessmentId: assessmentId,
      domainTransaction,
    });
  });

  it('should return competence evaluation with newly created assessment', async function() {
    // given
    const expectedCompetenceEvaluation = competenceEvaluation;
    expectedCompetenceEvaluation.assessmentId = createdAssessment.id;

    // when
    const result = await improveCompetenceEvaluation({ assessmentRepository, competenceEvaluationRepository, getCompetenceLevel, userId, competenceId, domainTransaction });

    // then
    expect(result).to.deep.equal(expectedCompetenceEvaluation);
  });

  context('when user has reached maximum level for given competence', function() {
    beforeEach(function() {
      getCompetenceLevel.resolves(MAX_REACHABLE_LEVEL);
    });

    it('should throw a Forbidden error', async function() {
      // when
      const error = await catchErr(improveCompetenceEvaluation)({
        assessmentRepository,
        competenceEvaluationRepository,
        getCompetenceLevel,
        userId,
        competenceId,
        domainTransaction,
      });

      // then
      expect(error).to.be.instanceOf(ImproveCompetenceEvaluationForbiddenError);
    });
  });

  context('when user has already started the improvement of the competence', function() {
    beforeEach(function() {
      const currentAssessment = new Assessment({
        state: 'started',
        userId,
        competenceId,
        isImproving: true,
        courseId: '[NOT USED] CompetenceId is in Competence Evaluation.',
        type: 'COMPETENCE_EVALUATION',
      });

      competenceEvaluation = domainBuilder.buildCompetenceEvaluation({ assessment: currentAssessment });
      competenceEvaluationRepository.getByCompetenceIdAndUserId.resolves(competenceEvaluation);
    });

    it('should not modify data and return the current competence evaluation', async function() {
      // given
      const expectedCompetenceEvaluation = { ...competenceEvaluation };

      // when
      const result = await improveCompetenceEvaluation({ assessmentRepository, competenceEvaluationRepository, getCompetenceLevel, userId, competenceId, domainTransaction });

      // then
      expect(assessmentRepository.save).to.be.not.called;
      expect(competenceEvaluationRepository.updateAssessmentId).to.be.not.called;

      expect(result).to.deep.equal(expectedCompetenceEvaluation);
    });
  });

});
