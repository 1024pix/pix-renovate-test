import { Serializer } from 'jsonapi-serializer';

import * as certificationCandidateSerializer from '../../shared/infrastructure/serializers/jsonapi/certification-candidate-serializer.js';
import { usecases } from '../domain/usecases/index.js';
import * as sessionCertificationCandidateSerializer from '../infrastructure/serializers/certification-candidate-serializer.js';

const addCandidate = async function (request, h, dependencies = { certificationCandidateSerializer }) {
  const sessionId = request.params.id;
  const certificationCandidate = await dependencies.certificationCandidateSerializer.deserialize(request.payload);
  const complementaryCertification = _getSubscriptionParameter(request) ?? null;
  const certificationCandidateId = await usecases.addCertificationCandidateToSession({
    sessionId,
    certificationCandidate,
    complementaryCertification,
  });

  return h
    .response(new Serializer('certification-candidate', {}).serialize({ id: certificationCandidateId }))
    .created();
};

const getCandidate = async function (request, h, dependencies = { sessionCertificationCandidateSerializer }) {
  const sessionId = request.params.id;

  const certificationCandidates = await usecases.getSessionCertificationCandidates({ sessionId });
  return dependencies.sessionCertificationCandidateSerializer.serialize(certificationCandidates);
};

const deleteCandidate = async function (request) {
  const certificationCandidateId = request.params.certificationCandidateId;

  await usecases.deleteUnlinkedCertificationCandidate({ certificationCandidateId });

  return null;
};

const _getSubscriptionParameter = (request) => {
  const { attributes } = request.payload.data;
  return attributes['subscription'] ?? attributes['complementary-certification'];
};

const certificationCandidateController = {
  addCandidate,
  getCandidate,
  deleteCandidate,
};
export { certificationCandidateController };
