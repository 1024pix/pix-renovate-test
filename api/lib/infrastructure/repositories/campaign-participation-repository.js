const BookshelfCampaignParticipation = require('../orm-models/CampaignParticipation');
const CampaignParticipation = require('../../domain/models/CampaignParticipation');
const Campaign = require('../../domain/models/Campaign');
const Assessment = require('../../domain/models/Assessment');
const bookshelfToDomainConverter = require('../utils/bookshelf-to-domain-converter');
const { knex } = require('../../../db/knex-database-connection');
const { AlreadyExistingEntityError } = require('../../domain/errors');
const knexUtils = require('../utils/knex-utils');
const knowledgeElementRepository = require('./knowledge-element-repository');
const knowledgeElementSnapshotRepository = require('./knowledge-element-snapshot-repository');
const DomainTransaction = require('../DomainTransaction');

const _ = require('lodash');

const { SHARED, TO_SHARE, STARTED } = CampaignParticipation.statuses;

const ATTRIBUTES_TO_SAVE = [
  'createdAt',
  'participantExternalId',
  'sharedAt',
  'status',
  'campaignId',
  'userId',
  'validatedSkillsCount',
  'pixScore',
  'status',
  'masteryRate',
];

module.exports = {
  async get(id, domainTransaction = DomainTransaction.emptyTransaction()) {
    const campaignParticipation = await BookshelfCampaignParticipation.where({ id }).fetch({
      withRelated: ['campaign', 'assessments'],
      transacting: domainTransaction.knexTransaction,
    });
    return bookshelfToDomainConverter.buildDomainObject(BookshelfCampaignParticipation, campaignParticipation);
  },

  async save(campaignParticipation, domainTransaction = DomainTransaction.emptyTransaction()) {
    try {
      const knexConn = domainTransaction.knexTransaction || knex;
      const [newCampaignParticipation] = await knexConn('campaign-participations')
        .insert(_adaptModelToDb(campaignParticipation))
        .returning('*');

      return new CampaignParticipation(newCampaignParticipation);
    } catch (error) {
      if (knexUtils.isUniqConstraintViolated(error)) {
        const { userId, campaignId } = campaignParticipation;
        throw new AlreadyExistingEntityError(
          `A campaignParticipation already exists for the user ${userId} and campaign ${campaignId}.`
        );
      }
      throw error;
    }
  },

  async update(campaignParticipation, domainTransaction = DomainTransaction.emptyTransaction()) {
    const knexConn = domainTransaction.knexTransaction || knex;
    const attributes = _getAttributes(campaignParticipation);

    const updatedCampaignParticipation = await knexConn
      .from('campaign-participations')
      .where({ id: campaignParticipation.id })
      .update(attributes);

    return new CampaignParticipation(updatedCampaignParticipation);
  },

  async markPreviousParticipationsAsImproved(
    campaignId,
    userId,
    domainTransaction = DomainTransaction.emptyTransaction()
  ) {
    const knexConn = domainTransaction.knexTransaction || knex;
    return knexConn('campaign-participations').where({ campaignId, userId }).update({
      isImproved: true,
    });
  },

  async hasAlreadyParticipated(campaignId, userId, domainTransaction = DomainTransaction.emptyTransaction()) {
    const knexConn = domainTransaction.knexTransaction || knex;
    const { count } = await knexConn('campaign-participations').count('id').where({ campaignId, userId }).first();
    return count > 0;
  },

  async findParticipantExternalId(campaignId, userId, domainTransaction) {
    const campaignParticipation = await domainTransaction
      .knexTransaction('campaign-participations')
      .select('participantExternalId')
      .where({ campaignId, userId })
      .first();
    return campaignParticipation?.participantExternalId;
  },

  async findProfilesCollectionResultDataByCampaignId(campaignId) {
    const results = await knex
      .with('campaignParticipationWithUser', (qb) => {
        qb.select([
          'campaign-participations.*',
          'schooling-registrations.studentNumber',
          'schooling-registrations.division',
          'schooling-registrations.group',
          knex.raw('COALESCE ("schooling-registrations"."firstName", "users"."firstName") AS "firstName"'),
          knex.raw('COALESCE ("schooling-registrations"."lastName", "users"."lastName") AS "lastName"'),
        ])
          .from('campaign-participations')
          .leftJoin('users', 'campaign-participations.userId', 'users.id')
          .innerJoin('campaigns', 'campaign-participations.campaignId', 'campaigns.id')
          .leftJoin('schooling-registrations', function () {
            this.on({ 'campaign-participations.userId': 'schooling-registrations.userId' }).andOn({
              'campaigns.organizationId': 'schooling-registrations.organizationId',
            });
          })
          .where({ campaignId, isImproved: false });
      })
      .from('campaignParticipationWithUser');

    return results.map(_rowToResult);
  },

  findLatestOngoingByUserId(userId) {
    return BookshelfCampaignParticipation.query((qb) => {
      qb.innerJoin('campaigns', 'campaign-participations.campaignId', 'campaigns.id');
      qb.whereNull('campaigns.archivedAt');
      qb.orderBy('campaign-participations.createdAt', 'DESC');
    })
      .where({ userId })
      .fetchAll({
        required: false,
        withRelated: ['campaign', 'assessments'],
      })
      .then((campaignParticipations) =>
        bookshelfToDomainConverter.buildDomainObjects(BookshelfCampaignParticipation, campaignParticipations)
      );
  },

  async findOneByCampaignIdAndUserId({ campaignId, userId }) {
    const campaignParticipation = await BookshelfCampaignParticipation.where({
      campaignId,
      userId,
      isImproved: false,
    }).fetch({ require: false, withRelated: ['assessments'] });
    return bookshelfToDomainConverter.buildDomainObject(BookshelfCampaignParticipation, campaignParticipation);
  },

  async updateWithSnapshot(campaignParticipation, domainTransaction = DomainTransaction.emptyTransaction()) {
    await this.update(campaignParticipation, domainTransaction);

    const knowledgeElements = await knowledgeElementRepository.findUniqByUserId({
      userId: campaignParticipation.userId,
      limitDate: campaignParticipation.sharedAt,
      domainTransaction,
    });
    await knowledgeElementSnapshotRepository.save({
      userId: campaignParticipation.userId,
      snappedAt: campaignParticipation.sharedAt,
      knowledgeElements,
      domainTransaction,
    });
  },

  async countSharedParticipationOfCampaign(campaignId) {
    const { count } = await knex('campaign-participations')
      .count('id as count')
      .where('campaignId', campaignId)
      .where('status', SHARED)
      .first();

    return count;
  },

  async isAssessmentCompleted(campaignParticipationId) {
    const assessment = await knex('assessments')
      .select('state')
      .where({ campaignParticipationId })
      .orderBy('assessments.createdAt', 'desc')
      .first();

    if (assessment) {
      return assessment.state === Assessment.states.COMPLETED;
    }
    return false;
  },

  async isRetrying({ campaignParticipationId }) {
    const { id: campaignId, userId } = await knex('campaigns')
      .select('campaigns.id', 'userId')
      .join('campaign-participations', 'campaigns.id', 'campaignId')
      .where({ 'campaign-participations.id': campaignParticipationId })
      .first();

    const campaignParticipations = await knex('campaign-participations')
      .select('sharedAt', 'isImproved')
      .where({ campaignId, userId });

    return (
      campaignParticipations.length > 1 &&
      campaignParticipations.some((participation) => !participation.isImproved && !participation.sharedAt)
    );
  },

  async countParticipationsByStage(campaignId, stagesBoundaries) {
    const participationCounts = stagesBoundaries.map((boundary) => {
      const from = boundary.from / 100;
      const to = boundary.to / 100;
      return knex.raw(
        'COUNT("id") FILTER (WHERE "masteryRate" between ?? and ??) OVER (PARTITION BY "campaignId") AS ??',
        [from, to, String(boundary.id)]
      );
    });

    const result = await knex
      .select(participationCounts)
      .from('campaign-participations')
      .where('campaign-participations.campaignId', '=', campaignId)
      .where('campaign-participations.isImproved', '=', false)
      .limit(1);

    if (!result.length) return {};

    return result[0];
  },

  async countParticipationsByStatus(campaignId, campaignType) {
    const row = await knex('campaign-participations')
      .select([
        // eslint-disable-next-line knex/avoid-injections
        knex.raw(`sum(case when status = '${SHARED}' then 1 else 0 end) as shared`),
        // eslint-disable-next-line knex/avoid-injections
        knex.raw(`sum(case when status = '${TO_SHARE}' then 1 else 0 end) as completed`),
        // eslint-disable-next-line knex/avoid-injections
        knex.raw(`sum(case when status = '${STARTED}' then 1 else 0 end) as started`),
      ])
      .where({ campaignId, isImproved: false })
      .groupBy('campaignId')
      .first();

    return mapToParticipationByStatus(row, campaignType);
  },
};

