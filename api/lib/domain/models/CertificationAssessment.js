const Joi = require('joi').extend(require('@joi/date'));
const { validateEntity } = require('../validators/entity-validator');
const _ = require('lodash');
const { ChallengeToBeNeutralizedNotFoundError, ChallengeToBeDeneutralizedNotFoundError } = require('../errors');
const AnswerStatus = require('./AnswerStatus');
const NeutralizationAttempt = require('./NeutralizationAttempt');
const CertificationAnswerStatusChangeAttempt = require('./CertificationAnswerStatusChangeAttempt');

const states = {
  COMPLETED: 'completed',
  STARTED: 'started',
  ENDED_BY_SUPERVISOR: 'endedBySupervisor',
  ENDED_DUE_TO_FINALIZATION: 'endedDueToFinalization',
};

const certificationAssessmentSchema = Joi.object({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  certificationCourseId: Joi.number().integer().required(),
  createdAt: Joi.date().required(),
  completedAt: Joi.date().allow(null),
  state: Joi.string()
    .valid(states.COMPLETED, states.STARTED, states.ENDED_BY_SUPERVISOR, states.ENDED_DUE_TO_FINALIZATION)
    .required(),
  isV2Certification: Joi.boolean().required(),
  certificationChallenges: Joi.array().min(1).required(),
  certificationAnswersByDate: Joi.array().min(0).required(),
});

class CertificationAssessment {
  constructor({
    id,
    userId,
    certificationCourseId,
    createdAt,
    completedAt,
    state,
    isV2Certification,
    certificationChallenges,
    certificationAnswersByDate,
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.certificationCourseId = certificationCourseId;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.state = state;
    this.isV2Certification = isV2Certification;
    this.certificationChallenges = certificationChallenges;
    this.certificationAnswersByDate = certificationAnswersByDate;

    validateEntity(certificationAssessmentSchema, this);
  }

  getCertificationChallenge(challengeId) {
    return _.find(this.certificationChallenges, { challengeId }) || null;
  }

  getAnswerByQuestionNumber(questionNumber) {
    return this.certificationAnswersByDate[questionNumber - 1];
  }

  neutralizeChallengeByRecId(recId) {
    const challengeToBeNeutralized = _.find(this.certificationChallenges, { challengeId: recId });
    if (challengeToBeNeutralized) {
      challengeToBeNeutralized.neutralize();
    } else {
      throw new ChallengeToBeNeutralizedNotFoundError();
    }
  }

  endDueToFinalization() {
    this.state = states.ENDED_DUE_TO_FINALIZATION;
  }

  neutralizeChallengeByNumberIfKoOrSkippedOrPartially(questionNumber) {
    const toBeNeutralizedChallengeAnswer = this.getAnswerByQuestionNumber(questionNumber);
    if (!toBeNeutralizedChallengeAnswer) {
      return NeutralizationAttempt.failure(questionNumber);
    }

    if (_isAnswerKoOrSkippedOrPartially(toBeNeutralizedChallengeAnswer.result.status)) {
      const challengeToBeNeutralized = _.find(this.certificationChallenges, {
        challengeId: toBeNeutralizedChallengeAnswer.challengeId,
      });
      challengeToBeNeutralized.neutralize();
      return NeutralizationAttempt.neutralized(questionNumber);
    }

    return NeutralizationAttempt.skipped(questionNumber);
  }

  deneutralizeChallengeByRecId(recId) {
    const challengeToBeDeneutralized = _.find(this.certificationChallenges, { challengeId: recId });
    if (challengeToBeDeneutralized) {
      challengeToBeDeneutralized.deneutralize();
    } else {
      throw new ChallengeToBeDeneutralizedNotFoundError();
    }
  }

  validateAnswerByNumberIfFocusedOut(questionNumber) {
    const challengeAnswer = this.getAnswerByQuestionNumber(questionNumber);
    if (!challengeAnswer) {
      return CertificationAnswerStatusChangeAttempt.failed(questionNumber);
    }

    if (challengeAnswer.result.isFOCUSEDOUT()) {
      challengeAnswer.result = AnswerStatus.OK;
      return CertificationAnswerStatusChangeAttempt.changed(questionNumber);
    }

    return CertificationAnswerStatusChangeAttempt.skipped(questionNumber);
  }

  findAnswersAndChallengesForCertifiableBadgeKey(certifiableBadgeKey) {
    const certificationChallengesForBadge = _.filter(this.certificationChallenges, { certifiableBadgeKey });
    const challengeIds = _.map(certificationChallengesForBadge, 'challengeId');
    const answersForBadge = _.filter(this.certificationAnswersByDate, ({ challengeId }) =>
      _.includes(challengeIds, challengeId)
    );
    return {
      certificationChallenges: certificationChallengesForBadge,
      certificationAnswers: answersForBadge,
    };
  }

  isCompleted() {
    return this.state === states.COMPLETED;
  }

  getChallengeRecIdByQuestionNumber(questionNumber) {
    return this.getAnswerByQuestionNumber(questionNumber)?.challengeId;
  }

  skipUnansweredChallenges() {
    this.certificationChallenges.forEach((certificationChallenge) => {
      if (
        !this.certificationAnswersByDate.some(
          (certificationAnswer) => certificationChallenge.challengeId === certificationAnswer.challengeId
        )
      ) {
        certificationChallenge.skipAutomatically();
      }
    });
  }

  neutralizeUnansweredChallenges() {
    this.certificationChallenges.map((certificationChallenge) => {
      if (
        !this.certificationAnswersByDate.some(
          (certificationAnswer) => certificationChallenge.challengeId === certificationAnswer.challengeId
        )
      ) {
        certificationChallenge.neutralize();
      }
    });
  }
}

function _isAnswerKoOrSkippedOrPartially(answerStatus) {
  const isKo = AnswerStatus.isKO(answerStatus);
  const isSkipped = AnswerStatus.isSKIPPED(answerStatus);
  const isPartially = AnswerStatus.isPARTIALLY(answerStatus);
  return isKo || isSkipped || isPartially;
}

CertificationAssessment.states = states;

module.exports = CertificationAssessment;
