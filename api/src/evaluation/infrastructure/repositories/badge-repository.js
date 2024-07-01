import omit from 'lodash/omit.js';

import { knex } from '../../../../db/knex-database-connection.js';
import { DomainTransaction } from '../../../shared/domain/DomainTransaction.js';
import { AlreadyExistingEntityError, NotFoundError } from '../../../shared/domain/errors.js';
import * as knexUtils from '../../../shared/infrastructure/utils/knex-utils.js';
import { Badge } from '../../domain/models/Badge.js';

const TABLE_NAME = 'badges';
const BADGE_KEY_UNIQUE_CONSTRAINT = 'badges_key_unique';

const findByCampaignId = async function (campaignId) {
  return knex(TABLE_NAME)
    .select(`${TABLE_NAME}.*`)
    .join('target-profiles', 'target-profiles.id', `${TABLE_NAME}.targetProfileId`)
    .join('campaigns', 'campaigns.targetProfileId', 'target-profiles.id')
    .where('campaigns.id', campaignId)
    .orderBy('id');
};

const isAssociated = async function (badgeId, { knexTransaction } = DomainTransaction.emptyTransaction()) {
  const associatedBadge = await (knexTransaction ?? knex)('badge-acquisitions').where({ badgeId }).first();
  return !!associatedBadge;
};

const get = async function (id) {
  const badge = await knex(TABLE_NAME).select('*').where({ id }).first();
  if (!badge) throw new NotFoundError('Badge not found');
  return new Badge(badge);
};

const save = async function (badge, { knexTransaction } = DomainTransaction.emptyTransaction()) {
  try {
    const [savedBadge] = await (knexTransaction ?? knex)(TABLE_NAME).insert(_adaptModelToDb(badge)).returning('*');
    return new Badge(savedBadge);
  } catch (error) {
    if (knexUtils.isUniqConstraintViolated(error) && error.constraint === BADGE_KEY_UNIQUE_CONSTRAINT) {
      throw new AlreadyExistingEntityError(`The badge key ${badge.key} already exists`);
    }
    throw error;
  }
};

const update = async function (badge) {
  try {
    const [updatedBadge] = await knex(TABLE_NAME).update(_adaptModelToDb(badge)).where({ id: badge.id }).returning('*');
    return new Badge({ ...badge, ...updatedBadge });
  } catch (error) {
    if (knexUtils.isUniqConstraintViolated(error) && error.constraint === BADGE_KEY_UNIQUE_CONSTRAINT) {
      throw new AlreadyExistingEntityError(
        `The badge key ${badge.key} already exists`,
        'BADGE_KEY_UNIQUE_CONSTRAINT_VIOLATED',
        badge.key,
      );
    }
    throw error;
  }
};

const remove = async function (badgeId, { knexTransaction } = DomainTransaction.emptyTransaction()) {
  const knexConn = knexTransaction ?? knex;
  await knexConn('badge-criteria').where({ badgeId }).del();
  await knexConn('badges').where({ id: badgeId }).del();

  return true;
};

const findAllByIds = async function ({ ids }) {
  const badges = await knex.from('badges').whereIn('id', ids);

  return badges.map((badge) => {
    return new Badge(badge);
  });
};

export { findAllByIds, findByCampaignId, get, isAssociated, remove, save, update };

function _adaptModelToDb(badge) {
  return omit(badge, ['id', 'badgeCriteria', 'complementaryCertificationBadge']);
}
