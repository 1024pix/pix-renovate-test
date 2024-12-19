import { exit } from 'node:process';

import { CampaignParticipationStatuses } from '../../prescription/shared/domain/constants.js';
import { usecases } from '../../quest/domain/usecases/index.js';
import { isoDateParser } from '../../shared/application/scripts/parsers.js';
import { Script } from '../../shared/application/scripts/script.js';
import { ScriptRunner } from '../../shared/application/scripts/script-runner.js';
import { DomainTransaction } from '../../shared/domain/DomainTransaction.js';

export const PRODUCTION_SIXTH_GRADE_TARGET_PROFILE_IDS = [3652, 3739, 3740, 3923, 3924, 3925];

const options = {
  start: {
    type: 'string',
    describe: 'Date de début de la période à traiter, jour inclus, format "YYYY-MM-DD", (ex: "2024-01-20")',
    demandOption: false,
    requiresArg: true,
    coerce: isoDateParser(),
  },
  end: {
    type: 'string',
    describe: 'Date de fin de la période à traiter, jour inclus, format "YYYY-MM-DD", (ex: "2024-02-27")',
    demandOption: true,
    requiresArg: true,
    coerce: isoDateParser(),
  },
};

/**
 * Script to reward sixth-grade students who have already completed a campaign linked to a specific target profile.
 */
export class SixthGradeAttestationRewardScript extends Script {
  constructor() {
    super({
      description:
        'This script process attestations rewards for users who have already completed a campaign linked to specific target profiles.',
      permanent: false,
      options,
    });
  }

  /**
   * Handles the core logic of the script.
   *
   * @param {{start: Date, end: Date, limit: number}} options
   * @param {{info: function}} logger
   * @param {function} rewardUser
   *
   * @returns {Promise<void>}
   */
  async handle({ options, logger, rewardUser = usecases.rewardUser }) {
    this.checkEndDateBeforeStartDate(options.start, options.end);

    const users = await this.fetchUserIds(options.start, options.end);

    if (users.length === 0) {
      logger.info('No user found');
      return;
    }

    logger.info(`${users.length} users found`);

    for (const userId of users) {
      logger.info(`Processing user ${userId}`);
      await rewardUser({
        userId,
      });
    }
  }

  /**
   * Fetch the userIDs of the users who have already completed a campaign linked to the specified target profiles.
   *
   * @param {Date} startDate
   * @param {Date} endDate
   *
   * @returns {Promise<[number]>}
   */
  async fetchUserIds(startDate, endDate) {
    const knexConnection = DomainTransaction.getConnection();

    const formatedStartDate = startDate.toISOString().split('T')[0];

    endDate.setDate(endDate.getDate() + 1);
    const formatedEndDate = endDate.toISOString().split('T')[0];

    const users = await knexConnection('campaign-participations')
      .distinct('campaign-participations.userId')
      .join('campaigns', 'campaign-participations.campaignId', 'campaigns.id')
      .join('target-profiles', 'campaigns.targetProfileId', 'target-profiles.id')
      .where('campaign-participations.createdAt', '>=', formatedStartDate)
      .where('campaign-participations.createdAt', '<=', formatedEndDate)
      .where('campaign-participations.status', '<>', CampaignParticipationStatuses.STARTED)
      .whereIn('campaigns.targetProfileId', PRODUCTION_SIXTH_GRADE_TARGET_PROFILE_IDS);

    return users.map(({ userId }) => userId);
  }

  /**
   * Check if the end date is before the start date.
   *
   * @param {Date} startDate
   * @param {Date} endDate
   */
  checkEndDateBeforeStartDate(startDate, endDate) {
    if (endDate < startDate) {
      throw new Error('The end date must be greater than the start date');
    }
  }

  /**
   * Called when the script has finished.
   */
  onFinished() {
    exit();
  }
}

await ScriptRunner.execute(import.meta.url, SixthGradeAttestationRewardScript);
