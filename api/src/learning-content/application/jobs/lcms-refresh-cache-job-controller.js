import { JobController } from '../../../shared/application/jobs/job-controller.js';
import { logger, SCOPES } from '../../../shared/infrastructure/utils/logger.js';
import { LcmsRefreshCacheJob } from '../../domain/models/LcmsRefreshCacheJob.js';
import { usecases } from '../../domain/usecases/index.js';

export class LcmsRefreshCacheJobController extends JobController {
  constructor() {
    super(LcmsRefreshCacheJob.name);
  }

  async handle() {
    try {
      await usecases.refreshLearningContentCache();
      logger.info({ event: SCOPES.LEARNING_CONTENT }, 'Learning Content refreshed');
    } catch (e) {
      logger.error({ err: e, event: SCOPES.LEARNING_CONTENT }, 'Error while refreshing cache');
      throw e;
    }
  }
}
