import { FlashAssessmentAlgorithmConfiguration } from '../../../../src/certification/shared/domain/models/FlashAssessmentAlgorithmConfiguration.js';

export const buildFlashAlgorithmConfiguration = ({
  maximumAssessmentLength,
  challengesBetweenSameCompetence,
  limitToOneQuestionPerTube,
  enablePassageByAllCompetences,
  variationPercent,
  variationPercentUntil,
  createdAt,
} = {}) => {
  return new FlashAssessmentAlgorithmConfiguration({
    maximumAssessmentLength,
    challengesBetweenSameCompetence,
    limitToOneQuestionPerTube,
    enablePassageByAllCompetences,
    variationPercent,
    variationPercentUntil,
    createdAt,
  });
};
