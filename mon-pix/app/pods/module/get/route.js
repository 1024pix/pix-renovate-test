import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ModulesGetRoute extends Route {
  @service store;

  async model(params) {
    return await this.store.findRecord('module', params.module_slug);
  }
}
