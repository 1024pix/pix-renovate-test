import _ from 'lodash';

import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

function _getNumberOf(certifications, booleanFct) {
  return _.sumBy(
    certifications.toArray(),
    (certif) => Number(booleanFct(certif))
  );
}

function _formatHumanReadableLocaleDateTime(date, options) {
  return date ? (new Date(date)).toLocaleString('fr-FR', options) : date;
}

export const CREATED = 'created';
export const FINALIZED = 'finalized';
export const statusToDisplayName = {
  [CREATED]: 'Créée',
  [FINALIZED]: 'Finalisée',
};

export default class Session extends Model {

  @attr() certificationCenterName;
  @attr() address;
  @attr() room;
  @attr() examiner;
  @attr('date-only') date;
  @attr() time;
  @attr() description;
  @attr() accessCode;
  @attr() status;
  @attr() finalizedAt;
  @equal('status', FINALIZED) isFinalized;
  @attr() resultsSentToPrescriberAt;
  @attr() examinerGlobalComment;

  @hasMany('certification') certifications;
  @belongsTo('certification-center') certificationCenter;

  @computed('examinerGlobalComment')
  get hasExaminerGlobalComment() {
    return this.examinerGlobalComment && this.examinerGlobalComment.trim().length > 0;
  }

  @computed('certifications.@each.isPublished')
  get isPublished() {
    return _.some(
      this.certifications.toArray(),
      (certif) => certif.isPublished
    );
  }

  @computed('certifications.[]')
  get countExaminerComment() {
    const condition = (certif) => certif.examinerComment ? certif.examinerComment.trim().length > 0 : 0;
    return _getNumberOf(this.certifications, condition);
  }

  @computed('certifications.[]')
  get countNotCheckedEndScreen() {
    return _getNumberOf(this.certifications, (certif) => !certif.hasSeenEndTestScreen);
  }

  @computed('certifications.@each.status')
  get countNonValidatedCertifications() {
    return _getNumberOf(this.certifications, (certif) => certif.status !== 'validated');
  }

  @computed('certifications.@each.isPublished')
  get countPublishedCertifications() {
    return _getNumberOf(this.certifications, (certif) => certif.isPublished);
  }

  @computed('resultsSentToPrescriberAt')
  get displayResultsSentToPrescriberDate() {
    return _formatHumanReadableLocaleDateTime(this.resultsSentToPrescriberAt);
  }

  @computed('date')
  get displayDate() {
    return _formatHumanReadableLocaleDateTime(this.date, { day: 'numeric', month: 'numeric', year: 'numeric' });
  }

  @computed('finalizedAt')
  get displayFinalizationDate() {
    return _formatHumanReadableLocaleDateTime(this.finalizedAt);
  }

  @computed('status')
  get displayStatus() {
    return statusToDisplayName[this.status];
  }
}
