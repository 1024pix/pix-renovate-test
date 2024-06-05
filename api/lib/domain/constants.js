import { config } from '../config.js';
const PIX_COUNT_BY_LEVEL = 8;
const COMPETENCES_COUNT = 16;
const MAX_REACHABLE_PIX_BY_COMPETENCE = config.features.maxReachableLevel * PIX_COUNT_BY_LEVEL;

const MAX_REACHABLE_LEVEL = config.features.maxReachableLevel;
const MAX_REACHABLE_PIX_SCORE = MAX_REACHABLE_PIX_BY_COMPETENCE * COMPETENCES_COUNT;
const MAX_CHALLENGES_PER_COMPETENCE_FOR_CERTIFICATION = 3;
const MAX_CHALLENGES_PER_AREA_FOR_CERTIFICATION_PLUS = 4;
const MAX_MASTERY_RATE = 1;
const MINIMUM_DELAY_IN_DAYS_FOR_RESET = config.features.dayBeforeCompetenceResetV2;
const MINIMUM_DELAY_IN_DAYS_BEFORE_IMPROVING = config.features.dayBeforeImproving;
const MINIMUM_DELAY_IN_DAYS_BEFORE_RETRYING = config.features.dayBeforeRetrying;

const MINIMUM_CERTIFIABLE_COMPETENCES_FOR_CERTIFIABILITY = 5;
const MINIMUM_COMPETENCE_LEVEL_FOR_CERTIFIABILITY = 1;
const MINIMUM_REPRODUCIBILITY_RATE_TO_BE_CERTIFIED = 50;
const MINIMUM_REPRODUCIBILITY_RATE_TO_BE_TRUSTED = 80;

const V3_REPRODUCIBILITY_RATE = 100;
const UNCERTIFIED_LEVEL = -1;

const MAX_LEVEL_TO_BE_AN_EASY_TUBE = 3;
const DEFAULT_LEVEL_FOR_FIRST_CHALLENGE = 2;
const MAX_DIFF_BETWEEN_USER_LEVEL_AND_SKILL_LEVEL = 2;

const ALL_TREATMENTS = ['t1', 't2', 't3'];
const PIX_ORIGIN = 'Pix';

const AUTONOMOUS_COURSES_ORGANIZATION_ID = config.autonomousCourse.autonomousCoursesOrganizationId;

