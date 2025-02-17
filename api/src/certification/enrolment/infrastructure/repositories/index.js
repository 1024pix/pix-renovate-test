import * as dataProtectionOfficerRepository from '../../../../organizational-entities/infrastructure/repositories/data-protection-officer.repository.js';
import { injectDependencies } from '../../../../shared/infrastructure/utils/dependency-injection.js';
import * as complementaryCertificationApi from '../../../complementary-certification/application/api/complementary-certification-api.js';
import * as sessionManagementRepository from '../../../session-management/infrastructure/repositories/session-repository.js';
import * as certificationCandidateRepository from '../../../shared/infrastructure/repositories/certification-candidate-repository.js';
import * as certificationCenterRepository from '../../../shared/infrastructure/repositories/certification-center-repository.js';
import * as targetProfileHistoryRepository from '../../../shared/infrastructure/repositories/target-profile-history-repository.js';
import * as userRepository from '../../../shared/infrastructure/repositories/user-repository.js';
import * as candidateRepository from './candidate-repository.js';
import * as centerRepository from './center-repository.js';
import * as certificationCpfCityRepository from './certification-cpf-city-repository.js';
import * as certificationCpfCountryRepository from './certification-cpf-country-repository.js';
import * as complementaryCertificationBadgeWithOffsetVersionRepository from './complementary-certification-badge-with-offset-version-repository.js';
import * as complementaryCertificationCourseRepository from './complementary-certification-course-repository.js';
import * as complementaryCertificationRepository from './complementary-certification-repository.js';
import * as countryRepository from './country-repository.js';
import * as enrolledCandidateRepository from './enrolled-candidate-repository.js';
import * as pixCertificationRepository from './pix-certification-repository.js';
import * as scoCertificationCandidateRepository from './sco-certification-candidate-repository.js';
import * as sessionForAttendanceSheetRepository from './session-for-attendance-sheet-repository.js';
import * as sessionRepository from './session-repository.js';

/**
 * Using {@link https://jsdoc.app/tags-type "Closure Compiler's syntax"} to document injected dependencies
 *
 * @typedef {candidateRepository} CandidateRepository
 * @typedef {centerRepository} CenterRepository
 * @typedef {complementaryCertificationRepository} ComplementaryCertificationRepository
 * @typedef {sessionRepository} SessionRepository
 * @typedef {certificationCandidateRepository} CertificationCandidateRepository
 * @typedef {certificationCenterRepository} CertificationCenterRepository
 * @typedef {certificationCpfCountryRepository} CertificationCpfCountryRepository
 * @typedef {certificationCpfCityRepository} CertificationCpfCityRepository
 * @typedef {sessionForAttendanceSheetRepository} SessionForAttendanceSheetRepository
 * @typedef {sessionManagementRepository} SessionManagementRepository
 * @typedef {countryRepository} CountryRepository
 * @typedef {enrolledCandidateRepository} EnrolledCandidateRepository
 * @typedef {scoCertificationCandidateRepository} ScoCertificationCandidateRepository
 * @typedef {dataProtectionOfficerRepository} DataProtectionOfficerRepository
 * @typedef {userRepository} UserRepository
 * @typedef {targetProfileHistoryRepository} TargetProfileHistoryRepository
 * @typedef {complementaryCertificationCourseRepository} ComplementaryCertificationCourseRepository
 * @typedef {pixCertificationRepository} PixCertificationRepository
 * @typedef {complementaryCertificationBadgeWithOffsetVersionRepository} ComplementaryCertificationBadgeWithOffsetVersionRepository
 */
const repositoriesWithoutInjectedDependencies = {
  candidateRepository,
  centerRepository,
  certificationCandidateRepository,
  certificationCenterRepository,
  certificationCpfCountryRepository,
  certificationCpfCityRepository,
  complementaryCertificationRepository,
  countryRepository,
  dataProtectionOfficerRepository,
  enrolledCandidateRepository,
  scoCertificationCandidateRepository,
  sessionForAttendanceSheetRepository,
  sessionManagementRepository,
  sessionRepository,
  userRepository,
  targetProfileHistoryRepository,
  complementaryCertificationCourseRepository,
  pixCertificationRepository,
  complementaryCertificationBadgeWithOffsetVersionRepository,
};

/**
 * Using {@link https://jsdoc.app/tags-type "Closure Compiler's syntax"} to document injected dependencies
 *
 * @typedef {complementaryCertificationApi} ComplementaryCertificationApi
 */
const dependencies = {
  complementaryCertificationApi,
};

const enrolmentRepositories = injectDependencies(repositoriesWithoutInjectedDependencies, dependencies);

export { enrolmentRepositories };
