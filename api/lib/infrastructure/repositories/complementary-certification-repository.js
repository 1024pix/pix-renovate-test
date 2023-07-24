import { ComplementaryCertification } from '../../domain/models/index.js';
import { ComplementaryCertificationForAdmin } from '../../domain/models/ComplementaryCertificationForAdmin.js';
import { knex } from '../../../db/knex-database-connection.js';

function _toDomain(row) {
  return new ComplementaryCertification({
    ...row,
  });
}

const findAll = async function () {
  const result = await knex.from('complementary-certifications').select('id', 'label', 'key').orderBy('id', 'asc');

  return result.map(_toDomain);
};

const getByLabel = async function ({ label }) {
  const result = await knex.from('complementary-certifications').where({ label }).first();

  return _toDomain(result);
};

const getTargetProfileById = async function ({ complementaryCertificationId }) {
  const targetProfiles = await knex('complementary-certification-badges')
    .select({
      id: 'target-profiles.id',
      name: 'target-profiles.name',
    })
    .max('complementary-certification-badges.createdAt', { as: 'attachedAt' })
    .leftJoin('badges', 'badges.id', 'complementary-certification-badges.badgeId')
    .leftJoin('target-profiles', 'target-profiles.id', 'badges.targetProfileId')
    .groupBy('target-profiles.id')
    .where({ complementaryCertificationId })
    .orderBy('attachedAt', 'desc');

  const currentTargetProfileBadges = await knex('badges')
    .select({
      id: 'badges.id',
      label: 'complementary-certification-badges.label',
      level: 'complementary-certification-badges.level',
    })
    .leftJoin('complementary-certification-badges', 'complementary-certification-badges.badgeId', 'badges.id')
    .where({ targetProfileId: targetProfiles[0].id });

  const complementaryCertification = await knex
    .from('complementary-certifications')
    .where({ id: complementaryCertificationId })
    .first();

  return new ComplementaryCertificationForAdmin({
    ...complementaryCertification,
    targetProfilesLog: targetProfiles,
    currentTargetProfileBadges,
  });
};

export { findAll, getByLabel, getTargetProfileById };
