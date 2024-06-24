import { CertificationCandidate } from '../../../../lib/domain/models/CertificationCandidate.js';
import { domainBuilder } from '../domain-builder.js';

const buildCertificationCandidate = function ({
  id = 123,
  firstName = 'Poison',
  lastName = 'Ivy',
  sex = 'F',
  birthPostalCode = null,
  birthINSEECode = '75101',
  birthCity = 'Perpignan',
  birthProvinceCode = '66',
  birthCountry = 'France',
  email = 'poison.ivy@example.net',
  resultRecipientEmail = 'napoleon@example.net',
  birthdate = '1990-05-06',
  extraTimePercentage = 0.3,
  externalId = 'externalId',
  createdAt = new Date('2020-01-01'),
  authorizedToStart,
  sessionId = 456,
  userId = 789,
  organizationLearnerId,
  complementaryCertification = null,
  billingMode = null,
  prepaymentCode = null,
  subscriptions = [domainBuilder.buildCoreSubscription({ certificationCandidateId: 123 })],
} = {}) {
  return new CertificationCandidate({
    id,
    firstName,
    lastName,
    sex,
    birthPostalCode,
    birthINSEECode,
    birthCity,
    birthProvinceCode,
    birthCountry,
    email,
    resultRecipientEmail,
    birthdate,
    sessionId,
    externalId,
    extraTimePercentage,
    createdAt,
    authorizedToStart,
    userId,
    organizationLearnerId,
    complementaryCertification,
    billingMode,
    prepaymentCode,
    subscriptions,
  });
};

buildCertificationCandidate.pro = function ({
  id = 123,
  firstName = 'Poison',
  lastName = 'Ivy',
  sex = 'F',
  birthPostalCode = '75001',
  birthINSEECode = '',
  birthCity = 'Perpignan',
  birthProvinceCode = '66',
  birthCountry = 'France',
  email = 'poison.ivy@example.net',
  resultRecipientEmail = 'napoleon@example.net',
  birthdate = '1990-05-06',
  extraTimePercentage = 0.3,
  externalId = 'externalId',
  authorizedToStart,
  sessionId = 456,
  complementaryCertification = null,
  billingMode = 'FREE',
  subscriptions = [],
}) {
  return new CertificationCandidate({
    id,
    firstName,
    lastName,
    sex,
    birthPostalCode,
    birthINSEECode,
    birthCity,
    birthProvinceCode,
    birthCountry,
    email,
    resultRecipientEmail,
    birthdate,
    sessionId,
    externalId,
    extraTimePercentage,
    authorizedToStart,
    complementaryCertification,
    billingMode,
    subscriptions,
  });
};

buildCertificationCandidate.notPersisted = function ({
  firstName = 'Poison',
  lastName = 'Ivy',
  sex = 'F',
  birthPostalCode = '75001',
  birthINSEECode = '75101',
  birthCity = 'Perpignan',
  birthProvinceCode = '66',
  birthCountry = 'France',
  email = 'poison.ivy@example.net',
  resultRecipientEmail = 'napoleon@example.net',
  birthdate = '1990-05-06',
  extraTimePercentage = 0.3,
  externalId = 'externalId',
  authorizedToStart,
  sessionId = 456,
  complementaryCertification = null,
  subscriptions = null,
}) {
  return new CertificationCandidate({
    firstName,
    lastName,
    sex,
    birthPostalCode,
    birthINSEECode,
    birthCity,
    birthProvinceCode,
    birthCountry,
    email,
    resultRecipientEmail,
    birthdate,
    sessionId,
    externalId,
    extraTimePercentage,
    authorizedToStart,
    complementaryCertification,
    subscriptions,
  });
};

export { buildCertificationCandidate };
