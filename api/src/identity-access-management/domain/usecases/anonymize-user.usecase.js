import { withTransaction } from '../../../shared/domain/DomainTransaction.js';
import { UserNotFoundError } from '../../../shared/domain/errors.js';

/**
 * @param params
 * @param{string} params.userId
 * @param{string} params.updatedByUserId
 * @param{AdminMemberRepository} params.adminMemberRepository
 * @returns {Promise<null>}
 */
const anonymizeUser = withTransaction(async function ({
  userId,
  updatedByUserId,
  adminMemberRepository,
  privacyUsersApiRepository,
}) {
  const anonymizedBy = await _getAdminUser({
    adminUserId: updatedByUserId,
    adminMemberRepository,
  });

  const anonymizedByUserId = updatedByUserId;
  const anonymizedByUserRole = anonymizedBy.role;
  const client = 'PIX_ADMIN';

  await privacyUsersApiRepository.anonymizeUser({ userId, anonymizedByUserId, anonymizedByUserRole, client });
});

async function _getAdminUser({ adminUserId, adminMemberRepository }) {
  const admin = await adminMemberRepository.get({ userId: adminUserId });
  if (!admin) {
    throw new UserNotFoundError(`Admin not found for id: ${adminUserId}`);
  }
  return admin;
}

export { anonymizeUser };
