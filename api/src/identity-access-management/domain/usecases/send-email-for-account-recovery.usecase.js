import { cryptoService } from '../../../shared/domain/services/crypto-service.js';
import { AccountRecoveryDemand } from '../models/AccountRecoveryDemand.js';

/**
 * @param {{
 *   studentInformation: Object,
 *   temporaryKey: string,
 *   accountRecoveryDemandRepository: AccountRecoveryDemandRepository,
 *   organizationLearnerRepository: OrganizationLearnerRepository,
 *   userRepository: UserRepository,
 *   mailService: MailService,
 *   scoAccountRecoveryService: ScoAccountRecoveryService,
 *   userReconciliationService: UserReconciliationService,
 * }} params
 * @return {Promise<void>}
 */
export const sendEmailForAccountRecovery = async function ({
  studentInformation,
  temporaryKey,
  organizationLearnerRepository,
  userRepository,
  accountRecoveryDemandRepository,
  mailService,
  scoAccountRecoveryService,
  userReconciliationService,
}) {
  const { email: newEmail } = studentInformation;
  let encodedTemporaryKey;
  if (temporaryKey) {
    encodedTemporaryKey = temporaryKey;
  } else {
    const randomBytesBuffer = await cryptoService.randomBytes(32);
    encodedTemporaryKey = randomBytesBuffer.toString('hex');
  }

  const {
    firstName,
    id,
    userId,
    email: oldEmail,
  } = await scoAccountRecoveryService.retrieveOrganizationLearner({
    studentInformation,
    accountRecoveryDemandRepository,
    organizationLearnerRepository,
    userRepository,
    userReconciliationService,
  });

  await userRepository.checkIfEmailIsAvailable(newEmail);

  const accountRecoveryDemand = new AccountRecoveryDemand({
    userId,
    organizationLearnerId: id,
    newEmail,
    oldEmail,
    used: false,
    temporaryKey: encodedTemporaryKey,
  });
  await accountRecoveryDemandRepository.save(accountRecoveryDemand);

  await mailService.sendAccountRecoveryEmail({
    firstName,
    email: newEmail,
    temporaryKey: encodedTemporaryKey,
  });
};
