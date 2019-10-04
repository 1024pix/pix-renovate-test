const _ = require('lodash');
const injectDefaults = require('../../infrastructure/utils/inject-defaults');

const dependencies = {
  answerRepository: require('../../infrastructure/repositories/answer-repository'),
  assessmentRepository: require('../../infrastructure/repositories/assessment-repository'),
  assessmentResultRepository: require('../../infrastructure/repositories/assessment-result-repository'),
  campaignCollectiveResultRepository: require('../../infrastructure/repositories/campaign-collective-result-repository'),
  campaignParticipationRepository: require('../../infrastructure/repositories/campaign-participation-repository'),
  campaignRepository: require('../../infrastructure/repositories/campaign-repository'),
  certificationCandidatesOdsService: require('../../domain/services/certification-candidates-ods-service'),
  certificationsOdsService: require('../../domain/services/certifications-ods-service'),
  certificationCandidateRepository: require('../../infrastructure/repositories/certification-candidate-repository'),
  certificationChallengesService: require('../../domain/services/certification-challenges-service'),
  certificationCenterRepository: require('../../infrastructure/repositories/certification-center-repository'),
  certificationCenterMembershipRepository: require('../../infrastructure/repositories/certification-center-membership-repository'),
  certificationChallengeRepository: require('../../infrastructure/repositories/certification-challenge-repository'),
  certificationCourseRepository: require('../../infrastructure/repositories/certification-course-repository'),
  certificationRepository: require('../../infrastructure/repositories/certification-repository'),
  challengeRepository: require('../../infrastructure/repositories/challenge-repository'),
  competenceEvaluationRepository: require('../../infrastructure/repositories/competence-evaluation-repository'),
  competenceMarkRepository: require('../../infrastructure/repositories/competence-mark-repository'),
  competenceRepository: require('../../infrastructure/repositories/competence-repository'),
  competenceTreeRepository: require('../../infrastructure/repositories/competence-tree-repository'),
  correctionRepository: require('../../infrastructure/repositories/correction-repository'),
  courseRepository: require('../../infrastructure/repositories/course-repository'),
  encryptionService: require('../../domain/services/encryption-service'),
  improvementService: require('../../domain/services/improvement-service'),
  knowledgeElementRepository: require('../../infrastructure/repositories/knowledge-element-repository'),
  mailService: require('../../domain/services/mail-service'),
  membershipRepository: require('../../infrastructure/repositories/membership-repository'),
  organizationService: require('../../domain/services/organization-service'),
  organizationRepository: require('../../infrastructure/repositories/organization-repository'),
  organizationInvitationRepository: require('../../infrastructure/repositories/organization-invitation-repository'),
  resetPasswordService: require('../../domain/services/reset-password-service'),
  reCaptchaValidator: require('../../infrastructure/validators/grecaptcha-validator'),
  scoringService: require('../../domain/services/scoring/scoring-service'),
  scorecardService: require('../../domain/services/scorecard-service'),
  settings: require('../../config'),
  skillRepository: require('../../infrastructure/repositories/skill-repository'),
  smartPlacementAssessmentRepository: require('../../infrastructure/repositories/smart-placement-assessment-repository'),
  targetProfileRepository: require('../../infrastructure/repositories/target-profile-repository'),
  tokenService: require('../../domain/services/token-service'),
  userRepository: require('../../infrastructure/repositories/user-repository'),
  userService: require('../../domain/services/user-service'),
  sessionRepository: require('../../infrastructure/repositories/session-repository'),
  sessionService: require('../../domain/services/session-service'),
  snapshotsCsvConverter: require('../../infrastructure/converter/snapshots-csv-converter'),
  snapshotRepository: require('../../infrastructure/repositories/snapshot-repository'),
  studentRepository: require('../../infrastructure/repositories/student-repository'),
  studentsXmlService: require('../../domain/services/students-xml-service'),
};

function injectDependencies(usecases) {
  return _.mapValues(usecases, _.partial(injectDefaults, dependencies));
}

