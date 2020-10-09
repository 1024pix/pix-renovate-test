const faker = require('faker');
const CertificationResult = require('../../../../lib/domain/models/CertificationResult');
const { statuses: cleaStatuses } = require('../../../../lib/infrastructure/repositories/clea-certification-status-repository');
const { status: assessmentStatuses } = require('../../../../lib/domain/models/AssessmentResult');

module.exports = function buildCertificationResult({
  id = faker.random.uuid(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  birthplace = faker.address.city(),
  birthdate = faker.date.past(),
  externalId = faker.random.number(),
  completedAt = faker.date.past(),
  createdAt = faker.date.past(),
  resultCreatedAt = faker.date.past(),
  isPublished = faker.random.boolean(),
  isV2Certification = true,
  cleaCertificationStatus = faker.random.objectElement(cleaStatuses),
  pixScore = faker.random.number(500),
  status = faker.random.objectElement(assessmentStatuses),
  emitter = faker.name.firstName(),
  commentForCandidate = faker.lorem.sentences(),
  commentForJury = faker.lorem.sentences(),
  commentForOrganization = faker.lorem.sentences(),
  competencesWithMark = [],
  examinerComment = faker.lorem.sentences(),
  hasSeenEndTestScreen = faker.random.boolean(),
  assessmentId,
  juryId,
  sessionId,
} = {}) {
  return new CertificationResult({
    id,
    firstName,
    lastName,
    birthdate,
    birthplace,
    externalId,
    completedAt,
    pixScore,
    createdAt,
    resultCreatedAt,
    isPublished,
    isV2Certification,
    cleaCertificationStatus,
    status,
    emitter,
    commentForCandidate,
    commentForJury,
    commentForOrganization,
    competencesWithMark,
    examinerComment,
    hasSeenEndTestScreen,
    assessmentId,
    juryId,
    sessionId,
  });
};
