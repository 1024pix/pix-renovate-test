/*
 * Important note:
 * this component will be removed when session report import is removed from admin
 */
import Component from '@ember/component';
import { computed } from '@ember/object';
import DS from 'ember-data';
import _ from 'lodash';

export default Component.extend({

  // Element
  classNames: ['certification-session-report'],

  // Props
  displayCandidates:false,
  displayIncomplete:false,
  displayDuplicates:false,
  displayNotFromSession:false,
  displayWithoutCandidate:false,
  displayMissingEndScreen:false,
  displayComments:false,

  // CPs
  incomplete:computed('candidates', function() {
    return this.candidates.filter((candidate) => {
      return candidate.lastName == null
      || candidate.lastName === ''
      || candidate.firstName == null
      || candidate.firstName === ''
      || candidate.birthDate == null
      || candidate.birthDate === ''
      || candidate.birthPlace == null
      || candidate.birthPlace === ''
      || candidate.certificationId == null
      || candidate.certificationId === '';
    });
  }),
  duplicates:computed('candidates', function() {
    const certificationIds = _.map(this.candidates, 'certificationId');
    const groupedCertificationIds = _.groupBy(certificationIds, _.identity);
    return _.uniq(_.flatten(_.filter(groupedCertificationIds, (n) => n.length > 1)));
  }),
  notFromSession:computed('candidates', function() {
    const certificationIds = this.certifications.map((certification) => parseInt(certification.id));
    return this.candidates.filter((candidate) => {
      return certificationIds.indexOf(parseInt(candidate.certificationId)) === -1;
    });
  }),
  sessionCandidates:computed('candidates', 'notFromSession', function() {
    return DS.PromiseArray.create({
      promise: this.notFromSession
        .then((toBeExcluded) => {
          const excludeIds = toBeExcluded.reduce((ids, candidate) => {
            ids.push(candidate.certificationId);
            return ids;
          }, []);
          return this.candidates.filter((candidate) => {
            return excludeIds.indexOf(candidate.certificationId) === -1;
          });
        })
    });
  }),
  withoutCandidate:computed('candidates', function() {
    const candidateIds = this.candidates.map((candidate) => candidate.certificationId);
    return this.certifications.filter((certification) => {
      return candidateIds.indexOf(parseInt(certification.id)) === -1;
    });
  }),
  missingEndScreen:computed('candidates', function() {
    return this.candidates.filter((candidate) => {
      return candidate.lastScreen == null;
    });
  }),
  comments:computed('candidates', function() {
    return this.candidates.filter((candidate) => {
      return candidate.comments != null;
    });
  }),
  actions:{
    toggleCandidates() {
      this.set('displayCandidates', !this.get('displayCandidates'));
    },
    toggleDuplicates() {
      this.set('displayDuplicates', !this.get('displayDuplicates'));
    },
    toggleNotFromSession() {
      this.set('displayNotFromSession', !this.get('displayNotFromSession'));
    },
    toggleWithoutCandidate() {
      this.set('displayWithoutCandidate',  !this.get('displayWithoutCandidate'));
    },
    toggleMissingEndScreen() {
      this.set('displayMissingEndScreen',  !this.get('displayMissingEndScreen'));
    },
    toggleComments() {
      this.set('displayComments',  !this.get('displayComments'));
    },
    toggleIncomplete() {
      this.set('displayIncomplete',  !this.get('displayIncomplete'));
    }
  }
});
