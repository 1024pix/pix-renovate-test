import Route from '@ember/routing/route';

export default class CampaignLandingPageRoute extends Route {

  async model() {
    return this.modelFor('campaigns');
  }

}
