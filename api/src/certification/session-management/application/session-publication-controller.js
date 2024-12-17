import { SessionPublicationBatchError } from '../../../shared/application/http-errors.js';
import { logger } from '../../../shared/infrastructure/utils/logger.js';
import { usecases } from '../domain/usecases/index.js';
import * as sessionManagementSerializer from '../infrastructure/serializers/session-serializer.js';

const publish = async function (request, h, dependencies = { sessionManagementSerializer }) {
  const sessionId = request.params.id;
  const i18n = request.i18n;

  const session = await usecases.publishSession({ sessionId, i18n });

  return dependencies.sessionManagementSerializer.serialize({ session });
};

const unpublish = async function (request, h, dependencies = { sessionManagementSerializer }) {
  const sessionId = request.params.sessionId;

  const session = await usecases.unpublishSession({ sessionId });

  return dependencies.sessionManagementSerializer.serialize({ session });
};

const publishInBatch = async function (request, h) {
  const sessionIds = request.payload.data.attributes.ids;
  const i18n = request.i18n;

  const result = await usecases.publishSessionsInBatch({
    sessionIds,
    i18n,
  });
  if (result.hasPublicationErrors()) {
    _logSessionBatchPublicationErrors(result);
    throw new SessionPublicationBatchError(result.batchId);
  }
  return h.response().code(204);
};

export const sessionPublicationController = {
  publish,
  unpublish,
  publishInBatch,
};

function _logSessionBatchPublicationErrors(result) {
  logger.warn(`One or more error occurred when publishing session in batch ${result.batchId}`);

  const sessionAndError = result.publicationErrors;
  for (const sessionId in sessionAndError) {
    logger.warn(
      {
        batchId: result.batchId,
        sessionId,
      },
      sessionAndError[sessionId].message,
    );
  }
}
