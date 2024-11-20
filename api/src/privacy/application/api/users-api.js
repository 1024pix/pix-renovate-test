import { usecases } from '../../domain/usecases/index.js';

/**
 * Determines if a user can self-delete their account.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.userId - The ID of the user.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the user can self-delete their account.
 */
export const canSelfDeleteAccount = async ({ userId }) => {
  return usecases.canSelfDeleteAccount({ userId });
};