const STUDENT_RECONCILIATION_ERRORS = {
  RECONCILIATION: {
    IN_OTHER_ORGANIZATION: {
      email: { shortCode: 'R11', code: 'ACCOUNT_WITH_EMAIL_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
      username: { shortCode: 'R12', code: 'ACCOUNT_WITH_USERNAME_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
      samlId: { shortCode: 'R13', code: 'ACCOUNT_WITH_GAR_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
    },
    IN_SAME_ORGANIZATION: {
      email: { shortCode: 'R31', code: 'ACCOUNT_WITH_EMAIL_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
      username: { shortCode: 'R32', code: 'ACCOUNT_WITH_USERNAME_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
      samlId: { shortCode: 'R33', code: 'ACCOUNT_WITH_GAR_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
      anotherStudentIsAlreadyReconciled: { shortCode: 'R70', code: 'USER_ALREADY_RECONCILED_IN_THIS_ORGANIZATION' },
    },
    ACCOUNT_BELONGING_TO_ANOTHER_USER: { shortCode: 'R90', code: 'ACCOUNT_SEEMS_TO_BELONGS_TO_ANOTHER_USER' },
  },
  LOGIN_OR_REGISTER: {
    IN_DB: {
      username: { shortCode: 'S50', code: 'ACCOUNT_WITH_USERNAME_ALREADY_EXIST_IN_DB' },
    },
    IN_SAME_ORGANIZATION: {
      email: { shortCode: 'S51', code: 'ACCOUNT_WITH_EMAIL_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
      username: { shortCode: 'S52', code: 'ACCOUNT_WITH_USERNAME_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
      samlId: { shortCode: 'S53', code: 'ACCOUNT_WITH_GAR_ALREADY_EXIST_FOR_THE_SAME_ORGANIZATION' },
    },
    IN_OTHER_ORGANIZATION: {
      email: { shortCode: 'S61', code: 'ACCOUNT_WITH_EMAIL_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
      username: { shortCode: 'S62', code: 'ACCOUNT_WITH_USERNAME_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
      samlId: { shortCode: 'S63', code: 'ACCOUNT_WITH_GAR_ALREADY_EXIST_FOR_ANOTHER_ORGANIZATION' },
    },
  },
};

const OIDC_ERRORS = {
  USER_INFO: {
    missingFields: { shortCode: 'OIDC01', code: 'USER_INFO_MISSING_FIELDS' },
    badResponseFormat: { shortCode: 'OIDC02', code: 'USER_INFO_BAD_RESPONSE_FORMAT' },
  },
};

const CERTIFICATION_CENTER_TYPES = {
  SUP: 'SUP',
  SCO: 'SCO',
  PRO: 'PRO',
};

const constants = {
  PIX_COUNT_BY_LEVEL,
  COMPETENCES_COUNT,
  MAX_REACHABLE_LEVEL,
  MAX_REACHABLE_PIX_SCORE,
  MAX_REACHABLE_PIX_BY_COMPETENCE,
  MAX_CHALLENGES_PER_COMPETENCE_FOR_CERTIFICATION,
  MAX_CHALLENGES_PER_AREA_FOR_CERTIFICATION_PLUS,
  MAX_MASTERY_RATE,
  MINIMUM_DELAY_IN_DAYS_FOR_RESET,
  MINIMUM_DELAY_IN_DAYS_BEFORE_IMPROVING,
  MINIMUM_DELAY_IN_DAYS_BEFORE_RETRYING,
  MINIMUM_CERTIFIABLE_COMPETENCES_FOR_CERTIFIABILITY,
  MINIMUM_COMPETENCE_LEVEL_FOR_CERTIFIABILITY,
  MINIMUM_REPRODUCIBILITY_RATE_TO_BE_CERTIFIED,
  MINIMUM_REPRODUCIBILITY_RATE_TO_BE_TRUSTED,
  UNCERTIFIED_LEVEL,
  MAX_LEVEL_TO_BE_AN_EASY_TUBE,
  DEFAULT_LEVEL_FOR_FIRST_CHALLENGE,
  MAX_DIFF_BETWEEN_USER_LEVEL_AND_SKILL_LEVEL,
  ALL_TREATMENTS,
  PIX_ORIGIN,
  STUDENT_RECONCILIATION_ERRORS,
  OIDC_ERRORS,
  CERTIFICATION_CENTER_TYPES,
  AUTONOMOUS_COURSES_ORGANIZATION_ID,
};

export {
  ALL_TREATMENTS,
  CERTIFICATION_CENTER_TYPES,
  COMPETENCES_COUNT,
  constants,
  DEFAULT_LEVEL_FOR_FIRST_CHALLENGE,
  MAX_CHALLENGES_PER_AREA_FOR_CERTIFICATION_PLUS,
  MAX_CHALLENGES_PER_COMPETENCE_FOR_CERTIFICATION,
  MAX_DIFF_BETWEEN_USER_LEVEL_AND_SKILL_LEVEL,
  MAX_LEVEL_TO_BE_AN_EASY_TUBE,
  MAX_MASTERY_RATE,
  MAX_REACHABLE_LEVEL,
  MAX_REACHABLE_PIX_BY_COMPETENCE,
  MAX_REACHABLE_PIX_SCORE,
  MINIMUM_CERTIFIABLE_COMPETENCES_FOR_CERTIFIABILITY,
  MINIMUM_COMPETENCE_LEVEL_FOR_CERTIFIABILITY,
  MINIMUM_DELAY_IN_DAYS_BEFORE_IMPROVING,
  MINIMUM_DELAY_IN_DAYS_BEFORE_RETRYING,
  MINIMUM_DELAY_IN_DAYS_FOR_RESET,
  MINIMUM_REPRODUCIBILITY_RATE_TO_BE_CERTIFIED,
  MINIMUM_REPRODUCIBILITY_RATE_TO_BE_TRUSTED,
  OIDC_ERRORS,
  PIX_COUNT_BY_LEVEL,
  PIX_ORIGIN,
  STUDENT_RECONCILIATION_ERRORS,
  UNCERTIFIED_LEVEL,
  V3_REPRODUCIBILITY_RATE,
};
