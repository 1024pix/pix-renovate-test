import Model, { attr } from '@ember-data/model';

export default class FlashAlgorithmConfiguration extends Model {
  @attr('number') maximumAssessmentLength;
  @attr('number') challengesBetweenSameCompetence;
  @attr('number') variationPercent;
  @attr('number') variationPercentUntil;
  @attr('boolean') limitToOneQuestionPerTube;
  @attr('boolean') enablePassageByAllCompetences;
  @attr('array') forcedCompetences;
}
