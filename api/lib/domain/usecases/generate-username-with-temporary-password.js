import lodash from 'lodash';

const { isEmpty } = lodash;

import { UserNotAuthorizedToGenerateUsernamePasswordError } from '../../../src/shared/domain/errors.js';

const generateUsernameWithTemporaryPassword = async function ({
  organizationLearnerId,
  organizationId,
  passwordGenerator,
  cryptoService,
  userReconciliationService,
  userService,
  authenticationMethodRepository,
  userRepository,
  prescriptionOrganizationLearnerRepository,
}) {
  const organizationLearner = await prescriptionOrganizationLearnerRepository.getLearnerInfo(organizationLearnerId);
  _checkIfStudentHasAccessToOrganization(organizationLearner, organizationId);

  const studentAccount = await userRepository.get(organizationLearner.userId);
  _checkIfStudentAccountAlreadyHasUsername(studentAccount);

  const username = await userReconciliationService.createUsernameByUser({
    user: organizationLearner,
    userRepository,
  });

  const hasStudentAccountAnIdentityProviderPIX = await authenticationMethodRepository.hasIdentityProviderPIX({
    userId: studentAccount.id,
  });

  if (hasStudentAccountAnIdentityProviderPIX) {
    const updatedUser = await userRepository.updateUsername({ id: studentAccount.id, username });
    return { username: updatedUser.username };
  } else {
    const generatedPassword = passwordGenerator.generateSimplePassword();
    const hashedPassword = await cryptoService.hashPassword(generatedPassword);

    // and Create Password
    await userService.updateUsernameAndAddPassword({
      userId: studentAccount.id,
      username,
      hashedPassword,
      authenticationMethodRepository,
      userRepository,
    });

    return { username, generatedPassword, organizationLearnerId };
  }
};

export { generateUsernameWithTemporaryPassword };

function _checkIfStudentHasAccessToOrganization(organizationLearner, organizationId) {
  if (organizationLearner.organizationId !== organizationId) {
    throw new UserNotAuthorizedToGenerateUsernamePasswordError(
      `L'élève avec l'INE ${organizationLearner.nationalStudentId} n'appartient pas à l'organisation.`,
    );
  }
}

function _checkIfStudentAccountAlreadyHasUsername(studentAccount) {
  if (!isEmpty(studentAccount.username)) {
    throw new UserNotAuthorizedToGenerateUsernamePasswordError(
      `Ce compte utilisateur dispose déjà d'un identifiant: ${studentAccount.username}.`,
    );
  }
}
