import _ from 'lodash';

import { knex } from '../../../../../db/knex-database-connection.js';
import { PGSQL_UNIQUE_CONSTRAINT_VIOLATION_ERROR } from '../../../../../db/pgsql-errors.js';
import {
  CertificationCandidateCreationOrUpdateError,
  CertificationCandidateMultipleUserLinksWithinSessionError,
  NotFoundError,
} from '../../../../../lib/domain/errors.js';
import { CertificationCandidate } from '../../../../../lib/domain/models/CertificationCandidate.js';
import { DomainTransaction } from '../../../../../lib/infrastructure/DomainTransaction.js';
import { BookshelfCertificationCandidate } from '../../../../../lib/infrastructure/orm-models/CertificationCandidate.js';
import * as bookshelfToDomainConverter from '../../../../../lib/infrastructure/utils/bookshelf-to-domain-converter.js';
import { normalize } from '../../../../shared/infrastructure/utils/string-utils.js';
import { CertificationCandidateCompanion } from '../../domain/models/CertificationCandidateCompanion.js';
import { ComplementaryCertification } from '../../domain/models/ComplementaryCertification.js';
import { Subscription } from '../../domain/models/Subscription.js';

const linkToUser = async function ({ id, userId }) {
  try {
    const certificationCandidateBookshelf = new BookshelfCertificationCandidate({ id });
    await certificationCandidateBookshelf.save({ userId }, { patch: true, method: 'update' });
  } catch (bookshelfError) {
    if (bookshelfError.code === PGSQL_UNIQUE_CONSTRAINT_VIOLATION_ERROR) {
      throw new CertificationCandidateMultipleUserLinksWithinSessionError(
        'A user cannot be linked to several certification candidates within the same session',
      );
    }
    throw new CertificationCandidateCreationOrUpdateError(
      'An error occurred while linking the certification candidate to a user',
    );
  }
};

const saveInSession = async function ({
  certificationCandidate,
  sessionId,
  domainTransaction = DomainTransaction.emptyTransaction(),
}) {
  const certificationCandidateDataToSave = _adaptModelToDb(certificationCandidate);
  const knexTransaction = domainTransaction?.knexTransaction
    ? domainTransaction.knexTransaction
    : await knex.transaction();

  const [{ id: certificationCandidateId }] = await knexTransaction('certification-candidates')
    .insert({ ...certificationCandidateDataToSave, sessionId })
    .returning('id');

  for (const subscription of certificationCandidate.subscriptions) {
    await knexTransaction('certification-subscriptions').insert({
      certificationCandidateId,
      type: subscription.type,
      complementaryCertificationId: subscription.complementaryCertificationId,
    });
  }

  if (!domainTransaction?.knexTransaction) {
    await knexTransaction.commit();
  }

  return certificationCandidateId;
};

const remove = async function ({ id }) {
  await knex.transaction(async (trx) => {
    await trx('certification-subscriptions').where({ certificationCandidateId: id }).del();
    return trx('certification-candidates').where({ id }).del();
  });

  return true;
};

const isNotLinked = async function ({ id }) {
  const notLinkedCandidate = await BookshelfCertificationCandidate.where({
    id,
    userId: null,
  }).fetch({ require: false, columns: ['id'] });

  return !!notLinkedCandidate;
};

const getBySessionIdAndUserId = async function ({ sessionId, userId }) {
  const certificationCandidate = await _candidateBaseQuery().where({ sessionId, userId }).first();
  return certificationCandidate ? _toDomain(certificationCandidate) : undefined;
};

const findBySessionId = async function (sessionId) {
  const results = await _candidateBaseQuery()
    .where({ 'certification-candidates.sessionId': sessionId })
    .orderByRaw('LOWER("certification-candidates"."lastName") asc')
    .orderByRaw('LOWER("certification-candidates"."firstName") asc');
  return results.map(_toDomain);
};

const findBySessionIdAndPersonalInfo = async function ({ sessionId, firstName, lastName, birthdate }) {
  const results = await _candidateBaseQuery().where({ sessionId, birthdate });
  const certificationCandidates = results.map(_toDomain);

  const normalizedInputNames = {
    lastName: normalize(lastName),
    firstName: normalize(firstName),
  };
  return _.filter(certificationCandidates, (certificationCandidate) => {
    const certificationCandidateNormalizedNames = {
      lastName: normalize(certificationCandidate.lastName),
      firstName: normalize(certificationCandidate.firstName),
    };
    return _.isEqual(normalizedInputNames, certificationCandidateNormalizedNames);
  });
};

const findOneBySessionIdAndUserId = function ({ sessionId, userId }) {
  return BookshelfCertificationCandidate.where({ sessionId, userId })
    .fetchAll()
    .then((results) => _buildCertificationCandidates(results)[0]);
};

