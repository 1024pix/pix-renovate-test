import { inject as service } from '@ember/service';
import SecuredRouteMixin from 'mon-pix/mixins/secured-route-mixin';
import Route from '@ember/routing/route';

export default class ResumeRoute extends Route.extend(SecuredRouteMixin) {
  @service session;
  @service router;
  @service store;

  competenceId = null;

  model(params, transition) {
    const competenceId = transition.to.parent.params.competence_id;
    return this.store.queryRecord('competenceEvaluation', { competenceId, startOrResume: true });
  }

  afterModel(competenceEvaluation) {
    return this.router.replaceWith('assessments.resume', competenceEvaluation.get('assessment.id'));
  }
}
