import _ from 'lodash';

import { databaseBuffer } from '../database-buffer.js';
import { buildKnowledgeElement } from './build-knowledge-element.js';
import { buildUser } from './build-user.js';

const buildKnowledgeElementSnapshot = function ({
  id = databaseBuffer.getNextId(),
  userId,
  snappedAt = new Date('2020-01-01'),
  snapshot,
  campaignParticipationId,
} = {}) {
  const dateMinusOneDay = new Date(snappedAt.getTime() - 1000 * 60 * 60 * 24 * 7);
  userId = _.isUndefined(userId) ? buildUser().id : userId;
  if (!snapshot) {
    const knowledgeElements = [];
    knowledgeElements.push(buildKnowledgeElement({ userId, createdAt: dateMinusOneDay }));
    knowledgeElements.push(buildKnowledgeElement({ userId, createdAt: dateMinusOneDay }));
    snapshot = JSON.stringify(knowledgeElements);
  }

  const values = {
    id,
    userId,
    snappedAt,
    snapshot,
    campaignParticipationId,
  };

  return databaseBuffer.pushInsertable({
    tableName: 'knowledge-element-snapshots',
    values,
  });
};

export { buildKnowledgeElementSnapshot };
