import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class JoinFromMediacentreRoute extends Route {
  @service currentUser;
  @service session;

  model() {
    return this.modelFor('campaigns');
  }
}
