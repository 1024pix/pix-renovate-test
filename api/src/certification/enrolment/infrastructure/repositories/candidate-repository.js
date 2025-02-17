import { knex } from '../../../../../db/knex-database-connection.js';
import { DomainTransaction } from '../../../../shared/domain/DomainTransaction.js';
import { CertificationCandidateNotFoundError } from '../../domain/errors.js';
import { Candidate } from '../../domain/models/Candidate.js';
import { Subscription } from '../../domain/models/Subscription.js';

/**
 * @function
 * @param {Candidate} params
 * @param {number} params.certificationCandidateId
 *
 * @return {Candidate}
 */
export async function get({ certificationCandidateId }) {
  const candidateData = await buildBaseReadQuery(knex)
    .where({ 'certification-candidates.id': certificationCandidateId })
    .first();

  if (!candidateData) return null;
  return toDomain(candidateData);
}

/**
 * @function
 * @param {Object} params
 * @param {number} params.sessionId
 *
 * @return {Array<Candidate>}
 */
export async function findBySessionId({ sessionId }) {
  const candidatesData = await buildBaseReadQuery(knex)
    .where({ 'certification-candidates.sessionId': sessionId })
    .orderBy('certification-candidates.id');

  return candidatesData.map(toDomain);
}

/**
 * @function
 * @param {Object} params
 * @param {number} params.userId
 *
 * @return {Promise<Array<Candidate>>}
 */
export async function findByUserId({ userId }) {
  const knexTransaction = DomainTransaction.getConnection();
  const candidatesData = await buildBaseReadQuery(knexTransaction).where({ 'certification-candidates.userId': userId });
  return candidatesData.map(toDomain);
}

/**
 * @function
 * @param {Object} candidate
 *
 * @throws {CertificationCandidateNotFoundError} Certification candidate not found
 */
export async function update(candidate) {
  const candidateDataToSave = adaptModelToDb(candidate);
  const knexConn = DomainTransaction.getConnection();

  const [updatedCertificationCandidate] = await knexConn('certification-candidates')
    .where({
      id: candidate.id,
    })
    .update(candidateDataToSave)
    .returning('*');

  if (!updatedCertificationCandidate) {
    throw new CertificationCandidateNotFoundError();
  }

  await knexConn('certification-subscriptions').where({ certificationCandidateId: candidate.id }).del();
  for (const subscription of candidate.subscriptions) {
    await knexConn('certification-subscriptions').insert({
      certificationCandidateId: candidate.id,
      type: subscription.type,
      complementaryCertificationId: subscription.complementaryCertificationId,
    });
  }
}

/**
 * @function
 * @param {Object} candidate
 *
 * @return {number}
 */
export async function insert(candidate) {
  const candidateDataToSave = adaptModelToDb(candidate);
  const knexTransaction = DomainTransaction.getConnection();

  const [{ id: candidateId }] = await knexTransaction('certification-candidates')
    .insert(candidateDataToSave)
    .returning('id');

  for (const subscription of candidate.subscriptions) {
    await knexTransaction('certification-subscriptions').insert({
      certificationCandidateId: candidateId,
      type: subscription.type,
      complementaryCertificationId: subscription.complementaryCertificationId,
    });
  }

  return candidateId;
}

/**
 * @function
 * @param sessionId
 * @returns {Promise<void>}
 */
export async function deleteBySessionId({ sessionId }) {
  const knexConn = DomainTransaction.getConnection();
  await knexConn('certification-subscriptions')
    .whereIn('certificationCandidateId', knexConn.select('id').from('certification-candidates').where({ sessionId }))
    .del();

  await knexConn('certification-candidates').where({ sessionId }).del();
}

/**
 * @function
 * @param candidate
 * @param sessionId
 * @returns {number} return saved candidate id
 */
export async function saveInSession({ candidate, sessionId }) {
  const candidateDataToSave = adaptModelToDb(candidate);
  const knexTransaction = DomainTransaction.getConnection();

  const [{ id: certificationCandidateId }] = await knexTransaction('certification-candidates')
    .insert({ ...candidateDataToSave, sessionId })
    .returning('id');

  for (const subscription of candidate.subscriptions) {
    await knexTransaction('certification-subscriptions').insert({
      certificationCandidateId,
      type: subscription.type,
      complementaryCertificationId: subscription.complementaryCertificationId,
    });
  }

  return certificationCandidateId;
}

/**
 * @function
 * @param id
 * @returns {boolean}
 */
export async function remove({ id }) {
  await knex.transaction(async (trx) => {
    await trx('certification-subscriptions').where({ certificationCandidateId: id }).del();
    return trx('certification-candidates').where({ id }).del();
  });

  return true;
}

function buildBaseReadQuery(knexConnection) {
  return knexConnection('certification-candidates')
    .select('certification-candidates.*')
    .select({
      subscriptions: knex.raw(
        `json_agg(
          json_build_object(
            'type', "certification-subscriptions"."type",
            'complementaryCertificationId', "certification-subscriptions"."complementaryCertificationId",
            'certificationCandidateId', "certification-candidates"."id"
          ) ORDER BY type
      )`,
      ),
    })
    .from('certification-candidates')
    .join(
      'certification-subscriptions',
      'certification-subscriptions.certificationCandidateId',
      'certification-candidates.id',
    )
    .groupBy('certification-candidates.id');
}

function adaptModelToDb(candidate) {
  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    sex: candidate.sex,
    birthPostalCode: candidate.birthPostalCode,
    birthINSEECode: candidate.birthINSEECode,
    birthCity: candidate.birthCity,
    birthProvinceCode: candidate.birthProvinceCode,
    birthCountry: candidate.birthCountry,
    email: candidate.email,
    resultRecipientEmail: candidate.resultRecipientEmail,
    externalId: candidate.externalId,
    birthdate: candidate.birthdate,
    extraTimePercentage: candidate.extraTimePercentage,
    authorizedToStart: candidate.authorizedToStart,
    sessionId: candidate.sessionId,
    userId: candidate.userId,
    reconciledAt: candidate.reconciledAt,
    organizationLearnerId: candidate.organizationLearnerId,
    billingMode: candidate.billingMode,
    prepaymentCode: candidate.prepaymentCode,
    hasSeenCertificationInstructions: candidate.hasSeenCertificationInstructions,
    accessibilityAdjustmentNeeded: candidate.accessibilityAdjustmentNeeded,
  };
}

function toDomain(candidateData) {
  const subscriptions = candidateData.subscriptions.map((subscription) => new Subscription(subscription));
  return new Candidate({
    ...candidateData,
    subscriptions,
  });
}
