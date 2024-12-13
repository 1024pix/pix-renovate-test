import Service from '@ember/service';
import omit from 'lodash/omit';
import sinon from 'sinon';

/**
 * Stub the session service.
 *
 * @param {Object} owner - The owner object.
 * @param {Object} [sessionData={}] - The session object.
 * @param {boolean} [sessionData.isAuthenticated=false] - Indicates if the user is authenticated.
 * @param {boolean} [sessionData.isAuthenticatedByGar=false] - Indicates if the user is authenticated by GAR.
 * @param {string} [sessionData.externalUserTokenFromGar='external-user-token'] - The external user token from GAR.
 * @param {string} [sessionData.userIdForLearnerAssociation='expected-user-id'] - The expected user ID from GAR.
 * @param {string} [sessionData.source='pix'] - The source of authentication.
 * @param {string} [sessionData.userId] - The user ID.
 * @returns {Service} The stubbed session service.
 */
export function stubSessionService(owner, sessionData = {}) {
  const isAuthenticated = sessionData.isAuthenticated || false;
  const isAuthenticatedByGar = sessionData.isAuthenticatedByGar || false;
  const externalUserTokenFromGar = sessionData.externalUserTokenFromGar || 'external-user-token';
  const userIdForLearnerAssociation = sessionData.userIdForLearnerAssociation;
  const userId = isAuthenticated ? sessionData.userId || 123 : null;
  const source = isAuthenticated ? sessionData.source || 'pix' : null;

  class SessionStub extends Service {
    constructor() {
      super();
      this.isAuthenticated = isAuthenticated;
      this.isAuthenticatedByGar = isAuthenticatedByGar;
      this.userIdForLearnerAssociation = userIdForLearnerAssociation;

      if (isAuthenticated) {
        this.data = {
          authenticated: { user_id: userId, source, access_token: 'access_token!', scope: 'mon-pix' },
        };
      } else {
        this.data = {};
      }

      if (isAuthenticatedByGar) {
        this.externalUserTokenFromGar = externalUserTokenFromGar;
      }

      this.authenticate = sinon.stub();
      this.authenticateUser = sinon.stub();
      this.requireAuthentication = sinon.stub();
      this.invalidate = sinon.stub();
      this.revokeGarExternalUserToken = sinon.stub();
      this.revokeGarAuthenticationContext = sinon.stub();
      this.requireAuthenticationAndApprovedTermsOfService = sinon.stub();
      this.setAttemptedTransition = sinon.stub();
    }
  }

  owner.unregister('service:session');
  owner.register('service:session', SessionStub);
  return owner.lookup('service:session');
}

/**
 * Stub the current user service.
 *
 * @param {Object} owner - The owner object.
 * @param {Object} [userData={}] - The user object.
 * @param {boolean} [userData.isAnonymous=false] - Indicates if the user is anonymous.
 * @param {string} [userData.firstName='John'] - The first name of the user.
 * @param {string} [userData.lastName='Doe'] - The last name of the user.
 * @param {string} [userData.email] - The email of the user.
 * @param {Object} [userData.profile] - The profile of the user.
 * @param {boolean} [userData.mustValidateTermsOfService=false] - Indicates if the user must validate terms of service.
 * @param {boolean} [userData.hasRecommendedTrainings=false] - Indicates if the user has recommended trainings.
 * @param {boolean} [userData.hasAssessmentParticipations=false] - Indicates if the user has assessment participations.
 * @param {boolean} [userData.hasSeenOtherChallengesTooltip=false] - Indicates if the user has seen the other challenges tooltip.
 * @param {boolean} [userData.hasSeenFocusedChallengeTooltip=false] - Indicates if the user has seen the focused challenge tooltip.
 * @param {boolean} [userData.shouldSeeDataProtectionPolicyInformationBanner=false] - Indicates if the user should see the data protection policy information banner.
 * @param {string} [userData.codeForLastProfileToShare] - The code for the last profile to share.
 * @param {boolean} [withStoreStubbed=true] - Indicates to stub the store.
 * @returns {Service} The stubbed current user service.
 */
export function stubCurrentUserService(owner, userData = {}, { withStoreStubbed } = { withStoreStubbed: true }) {
  const isAuthenticated = userData.isAuthenticated ?? true;
  const isAnonymous = userData.isAnonymous || false;
  const id = userData.id || 123;
  const firstName = userData.firstName || 'John';
  const lastName = userData.lastName || 'Doe';
  const fullName = `${firstName} ${lastName}`;
  const email = userData.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.net`;
  const codeForLastProfileToShare = userData.codeForLastProfileToShare || null;
  const mustValidateTermsOfService = userData.mustValidateTermsOfService || false;
  const hasRecommendedTrainings = userData.hasRecommendedTrainings || false;
  const hasAssessmentParticipations = userData.hasAssessmentParticipations || false;
  const hasSeenOtherChallengesTooltip = userData.hasSeenOtherChallengesTooltip || false;
  const hasSeenFocusedChallengeTooltip = userData.hasSeenFocusedChallengeTooltip || false;
  const shouldSeeDataProtectionPolicyInformationBanner =
    userData.shouldSeeDataProtectionPolicyInformationBanner || false;

  const profile = userData.profile
    ? createRecord({ owner, key: 'profile', data: userData.profile, withStoreStubbed })
    : null;

  class CurrentUserStub extends Service {
    constructor() {
      super();

      if (!isAuthenticated) {
        this.user = null;
      } else if (isAnonymous) {
        this.user = createRecord({
          owner,
          key: 'user',
          data: { id, isAnonymous: true },
          withStoreStubbed,
        });
      } else {
        this.user = createRecord({
          owner,
          key: 'user',
          data: {
            isAnonymous: false,
            id,
            email,
            firstName,
            lastName,
            fullName,
            profile,
            codeForLastProfileToShare,
            mustValidateTermsOfService,
            hasRecommendedTrainings,
            hasSeenFocusedChallengeTooltip,
            hasSeenOtherChallengesTooltip,
            hasAssessmentParticipations,
            shouldSeeDataProtectionPolicyInformationBanner,
          },
          withStoreStubbed,
        });
      }

      this.load = sinon.stub();
    }
  }

  owner.unregister('service:current-user');
  owner.register('service:current-user', CurrentUserStub);
  return owner.lookup('service:current-user');
}

function createRecord({ owner, key, data, withStoreStubbed }) {
  if (withStoreStubbed) {
    return {
      ...data,
      save: sinon.stub(),
      get: sinon.stub(),
      set: sinon.stub(),
    };
  }

  const store = owner.lookup('service:store');
  return store.createRecord(key, omit(data, ['fullName']));
}