function _adaptModelToDb(campaignParticipation) {
  return {
    campaignId: campaignParticipation.campaignId,
    participantExternalId: campaignParticipation.participantExternalId,
    userId: campaignParticipation.userId,
    status: campaignParticipation.status,
    schoolingRegistrationId: campaignParticipation.schoolingRegistrationId,
  };
}

function _rowToResult(row) {
  return {
    id: row.id,
    createdAt: new Date(row.createdAt),
    isShared: row.status === CampaignParticipation.statuses.SHARED,
    sharedAt: row.sharedAt ? new Date(row.sharedAt) : null,
    participantExternalId: row.participantExternalId,
    userId: row.userId,
    isCompleted: row.state === 'completed',
    studentNumber: row.studentNumber,
    participantFirstName: row.firstName,
    participantLastName: row.lastName,
    division: row.division,
    pixScore: row.pixScore,
    group: row.group,
  };
}

function _getAttributes(campaignParticipation) {
  return _.pick(campaignParticipation, ATTRIBUTES_TO_SAVE);
}

function mapToParticipationByStatus(row = {}, campaignType) {
  const participationByStatus = {
    shared: row.shared || 0,
    completed: row.completed || 0,
  };
  if (campaignType === Campaign.types.ASSESSMENT) {
    participationByStatus.started = row.started || 0;
  }
  return participationByStatus;
}
