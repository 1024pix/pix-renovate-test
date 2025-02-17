import Model, { attr } from '@ember-data/model';

export default class FeatureToggle extends Model {
  @attr('boolean') isTextToSpeechButtonEnabled;
  @attr('boolean') showNewCampaignPresentationPage;
  @attr('boolean') isPixCompanionEnabled;
  @attr('boolean') isQuestEnabled;
}
