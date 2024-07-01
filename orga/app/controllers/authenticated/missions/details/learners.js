import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const DEFAULT_PAGE_NUMBER = 1;

export default class MissionLearnersController extends Controller {
  @service router;
  @tracked pageNumber = DEFAULT_PAGE_NUMBER;
  @tracked pageSize = 25;
  @tracked divisions = [];

  get learnersCount() {
    return this.model.missionLearners.meta.rowCount;
  }
  @action
  clearFilters() {
    this.pageNumber = null;
  }

  statusColor(status) {
    return {
      'not-started': 'tertiary',
      completed: 'success',
      started: 'secondary',
    }[status];
  }

  @action
  onSelectDivisions(divisions) {
    this.divisions = divisions;
    this.pageNumber = null;
  }

  @action
  onResetFilter() {
    this.divisions = [];
  }

  @action
  refresh() {
    this.send('refreshModel');
  }
}