module.exports = injectDependencies({
  acceptPixCertifTermsOfService: require('./accept-pix-certif-terms-of-service'),
  acceptPixOrgaTermsOfService: require('./accept-pix-orga-terms-of-service'),
  addOrganizationMembershipWithEmail: require('./add-organization-membership-with-email'),
  answerToOrganizationInvitation: require('./answer-to-organization-invitation'),
  authenticateUser: require('./authenticate-user'),
  beginCampaignParticipationImprovement: require('./begin-campaign-participation-improvement'),
  completeAssessment: require('./complete-assessment'),
  computeCampaignCollectiveResult: require('./compute-campaign-collective-result'),
  correctAnswerThenUpdateAssessment: require('./correct-answer-then-update-assessment'),
  createAssessmentForCampaign: require('./create-assessment-for-campaign'),
  createCampaign: require('./create-campaign'),
  createCertificationCenterMembership: require('./create-certification-center-membership'),
  createMembership: require('./create-membership'),
  createOrganization: require('./create-organization'),
  createOrganizationInvitation: require('./create-organization-invitation'),
  createSession: require('./create-session'),
  createUser: require('./create-user'),
  findAnswerByChallengeAndAssessment: require('./find-answer-by-challenge-and-assessment'),
  findCampaignParticipationsRelatedToAssessment: require('./find-campaign-participations-related-to-assessment'),
  findCampaignParticipationsRelatedToUser: require('./find-campaign-participations-related-to-user'),
  findCampaignParticipationsWithResults: require('./find-campaign-participations-with-results'),
  findCertificationAssessments: require('./find-certification-assessments'),
  findCertificationCenters: require('./find-certification-centers'),
  findCompetenceEvaluations: require('./find-competence-evaluations'),
  findCompletedUserCertifications: require('./find-completed-user-certifications'),
  findOrganizationStudents: require('./find-organization-students'),
  findOrganizations: require('./find-organizations'),
  findSessionsForCertificationCenter: require('./find-sessions-for-certification-center'),
  findSmartPlacementAssessments: require('./find-smart-placement-assessments'),
  findSnapshots: require('./find-snapshots'),
  findUsers: require('./find-users'),
  getAnswer: require('./get-answer'),
  getAssessment: require('./get-assessment'),
  getAttendanceSheet: require('./get-attendance-sheet'),
  getCampaign: require('./get-campaign'),
  getCampaignParticipation: require('./get-campaign-participation'),
  getCampaignParticipationResult: require('./get-campaign-participation-result'),
  getCampaignReport: require('./get-campaign-report'),
  getCertificationCenter: require('./get-certification-center'),
  getCorrectionForAnswer: require('./get-correction-for-answer'),
  getCurrentUser: require('./get-current-user'),
  getNextChallengeForCertification: require('./get-next-challenge-for-certification'),
  getNextChallengeForCompetenceEvaluation: require('./get-next-challenge-for-competence-evaluation'),
  getNextChallengeForDemo: require('./get-next-challenge-for-demo'),
  getNextChallengeForPreview: require('./get-next-challenge-for-preview'),
  getNextChallengeForSmartPlacement: require('./get-next-challenge-for-smart-placement'),
  getOrCreateSamlUser: require('./get-or-create-saml-user'),
  getOrganizationCampaigns: require('./get-organization-campaigns'),
  getOrganizationDetails: require('./get-organization-details'),
  getOrganizationMemberships: require('./get-organization-memberships'),
  getProgression: require('./get-progression'),
  getResultsCampaignInCSVFormat: require('./get-results-campaign-in-csv-format'),
  getScorecard: require('./get-scorecard'),
  getSessionCertificationCandidates: require('./get-session-certification-candidates'),
  getUser: require('./get-user'),
  getUserCertificationCenterMemberships: require('./get-user-certification-center-memberships'),
  getUserCertificationWithResultTree: require('./get-user-certification-with-result-tree'),
  getUserPixScore: require('./get-user-pix-score'),
  getUserScorecards: require('./get-user-scorecards'),
  getUserWithMemberships: require('./get-user-with-memberships'),
  importCertificationCandidatesFromAttendanceSheet: require('./import-certification-candidates-from-attendance-sheet'),
  importStudentsFromSIECLE: require('./import-students-from-siecle'),
  parseCertificationsDataFromAttendanceSheet: require('./parse-certifications-data-from-attendance-sheet'),
  preloadCacheEntries: require('./preload-cache-entries'),
  reloadCacheEntry: require('./reload-cache-entry'),
  rememberUserHasSeenAssessmentInstructions: require('./remember-user-has-seen-assessment-instructions'),
  rememberUserHasSeenNewProfileInfo: require('./remember-user-has-seen-new-profile-info'),
  removeAllCacheEntries: require('./remove-all-cache-entries'),
  resetScorecard: require('./reset-scorecard'),
  retrieveCampaignInformation: require('./retrieve-campaign-information'),
  retrieveLastOrCreateCertificationCourse: require('./retrieve-last-or-create-certification-course'),
  saveCertificationCenter: require('./save-certification-center'),
  shareCampaignResult: require('./share-campaign-result'),
  startCampaignParticipation: require('./start-campaign-participation'),
  startOrResumeCompetenceEvaluation: require('./start-or-resume-competence-evaluation'),
  updateCampaign: require('./update-campaign'),
  updateCertificationPublicationStatus: require('./update-certification-publication-status'),
  updateOrganizationInformation: require('./update-organization-information'),
  updateSession: require('./update-session'),
  updateUserPassword: require('./update-user-password'),
  writeOrganizationSharedProfilesAsCsvToStream: require('./write-organization-shared-profiles-as-csv-to-stream'),
});
