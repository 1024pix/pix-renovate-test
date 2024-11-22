import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as obfuscationService from '../../../../../lib/domain/services/obfuscation-service.js';
import * as userReconciliationService from '../../../../../lib/domain/services/user-reconciliation-service.js';
import * as campaignRepository from '../../../../../lib/infrastructure/repositories/campaign-repository.js';
import * as libOrganizationLearnerRepository from '../../../../../lib/infrastructure/repositories/organization-learner-repository.js';
import * as userRepository from '../../../../identity-access-management/infrastructure/repositories/user.repository.js';
import * as organizationFeatureApi from '../../../../organizational-entities/application/api/organization-features-api.js';
import { logErrorWithCorrelationIds } from '../../../../shared/infrastructure/monitoring-tools.js';
import * as organizationRepository from '../../../../shared/infrastructure/repositories/organization-repository.js';
import { injectDependencies } from '../../../../shared/infrastructure/utils/dependency-injection.js';
import { importNamedExportsFromDirectory } from '../../../../shared/infrastructure/utils/import-named-exports-from-directory.js';
import { logger } from '../../../../shared/infrastructure/utils/logger.js';
import * as membershipRepository from '../../../../team/infrastructure/repositories/membership.repository.js';
import * as registrationOrganizationLearnerRepository from '../../../organization-learner/infrastructure/repositories/registration-organization-learner-repository.js';
import * as campaignParticipationRepository from '../../infrastructure/repositories/campaign-participation-repository.js';
import { repositories } from '../../infrastructure/repositories/index.js';
import { importOrganizationLearnersJobRepository } from '../../infrastructure/repositories/jobs/import-organization-learners-job-repository.js';
import { importSupOrganizationLearnersJobRepository } from '../../infrastructure/repositories/jobs/import-sup-organization-learners-job-repository.js';
import { validateCsvOrganizationImportFileJobRepository } from '../../infrastructure/repositories/jobs/validate-csv-organization-learners-import-file-job-repository.js';
import { validateOrganizationImportFileJobRepository } from '../../infrastructure/repositories/jobs/validate-organization-learners-import-file-job-repository.js';
import * as organizationImportRepository from '../../infrastructure/repositories/organization-import-repository.js';
import * as organizationLearnerImportFormatRepository from '../../infrastructure/repositories/organization-learner-import-format-repository.js';
import * as organizationLearnerRepository from '../../infrastructure/repositories/organization-learner-repository.js';
import * as studentRepository from '../../infrastructure/repositories/student-repository.js';
import * as supOrganizationLearnerRepository from '../../infrastructure/repositories/sup-organization-learner-repository.js';
import { importStorage } from '../../infrastructure/storage/import-storage.js';

/**
 * @typedef {import ('../../infrastructure/repositories/organization-feature-repository.js')} CampaignParticipationRepository
 * @typedef {import ('../../../../../lib/infrastructure/repositories/campaign-repository.js')} CampaignRepository
 * @typedef {import ('../../infrastructure/repositories/jobs/import-organization-learners-job-repository.js')} ImportOrganizationLearnersJobRepository
 * @typedef {import ('../../infrastructure/storage/import-storage.js')} ImportStorage
 * @typedef {import ('../../infrastructure/repositories/jobs/import-sup-organization-learners-job-repository.js')} ImportSupOrganizationLearnersJobRepository
 * @typedef {import ('../../../../../lib/infrastructure/repositories/organization-learner-repository.js')} libOrganizationLearnerRepository
 * @typedef {import ('../../../../shared/infrastructure/monitoring-tools.js')} LogErrorWithCorrelationIds
 * @typedef {import ('../../../../shared/infrastructure/utils/logger.js')} loggger
 * @typedef {import ('../../../../team/infrastructure/repositories/membership-repository.js')} MembershipRepository
 * @typedef {import ('../../../../../lib/domain/services/obfuscation-service.js')} obfuscationService
 * @typedef {import ('../../../../organizational-entities/application/api/organization-features-api.js')} OrganizationFeatureApi
 * @typedef {import ('../../infrastructure/repositories/organization-feature-repository.js')} OrganizationFeatureRepository
 * @typedef {import ('../../infrastructure/repositories/organization-import-repository.js')} OrganizationImportRepository
 * @typedef {import ('../../infrastructure/repositories/organization-learner-import-format-repository.js')} OrganizationLearnerImportFormatRepository
 * @typedef {import ('../../infrastructure/repositories/organization-learner-repository.js')} OrganizationLearnerRepository
 * @typedef {import ('../../../../shared/infrastructure/repositories/organization-repository.js')} OrganizationRepository
 * @typedef {import('../../../organization-learner/infrastructure/repositories/registration-organization-learner-repository.js')} registrationOrganizationLearnerRepository
 * @typedef {import ('../../infrastructure/repositories/student-repository.js')} studentRepository
 * @typedef {import ('../../infrastructure/repositories/sup-organization-learner-repository.js')} SupOrganizationLearnerRepository
 * @typedef {import ('../../../../../lib/domain/services/user-reconciliation-service.js')} UserReconciliationService
 * @typedef {import('../../../../identity-access-management/infrastructure/repositories/user.repository.js')} userRepository
 * @typedef {import('../../infrastructure/repositories/jobs/validate-csv-organization-learners-import-file-job-repository.js')} validateCsvOrganizationImportFileJobRepository
 * @typedef {import ('../../infrastructure/repositories/jobs/validate-organization-learners-import-file-job-repository.js')} ValidateOrganizationImportFileJobRepository
 */
