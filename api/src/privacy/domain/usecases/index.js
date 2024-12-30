import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as authenticationMethodRepository from '../../../identity-access-management/infrastructure/repositories/authentication-method.repository.js';
import { userAnonymizedEventLoggingJobRepository } from '../../../identity-access-management/infrastructure/repositories/jobs/user-anonymized-event-logging-job-repository.js';
import { refreshTokenRepository } from '../../../identity-access-management/infrastructure/repositories/refresh-token.repository.js';
import { resetPasswordDemandRepository } from '../../../identity-access-management/infrastructure/repositories/reset-password-demand.repository.js';
import * as userRepository from '../../../identity-access-management/infrastructure/repositories/user.repository.js';
import * as organizationLearnerRepository from '../../../shared/infrastructure/repositories/organization-learner-repository.js';
import * as userLoginRepository from '../../../shared/infrastructure/repositories/user-login-repository.js';
import { injectDependencies } from '../../../shared/infrastructure/utils/dependency-injection.js';
import { importNamedExportsFromDirectory } from '../../../shared/infrastructure/utils/import-named-exports-from-directory.js';
import { certificationCenterMembershipRepository } from '../../../team/infrastructure/repositories/certification-center-membership.repository.js';
import * as membershipRepository from '../../../team/infrastructure/repositories/membership.repository.js';
import * as candidatesApiRepository from '../../infrastructure/repositories/candidates-api.repository.js';
import * as learnersApiRepository from '../../infrastructure/repositories/learners-api.repository.js';
import * as userTeamsApiRepository from '../../infrastructure/repositories/user-teams-api.repository.js';

const path = dirname(fileURLToPath(import.meta.url));

const repositories = {
  authenticationMethodRepository,
  candidatesApiRepository,
  certificationCenterMembershipRepository,
  learnersApiRepository,
  membershipRepository,
  organizationLearnerRepository,
  refreshTokenRepository,
  resetPasswordDemandRepository,
  userAnonymizedEventLoggingJobRepository,
  userLoginRepository,
  userRepository,
  userTeamsApiRepository,
};

const usecasesWithoutInjectedDependencies = {
  ...(await importNamedExportsFromDirectory({ path: join(path, './'), ignoredFileNames: ['index.js'] })),
};

const dependencies = Object.assign({}, repositories);

const usecases = injectDependencies(usecasesWithoutInjectedDependencies, dependencies);

export { usecases };