const doesLinkedCertificationCandidateInSessionExist = async function ({ sessionId }) {
  const anyLinkedCandidateInSession = await BookshelfCertificationCandidate.query({
    where: { sessionId },
    whereNotNull: 'userId',
  }).fetch({ require: false, columns: 'id' });

  return anyLinkedCandidateInSession !== null;
};

const update = async function (certificationCandidate) {
  const result = await knex('certification-candidates')
    .where({ id: certificationCandidate.id })
    .update({ authorizedToStart: certificationCandidate.authorizedToStart });

  if (result === 0) {
    throw new NotFoundError('Aucun candidat trouvé');
  }
};

const deleteBySessionId = async function ({ sessionId, domainTransaction = DomainTransaction.emptyTransaction() }) {
  const knexConn = domainTransaction.knexTransaction ?? knex;
  await knexConn('certification-subscriptions')
    .whereIn('certificationCandidateId', knexConn.select('id').from('certification-candidates').where({ sessionId }))
    .del();

  await knexConn('certification-candidates').where({ sessionId }).del();
};

const getWithComplementaryCertification = async function (id) {
  const candidateData = await _candidateBaseQuery().where('certification-candidates.id', id).first();

  if (!candidateData) {
    throw new NotFoundError('Candidate not found');
  }

  return _toDomain(candidateData);
};

const findCertificationCandidateCompanionInfoByUserId = async function ({ userId }) {
  const result = await knex.select('sessionId', 'id').from('certification-candidates').where({ userId }).first();
  if (!result) {
    return undefined;
  }

  return new CertificationCandidateCompanion(result);
};

export {
  deleteBySessionId,
  doesLinkedCertificationCandidateInSessionExist,
  findBySessionId,
  findBySessionIdAndPersonalInfo,
  findCertificationCandidateCompanionInfoByUserId,
  findOneBySessionIdAndUserId,
  getBySessionIdAndUserId,
  getWithComplementaryCertification,
  isNotLinked,
  linkToUser,
  remove,
  saveInSession,
  update,
};

function _buildCertificationCandidates(results) {
  if (results?.models[0]) {
    results.models.forEach((model, index) => {
      results.models[index].attributes.organizationLearnerId = model.attributes.organizationLearnerId;
    });
  }

  return bookshelfToDomainConverter.buildDomainObjects(BookshelfCertificationCandidate, results);
}

function _adaptModelToDb(certificationCandidateToSave) {
  return {
    authorizedToStart: certificationCandidateToSave.authorizedToStart,
    billingMode: certificationCandidateToSave.billingMode,
    birthCity: certificationCandidateToSave.birthCity,
    birthCountry: certificationCandidateToSave.birthCountry,
    birthINSEECode: certificationCandidateToSave.birthINSEECode,
    birthPostalCode: certificationCandidateToSave.birthPostalCode,
    birthProvinceCode: certificationCandidateToSave.birthProvinceCode,
    birthdate: certificationCandidateToSave.birthdate,
    email: certificationCandidateToSave.email,
    externalId: certificationCandidateToSave.externalId,
    extraTimePercentage: certificationCandidateToSave.extraTimePercentage,
    firstName: certificationCandidateToSave.firstName,
    lastName: certificationCandidateToSave.lastName,
    prepaymentCode: certificationCandidateToSave.prepaymentCode,
    resultRecipientEmail: certificationCandidateToSave.resultRecipientEmail,
    organizationLearnerId: certificationCandidateToSave.organizationLearnerId,
    sex: certificationCandidateToSave.sex,
  };
}

/**
 * @deprecated migration: new ComplementaryCertification(...) should not be done here
 * it should come from internal API complementary-certification bounded context.
 * Please beware of that when refactoring this code in the future
 */
function _toDomain(candidateData) {
  return new CertificationCandidate({
    ...candidateData,
    subscriptions: [Subscription.buildCore({ id: candidateData.certificationCandidateId })],
    complementaryCertification: candidateData.complementaryCertificationId
      ? new ComplementaryCertification({
          id: candidateData.complementaryCertificationId,
          key: candidateData.complementaryCertificationKey,
          label: candidateData.complementaryCertificationLabel,
        })
      : null,
  });
}

function _candidateBaseQuery() {
  return knex
    .select({
      certificationCandidate: 'certification-candidates.*',
      complementaryCertificationId: 'complementary-certifications.id',
      complementaryCertificationKey: 'complementary-certifications.key',
      complementaryCertificationLabel: 'complementary-certifications.label',
    })
    .from('certification-candidates')
    .leftJoin('certification-subscriptions', (builder) =>
      builder
        .on('certification-candidates.id', '=', 'certification-subscriptions.certificationCandidateId')
        .onNotNull('certification-subscriptions.complementaryCertificationId'),
    )
    .leftJoin(
      'complementary-certifications',
      'certification-subscriptions.complementaryCertificationId',
      'complementary-certifications.id',
    )
    .groupBy('certification-candidates.id', 'complementary-certifications.id');
}