const dependencies = {
  campaignParticipationRepository,
  campaignRepository,
  importOrganizationLearnersJobRepository,
  importStorage,
  importSupOrganizationLearnersJobRepository,
  libOrganizationLearnerRepository,
  logErrorWithCorrelationIds,
  logger,
  membershipRepository,
  obfuscationService,
  organizationFeatureApi,
  organizationFeatureRepository: repositories.organizationFeatureRepository,
  organizationImportRepository,
  organizationLearnerImportFormatRepository,
  organizationLearnerRepository,
  organizationRepository,
  registrationOrganizationLearnerRepository,
  studentRepository,
  supOrganizationLearnerRepository,
  userReconciliationService,
  userRepository,
  validateCsvOrganizationImportFileJobRepository,
  validateOrganizationImportFileJobRepository,
};

const path = dirname(fileURLToPath(import.meta.url));

const usecasesWithoutInjectedDependencies = {
  ...(await importNamedExportsFromDirectory({
    path: join(path, './'),
    ignoredFileNames: ['index.js'],
  })),
  ...(await importNamedExportsFromDirectory({
    path: join(path, './import-from-feature/'),
    ignoredFileNames: ['index.js'],
  })),
};

/**
 * @typedef PrescriptionLearnerManagementUsecases
 * @property {saveOrganizationLearnersFile} saveOrganizationLearnersFile
 * @property {sendOrganizationLearnersFile} sendOrganizationLearnersFile
 * @property {validateOrganizationLearnersFile} validateOrganizationLearnersFile
 * @property {addOrUpdateOrganizationLearners} addOrUpdateOrganizationLearners
 * @property {deleteOrganizationLearners} deleteOrganizationLearners
 * @property {dissociateUserFromOrganizationLearner} dissociateUserFromOrganizationLearner
 * @property {getOrganizationImportStatus} getOrganizationImportStatus
 * @property {getOrganizationLearnersCsvTemplate} getOrganizationLearnersCsvTemplate
 * @property {handlePayloadTooLargeError} handlePayloadTooLargeError
 * @property {importOrganizationLearnersFromSIECLECSVFormat} importOrganizationLearnersFromSIECLECSVFormat
 * @property {importSupOrganizationLearners} importSupOrganizationLearners
 * @property {hasBeenLearner} hasBeenLearner
 * @property {reconcileCommonOrganizationLearner} reconcileCommonOrganizationLearner
 * @property {reconcileScoOrganizationLearnerAutomatically} reconcileScoOrganizationLearnerAutomatically
 * @property {replaceSupOrganizationLearners} replaceSupOrganizationLearners
 * @property {updateOrganizationLearnerImportFormats} updateOrganizationLearnerImportFormats
 * @property {updateStudentNumber} updateStudentNumber
 * @property {uploadCsvFile} uploadCsvFile
 * @property {uploadSiecleFile} uploadSiecleFile
 * @property {validateCsvFile} validateCsvFile
 * @property {validateSiecleXmlFile} validateSiecleXmlFile
 */

/**
 * @type {PrescriptionLearnerManagementUsecases}
 */
const usecases = injectDependencies(usecasesWithoutInjectedDependencies, dependencies);

export { usecases };
