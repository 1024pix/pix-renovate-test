const TargetProfile = require('../../../lib/domain/models/TargetProfile');
const databaseBuffer = require('../database-buffer');
const faker = require('faker');

module.exports = function buildTargetProfile({
  id = faker.random.number(),
  name = faker.name.jobTitle(),
  isPublic = faker.random.boolean(),
  organizationId = faker.random.number()
} = {}) {

  const values = {
    id, name, isPublic, organizationId
  };

  databaseBuffer.pushInsertable({
    tableName: 'target-profiles',
    values,
  });

  return values;
};

