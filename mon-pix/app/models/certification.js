/* eslint ember/no-computed-properties-in-native-classes: 0 */

import { computed } from '@ember/object';
import { service } from '@ember/service';
import Model, { attr, belongsTo } from '@ember-data/model';

export const ACQUIRED = 'acquired';

const professionalizingDate = new Date('2022-01-01');

export default class Certification extends Model {
  @service currentDomain;

  // attributes
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('date-only') birthdate;
  @attr('string') birthplace;
  @attr('date') date;
  @attr('date') deliveredAt;
  @attr('boolean') isPublished;
  @attr('string') certificationCenter;
  @attr('string') commentForCandidate;
  @attr('number') pixScore;
  @attr('string') status;
  @attr('string') verificationCode;
  @attr() certifiedBadgeImages;
  @attr('number') maxReachableLevelOnCertificationDate;
  @attr('number') version;

  // includes
  @belongsTo('resultCompetenceTree', { async: true, inverse: null }) resultCompetenceTree;
  @belongsTo('user', { async: true, inverse: 'certifications' }) user;

  @computed('certifiedBadgeImages.length')
  get hasAcquiredComplementaryCertifications() {
    return this.certifiedBadgeImages.length > 0;
  }

  @computed('firstName', 'lastName')
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  get shouldDisplayProfessionalizingWarning() {
    return (
      this.version === 2 &&
      this.currentDomain.isFranceDomain &&
      new Date(this.deliveredAt).getTime() >= professionalizingDate.getTime()
    );
  }

  get maxReachablePixCountOnCertificationDate() {
    return this.maxReachableLevelOnCertificationDate * 8 * 16;
  }
}
