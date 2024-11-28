import { config } from '../../../../shared/config.js';
import { FlashAssessmentSuccessRateHandler } from '../../../flash-certification/domain/models/FlashAssessmentSuccessRateHandler.js';

/**
 * @param forcedCompetences - force the algorithm to ask questions on the specified competences
 * @param maximumAssessmentLength - override the default limit for an assessment length
 * @param challengesBetweenSameCompetence - define a number of questions before getting another one on the same competence
 * @param minimumEstimatedSuccessRateRanges - force a minimal estimated success rate for challenges chosen at specific indexes
 * @param limitToOneQuestionPerTube - limits questions to one per tube
 * @param flashImplementation - the flash algorithm implementation
 * @param enablePassageByAllCompetences - enable or disable the passage through all competences
 * @param variationPercent - maximum variation of estimated level between two answers
 * @param variationPercentUntil - maximum variation of estimated level between two answers for a specified number of challenges
 */
export class FlashAssessmentAlgorithmConfiguration {
  constructor({
    forcedCompetences = [],
    maximumAssessmentLength = config.v3Certification.numberOfChallengesPerCourse,
    challengesBetweenSameCompetence = config.v3Certification.challengesBetweenSameCompetence,
    minimumEstimatedSuccessRateRanges = [],
    limitToOneQuestionPerTube = false,
    enablePassageByAllCompetences = false,
    variationPercent,
    variationPercentUntil,
    createdAt,
  } = {}) {
    this.forcedCompetences = forcedCompetences;
    this.maximumAssessmentLength = maximumAssessmentLength;
    this.challengesBetweenSameCompetence = challengesBetweenSameCompetence;
    this.minimumEstimatedSuccessRateRanges = minimumEstimatedSuccessRateRanges;
    this.limitToOneQuestionPerTube = limitToOneQuestionPerTube;
    this.enablePassageByAllCompetences = enablePassageByAllCompetences;
    this.variationPercent = variationPercent;
    this.variationPercentUntil = variationPercentUntil;
    this.createdAt = createdAt;
  }

  toDTO() {
    return {
      forcedCompetences: JSON.stringify(this.forcedCompetences),
      maximumAssessmentLength: this.maximumAssessmentLength,
      challengesBetweenSameCompetence: this.challengesBetweenSameCompetence,
      minimumEstimatedSuccessRateRanges: JSON.stringify(
        this.minimumEstimatedSuccessRateRanges.map((successRateRange) => successRateRange.toDTO()),
      ),
      limitToOneQuestionPerTube: this.limitToOneQuestionPerTube,
      enablePassageByAllCompetences: this.enablePassageByAllCompetences,
      variationPercent: this.variationPercent,
      variationPercentUntil: this.variationPercentUntil,
      createdAt: this.createdAt,
    };
  }

  static fromDTO({
    forcedCompetences,
    maximumAssessmentLength,
    challengesBetweenSameCompetence,
    minimumEstimatedSuccessRateRanges,
    limitToOneQuestionPerTube,
    enablePassageByAllCompetences,
    variationPercent,
    variationPercentUntil,
    createdAt,
  }) {
    return new FlashAssessmentAlgorithmConfiguration({
      forcedCompetences,
      maximumAssessmentLength,
      challengesBetweenSameCompetence,
      minimumEstimatedSuccessRateRanges: minimumEstimatedSuccessRateRanges
        ? minimumEstimatedSuccessRateRanges.map((config) => FlashAssessmentSuccessRateHandler.fromDTO(config))
        : minimumEstimatedSuccessRateRanges,
      limitToOneQuestionPerTube,
      enablePassageByAllCompetences,
      variationPercent,
      variationPercentUntil,
      createdAt,
    });
  }
}
