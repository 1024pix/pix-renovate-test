import { JobController } from '../../../shared/application/jobs/job-controller.js';
import { logger, SCOPES } from '../../../shared/infrastructure/utils/logger.js';
import { LcmsCreateReleaseJob } from '../../domain/models/LcmsCreateReleaseJob.js';
import { usecases } from '../../domain/usecases/index.js';

export class LcmsCreateReleaseJobController extends JobController {
  constructor() {
    super(LcmsCreateReleaseJob.name);
  }

  async handle() {
    try {
      await usecases.createLearningContentRelease();
      logger.info({ event: SCOPES.LEARNING_CONTENT }, 'Learning Content cache updated with newly created release');
    } catch (e) {
      logger.error({ err: e, event: SCOPES.LEARNING_CONTENT }, 'Error while updating cache with newly created release');
      throw e;
    }
  }
}
