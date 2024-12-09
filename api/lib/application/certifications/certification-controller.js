import * as events from '../../domain/events/index.js';
import { usecases } from '../../domain/usecases/index.js';

const deneutralizeChallenge = async function (request, h, dependencies = { events }) {
  const challengeRecId = request.payload.data.attributes.challengeRecId;
  const certificationCourseId = request.payload.data.attributes.certificationCourseId;
  const juryId = request.auth.credentials.userId;
  const event = await usecases.deneutralizeChallenge({
    challengeRecId,
    certificationCourseId,
    juryId,
  });
  await dependencies.events.eventDispatcher.dispatch(event);
  return h.response().code(204);
};

const certificationController = {
  deneutralizeChallenge,
};

export { certificationController };
