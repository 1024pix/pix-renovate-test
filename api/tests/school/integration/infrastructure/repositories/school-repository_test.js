import { Organization } from '../../../../../lib/domain/models/index.js';
import { School } from '../../../../../src/school/domain/models/School.js';
import { SchoolNotFoundError } from '../../../../../src/school/domain/school-errors.js';
import { repositories } from '../../../../../src/school/infrastructure/repositories/index.js';
import { catchErr, databaseBuilder, expect, knex } from '../../../../test-helper.js';

describe('Integration | Repository | School', function () {
  describe('#save', function () {
    it('saves the given organization', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization({ type: 'SCO-1D' });
      await databaseBuilder.commit();

      // when
      await repositories.schoolRepository.save({ organizationId: organization.id, code: 'HAPPYY123' });

      // then
      const savedSchool = await knex('schools').first();
      expect(savedSchool.organizationId).to.equal(organization.id);
      expect(savedSchool.code).to.equal('HAPPYY123');
    });
  });

  describe('#getByCode', function () {
    it('returns the organization corresponding to the code', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization({ type: 'SCO-1D', name: 'École des fans' });
      databaseBuilder.factory.buildSchool({ organizationId: organization.id, code: 'HAPPYY123' });
      await databaseBuilder.commit();

      const expectedSchool = new School({ name: 'École des fans', id: organization.id, code: 'HAPPYY123' });
      // when
      const result = await repositories.schoolRepository.getByCode({ code: 'HAPPYY123' });

      // then
      expect(result).to.deep.equal(expectedSchool);
    });

    it('throws a SchoolNotFoundError if code does not exist', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization({ type: 'SCO-1D', name: 'École des fans' });
      databaseBuilder.factory.buildSchool({ organizationId: organization.id, code: 'HAPPYY123' });
      await databaseBuilder.commit();

      // when
      const error = await catchErr(repositories.schoolRepository.getByCode)({ code: 'NOTHAPPY' });

      // then
      expect(error).to.be.an.instanceof(SchoolNotFoundError);
      expect(error.message).to.equal('No school found for code NOTHAPPY');
    });
  });

  describe('#isCodeAvailable', function () {
    beforeEach(async function () {
      databaseBuilder.factory.buildSchool({ code: 'BADOIT710' });
      await databaseBuilder.commit();
    });

    it('should resolve true if the code is available', async function () {
      // when
      const isCodeAvailable = await repositories.schoolRepository.isCodeAvailable({ code: 'FRANCE998' });

      // then
      expect(isCodeAvailable).to.be.true;
    });

    it('should resolve false if the code is not available', async function () {
      // when
      const isCodeAvailable = await repositories.schoolRepository.isCodeAvailable({ code: 'BADOIT710' });

      // then
      expect(isCodeAvailable).to.be.false;
    });
  });

  describe('#getById', function () {
    it('should return the code for an organization', async function () {
      //given
      const organizationId = databaseBuilder.factory.buildOrganization({ type: Organization.types.SCO1D }).id;
      databaseBuilder.factory.buildSchool({ code: 'BADOIT710', organizationId });
      await databaseBuilder.commit();

      // when
      const code = await repositories.schoolRepository.getById({ organizationId });

      // then
      expect(code).to.equal('BADOIT710');
    });
  });

  describe('#updateSessionExpirationDate', function () {
    it('should update the sessionExpirationDate into given school', async function () {
      //given
      const { organizationId } = databaseBuilder.factory.buildSchool({ code: 'BADOIT710' });
      await databaseBuilder.commit();

      const sessionExpirationDate = new Date();

      // when
      await repositories.schoolRepository.updateSessionExpirationDate({ organizationId, sessionExpirationDate });

      // then
      const school = await knex('schools').first();

      expect(school.sessionExpirationDate).to.deep.equal(sessionExpirationDate);
    });
  });
});
