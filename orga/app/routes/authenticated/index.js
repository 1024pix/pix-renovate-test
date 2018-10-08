import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  currentUser: service(),

  beforeModel() {
    this.get('currentUser').load()
      .then((user) => {
        if (user.pixOrgaTermsOfServiceAccepted) {
          return this.transitionTo('authenticated.campaigns.list');
        } else {
          return this.transitionTo('authenticated.terms-of-service');
        }
      })
      .catch((error) => {
        this.get('session').invalidate();
        throw error;
      });
  }
});
