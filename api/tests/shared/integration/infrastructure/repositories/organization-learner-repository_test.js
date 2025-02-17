import dayjs from 'dayjs';
import _ from 'lodash';

import { DomainTransaction } from '../../../../../lib/infrastructure/DomainTransaction.js';
import { ORGANIZATION_FEATURE } from '../../../../../src/shared/domain/constants.js';
import { OrganizationLearnerNotFound, UserNotFoundError } from '../../../../../src/shared/domain/errors.js';
import { OrganizationLearner } from '../../../../../src/shared/domain/models/index.js';
import * as organizationLearnerRepository from '../../../../../src/shared/infrastructure/repositories/organization-learner-repository.js';
import { catchErr, databaseBuilder, domainBuilder, expect, knex, sinon } from '../../../../test-helper.js';

describe('Integration ¨| Infrastructure | Repository | organization-learner-repository', function () {
  describe('#findByIds', function () {
    it('should return all the organizationLearners for given organizationLearner IDs', async function () {
      // given
      const organizationLearner1 = databaseBuilder.factory.buildOrganizationLearner();
      const organizationLearner2 = databaseBuilder.factory.buildOrganizationLearner();
      const ids = [organizationLearner1.id, organizationLearner2.id];
      await databaseBuilder.commit();

      // when
      const organizationLearnersResult = await organizationLearnerRepository.findByIds({ ids });

      // then
      const anyOrganizationLearner = organizationLearnersResult[0];
      expect(anyOrganizationLearner).to.be.an.instanceOf(OrganizationLearner);
      expect(anyOrganizationLearner.firstName).to.equal(organizationLearner1.firstName);
      expect(anyOrganizationLearner.lastName).to.equal(organizationLearner1.lastName);
      expect(anyOrganizationLearner.birthdate).to.deep.equal(organizationLearner1.birthdate);
      expect(_.map(organizationLearnersResult, 'id')).to.have.members([
        organizationLearner1.id,
        organizationLearner2.id,
      ]);
    });

    it('should return empty array when there are no result', async function () {
      // given
      databaseBuilder.factory.buildOrganizationLearner({ id: 1 });
      databaseBuilder.factory.buildOrganizationLearner({ id: 2 });
      const notFoundIds = [3, 4];
      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByIds({ ids: notFoundIds });

      // then
      expect(organizationLearners).to.be.empty;
    });
  });

  describe('#findByOrganizationId', function () {
    it('should return instances of OrganizationLearner', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();
      const organizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId: null,
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationId({
        organizationId: organization.id,
      });

      // then
      const anyOrganizationLearner = organizationLearners[0];
      expect(anyOrganizationLearner).to.be.an.instanceOf(OrganizationLearner);

      expect(anyOrganizationLearner.firstName).to.equal(organizationLearner.firstName);
      expect(anyOrganizationLearner.lastName).to.equal(organizationLearner.lastName);
      expect(anyOrganizationLearner.birthdate).to.deep.equal(organizationLearner.birthdate);
    });

    it('should return all the organizationLearners for a given organization ID', async function () {
      // given
      const organization_1 = databaseBuilder.factory.buildOrganization();
      const organization_2 = databaseBuilder.factory.buildOrganization();

      const user = databaseBuilder.factory.buildUser();

      const firstOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization_1.id,
      });
      const secondOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization_1.id,
        userId: user.id,
      });
      databaseBuilder.factory.buildOrganizationLearner({ organizationId: organization_2.id });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationId({
        organizationId: organization_1.id,
      });

      // then
      expect(_.map(organizationLearners, 'id')).to.have.members([
        firstOrganizationLearner.id,
        secondOrganizationLearner.id,
      ]);
    });

    it('should order organizationLearners by lastName and then by firstName with no sensitive case', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();

      const firstOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        lastName: 'Grenier',
      });
      const secondOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        lastName: 'Avatar',
        firstName: 'Xavier',
      });
      const thirdOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        lastName: 'Avatar',
        firstName: 'Arthur',
      });
      const fourthOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        lastName: 'Avatar',
        firstName: 'MATHURIN',
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationId({
        organizationId: organization.id,
      });

      // then
      expect(_.map(organizationLearners, 'id')).to.deep.include.ordered.members([
        thirdOrganizationLearner.id,
        fourthOrganizationLearner.id,
        secondOrganizationLearner.id,
        firstOrganizationLearner.id,
      ]);
    });

    it('should return empty array when there are no result', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();
      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationId({
        organizationId: organization.id,
      });

      // then
      expect(organizationLearners).to.be.empty;
    });
  });

  describe('#findByOrganizationIdAndUpdatedAtOrderByDivision', function () {
    const afterBeginningOfThe2020SchoolYear = new Date('2020-10-15');
    let clock;

    beforeEach(function () {
      clock = sinon.useFakeTimers({ now: afterBeginningOfThe2020SchoolYear, toFake: ['Date'] });
    });

    afterEach(function () {
      clock.restore();
    });

    it('should return instances of OrganizationLearner', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();
      const organizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId: null,
        division: '3A',
        updatedAt: new Date(),
      });

      await databaseBuilder.commit();

      // when
      const paginatedOrganizationLearners =
        await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
          organizationId: organization.id,
          page: {
            size: 10,
            number: 1,
          },
          filter: { divisions: ['3A'] },
        });

      // then
      const expectedOrganizationLearner = domainBuilder.buildOrganizationLearner({
        ...organizationLearner,
        organization,
      });
      expect(paginatedOrganizationLearners.data[0]).to.deepEqualInstance(expectedOrganizationLearner);
    });

    it('should return all the organizationLearners for a given organization ID', async function () {
      // given
      const organization_1 = databaseBuilder.factory.buildOrganization();
      const organization_2 = databaseBuilder.factory.buildOrganization();

      const user = databaseBuilder.factory.buildUser();

      const firstOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization_1.id,
        division: '3A',
        lastName: 'last-name-1',
        updatedAt: new Date(),
      });
      const secondOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization_1.id,
        userId: user.id,
        division: '3A',
        lastName: 'last-name-2',
        updatedAt: new Date(),
      });
      databaseBuilder.factory.buildOrganizationLearner({ organizationId: organization_2.id });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
        organizationId: organization_1.id,
        page: {
          size: 10,
          number: 1,
        },
        filter: { divisions: ['3A'] },
      });

      // then
      const expectedFirstOrganizationLearner = domainBuilder.buildOrganizationLearner({
        ...firstOrganizationLearner,
        organization: organization_1,
      });
      const expectedSecondOrganizationLearner = domainBuilder.buildOrganizationLearner({
        ...secondOrganizationLearner,
        organization: organization_1,
      });
      expect(organizationLearners.data).to.deepEqualArray([
        expectedFirstOrganizationLearner,
        expectedSecondOrganizationLearner,
      ]);
    });

    it('should not return disabled organizationLearners for a given organization ID', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();
      const user = databaseBuilder.factory.buildUser();
      const notDisabledOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        isDisabled: false,
        organizationId: organization.id,
        division: '3A',
        updatedAt: new Date(),
      });
      databaseBuilder.factory.buildOrganizationLearner({
        isDisabled: true,
        organizationId: organization.id,
        userId: user.id,
        division: '3A',
        updatedAt: new Date(),
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
        organizationId: organization.id,
        page: {
          size: 10,
          number: 1,
        },
        filter: { divisions: ['3A'] },
      });

      // then
      const expectedNotDisabledOrganizationLearner = domainBuilder.buildOrganizationLearner({
        ...notDisabledOrganizationLearner,
        organization,
      });
      expect(organizationLearners.data).to.deepEqualArray([expectedNotDisabledOrganizationLearner]);
    });

    it('should order organizationLearners by division and last name and then first name with no sensitive case', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();

      const organizationLearner3B = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: '3b',
        updatedAt: new Date(),
      });
      const organizationLearner3ABA = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: '3A',
        lastName: 'B',
        firstName: 'A',
        updatedAt: new Date(),
      });
      const organizationLearner3ABB = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: '3A',
        lastName: 'B',
        firstName: 'B',
        updatedAt: new Date(),
      });
      const organizationLearnerT2 = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: 'T2',
        updatedAt: new Date(),
      });
      const organizationLearnerT1CB = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: 't1',
        lastName: 'C',
        firstName: 'B',
        updatedAt: new Date(),
      });
      const organizationLearnerT1CA = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: 't1',
        lastName: 'C',
        firstName: 'A',
        updatedAt: new Date(),
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
        organizationId: organization.id,
        page: {
          size: 10,
          number: 1,
        },
        filter: {},
      });

      // then
      const expectedOrganizationLearner3ABA = domainBuilder.buildOrganizationLearner({
        ...organizationLearner3ABA,
        organization,
      });
      const expectedOrganizationLearner3ABB = domainBuilder.buildOrganizationLearner({
        ...organizationLearner3ABB,
        organization,
      });
      const expectedOrganizationLearner3B = domainBuilder.buildOrganizationLearner({
        ...organizationLearner3B,
        organization,
      });
      const expectedOrganizationLearnerT1CA = domainBuilder.buildOrganizationLearner({
        ...organizationLearnerT1CA,
        organization,
      });
      const expectedOrganizationLearnerT1CB = domainBuilder.buildOrganizationLearner({
        ...organizationLearnerT1CB,
        organization,
      });
      const expectedOrganizationLearnerT2 = domainBuilder.buildOrganizationLearner({
        ...organizationLearnerT2,
        organization,
      });
      expect(organizationLearners.data).to.deepEqualArray([
        expectedOrganizationLearner3ABA,
        expectedOrganizationLearner3ABB,
        expectedOrganizationLearner3B,
        expectedOrganizationLearnerT1CA,
        expectedOrganizationLearnerT1CB,
        expectedOrganizationLearnerT2,
      ]);
    });

    it('when there are two students and we ask for pages of one student, it should return one student on page two', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();

      const organizationLearner3B = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: '3b',
        updatedAt: new Date(),
      });

      databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        division: '3A',
        lastName: 'B',
        firstName: 'A',
        updatedAt: new Date(),
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
        organizationId: organization.id,
        page: {
          size: 1,
          number: 2,
        },
        filter: {},
      });

      // then
      const expectedOrganizationLearnerInPage1 = domainBuilder.buildOrganizationLearner({
        ...organizationLearner3B,
        organization,
      });
      expect(organizationLearners.data).to.deepEqualArray([expectedOrganizationLearnerInPage1]);
    });

    it('should filter out students registered after August 15, 2020', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();

      const beforeTheDate = new Date('2020-08-14T10:00:00Z');
      const afterTheDate = new Date('2020-08-16T10:00:00Z');
      databaseBuilder.factory.buildOrganizationLearner({ organizationId: organization.id, updatedAt: beforeTheDate });
      const earlierOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        updatedAt: afterTheDate,
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByOrganizationIdAndUpdatedAtOrderByDivision({
        organizationId: organization.id,
        page: {
          size: 10,
          number: 1,
        },
        filter: {},
      });

      // then
      const expectedEarlierOrganizationLearner = domainBuilder.buildOrganizationLearner({
        ...earlierOrganizationLearner,
        organization,
      });
      expect(organizationLearners.data).to.deepEqualArray([expectedEarlierOrganizationLearner]);
    });
  });

  describe('#findByUserId', function () {
    it('should return instances of OrganizationLearner', async function () {
      // given
      const organization = databaseBuilder.factory.buildOrganization();
      const userId = databaseBuilder.factory.buildUser().id;
      const organizationLearner = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId,
      });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByUserId({ userId });

      // then
      const anyOrganizationLearner = organizationLearners[0];
      expect(anyOrganizationLearner).to.be.an.instanceOf(OrganizationLearner);

      expect(anyOrganizationLearner.firstName).to.equal(organizationLearner.firstName);
      expect(anyOrganizationLearner.lastName).to.equal(organizationLearner.lastName);
      expect(anyOrganizationLearner.birthdate).to.deep.equal(organizationLearner.birthdate);
    });

    it('should return all the organizationLearners for a given user ID', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;

      const firstOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });
      const secondOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByUserId({ userId });

      // then
      expect(_.map(organizationLearners, 'id')).to.have.members([
        firstOrganizationLearner.id,
        secondOrganizationLearner.id,
      ]);
    });

    it('should order organizationLearners by id', async function () {
      // given
      const userId = databaseBuilder.factory.buildUser().id;
      const firstOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });
      const secondOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });
      const thirdOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });
      const fourthOrganizationLearner = databaseBuilder.factory.buildOrganizationLearner({ userId });

      await databaseBuilder.commit();

      // when
      const organizationLearners = await organizationLearnerRepository.findByUserId({ userId });

      // then
      expect(_.map(organizationLearners, 'id')).to.deep.include.ordered.members([
        firstOrganizationLearner.id,
        secondOrganizationLearner.id,
        thirdOrganizationLearner.id,
        fourthOrganizationLearner.id,
      ]);
    });
  });

  describe('#findByOrganizationIdAndBirthdate', function () {
    let organization;

    beforeEach(async function () {
      organization = databaseBuilder.factory.buildOrganization();
      databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId: null,
        preferredLastName: 'Lee',
        lastName: 'Lieber',
        firstName: 'Stanley',
        middleName: 'Martin',
        thirdName: 'Stan',
        birthdate: '2000-03-31',
        studentNumber: '123A',
        isDisabled: false,
      });
      databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId: null,
        lastName: 'See',
        firstName: 'Johnny',
        birthdate: '2000-03-31',
        studentNumber: '456A',
        isDisabled: false,
      });
      await databaseBuilder.commit();
    });

    it('should return found organizationLearners with birthdate', async function () {
      // given
      const birthdate = '2000-03-31';

      // when
      const result = await organizationLearnerRepository.findByOrganizationIdAndBirthdate({
        organizationId: organization.id,
        birthdate,
      });

      // then
      expect(result.length).to.be.equal(2);
    });

    it('should return empty array when there are no active organization-learners', async function () {
      // given
      const birthdate = '2001-01-01';
      databaseBuilder.factory.buildOrganizationLearner({
        organizationId: organization.id,
        userId: null,
        lastName: 'Stark',
        firstName: 'Anthony',
        birthdate,
        studentNumber: '006A',
        isDisabled: true,
      });
      await databaseBuilder.commit();

      // when
      const result = await organizationLearnerRepository.findByOrganizationIdAndBirthdate({
        organizationId: organization.id,
        birthdate,
      });

      // then
      expect(result.length).to.be.equal(0);
    });

    it('should return empty array when there are no organization-learners with the given birthdate', async function () {
      // given
      const birthdate = '2001-03-31';

      // when
      const result = await organizationLearnerRepository.findByOrganizationIdAndBirthdate({
        organizationId: organization.id,
        birthdate,
      });

      // then
      expect(result.length).to.be.equal(0);
    });

    it('should return empty array when there is no organization-learners with the given organizationId', async function () {
      // given
      const birthdate = '2000-03-31';

      // when
      const result = await organizationLearnerRepository.findByOrganizationIdAndBirthdate({
        organizationId: '999',
        birthdate,
      });

      // then
      expect(result.length).to.be.equal(0);
    });
  });

  context('Organizationlearners to dissocate', function () {
    let clock;

    beforeEach(async function () {
      clock = sinon.useFakeTimers({
        now: new Date('2023-10-12'),
        toFake: ['Date'],
      });
    });

    afterEach(async function () {
      clock.restore();
    });

    describe('#dissociateAllStudentsByUserId', function () {
      it('should delete association between user and organization learner in a managing student organization', async function () {
        // given
        const notManagingStudentOrganization = databaseBuilder.factory.buildOrganization({ isManagingStudents: false });
        const managingStudentOrganization = databaseBuilder.factory.buildOrganization({ isManagingStudents: true });
        const otherManagingStudentOrganization = databaseBuilder.factory.buildOrganization({
          isManagingStudents: true,
        });

        const otherUser = databaseBuilder.factory.buildUser();
        const userIdToDissociate = databaseBuilder.factory.buildUser().id;

        const initialDate = new Date('2023-01-01');

        const otherOrganizationLearnerToNotDissociate = databaseBuilder.factory.buildOrganizationLearner({
          userId: otherUser.id,
          organizationId: managingStudentOrganization.id,
          updatedAt: initialDate,
        });
        const organizationLearnerToNotDissociate = databaseBuilder.factory.buildOrganizationLearner({
          userId: userIdToDissociate,
          organizationId: notManagingStudentOrganization.id,
          updatedAt: initialDate,
        });
        const firstOrganizationLearnerToDissociate = databaseBuilder.factory.buildOrganizationLearner({
          userId: userIdToDissociate,
          organizationId: managingStudentOrganization.id,
          updatedAt: initialDate,
        });
        const secondOrganizationLearnerToDissociate = databaseBuilder.factory.buildOrganizationLearner({
          userId: userIdToDissociate,
          organizationId: otherManagingStudentOrganization.id,
          updatedAt: initialDate,
        });
        await databaseBuilder.commit();

        // when
        await organizationLearnerRepository.dissociateAllStudentsByUserId({ userId: userIdToDissociate });

        // then
        const allDissociatedOrganizationLearners = await knex('organization-learners').whereNull('userId');
        const dissociatedUserIds = [];
        const dissociatedUpdatedAt = [];

        allDissociatedOrganizationLearners.forEach((organizationLearner) => {
          dissociatedUserIds.push(organizationLearner.id);
          dissociatedUpdatedAt.push(organizationLearner.updatedAt);
        });

        expect(allDissociatedOrganizationLearners.length).to.be.equal(2);
        expect(dissociatedUserIds).to.be.members([
          firstOrganizationLearnerToDissociate.id,
          secondOrganizationLearnerToDissociate.id,
        ]);
        expect(dissociatedUpdatedAt).to.be.deep.members([new Date('2023-10-12'), new Date('2023-10-12')]);

        const allNonDissociatedOrganizationLearners = await knex('organization-learners').whereNotNull('userId');
        const nonDissociatedUserIds = [];
        const nonDissociatedUpdatedAt = [];

        allNonDissociatedOrganizationLearners.forEach((organizationLearner) => {
          nonDissociatedUserIds.push(organizationLearner.id);
          nonDissociatedUpdatedAt.push(organizationLearner.updatedAt);
        });
        expect(allNonDissociatedOrganizationLearners.length).to.be.equal(2);
        expect(nonDissociatedUserIds).to.be.members([
          otherOrganizationLearnerToNotDissociate.id,
          organizationLearnerToNotDissociate.id,
        ]);
        expect(nonDissociatedUpdatedAt).to.be.deep.members([initialDate, initialDate]);
      });
    });
  });

  describe('#getLatestOrganizationLearner', function () {
    it('should return the latest organization learner', async function () {
      // given
      const expectedUserId = databaseBuilder.factory.buildUser().id;
      const latestOrganizationId = databaseBuilder.factory.buildOrganization({ id: 1 }).id;
      const oldestOrganizationId = databaseBuilder.factory.buildOrganization({ id: 3 }).id;

      const studentInformation = {
        ine: '123456789AA',
        birthdate: '2000-12-07',
      };
      databaseBuilder.factory.buildOrganizationLearner({
        id: 1,
        organizationId: latestOrganizationId,
        userId: expectedUserId,
        birthdate: studentInformation.birthdate,
        nationalStudentId: studentInformation.ine,
        updatedAt: new Date('2013-01-01T15:00:00Z'),
      });
      databaseBuilder.factory.buildOrganizationLearner({
        id: 80,
        organizationId: oldestOrganizationId,
        userId: expectedUserId,
        birthdate: studentInformation.birthdate,
        nationalStudentId: studentInformation.ine,
        updatedAt: new Date('2000-01-01T15:00:00Z'),
      });

      await databaseBuilder.commit();

      // when
      const organizationLearner = await organizationLearnerRepository.getLatestOrganizationLearner({
        birthdate: studentInformation.birthdate,
        nationalStudentId: studentInformation.ine,
      });

      // then
      expect(organizationLearner.organizationId).to.equal(1);
      expect(organizationLearner.id).to.equal(1);
    });

    it('should return a UserNotFoundError if INE is invalid', async function () {
      // given
      const studentInformation = {
        ine: '123456789AB',
        birthdate: '2000-12-07',
      };
      databaseBuilder.factory.buildOrganizationLearner({
        birthdate: studentInformation.birthdate,
        nationalStudentId: studentInformation.ine,
      });

      await databaseBuilder.commit();

      // when
      const result = await catchErr(organizationLearnerRepository.getLatestOrganizationLearner)({
        nationalStudentId: '222256789AB',
        birthdate: '2000-12-07',
      });

      // then
      expect(result).to.be.instanceOf(UserNotFoundError);
    });

    it('should return a UserNotFoundError if userId is null', async function () {
      // given
      const studentInformation = {
        ine: '123456789AB',
        birthdate: '2000-12-07',
      };
      databaseBuilder.factory.buildOrganizationLearner({
        birthdate: studentInformation.birthdate,
        nationalStudentId: studentInformation.ine,
        userId: null,
      });

      await databaseBuilder.commit();

      // when
      const result = await catchErr(organizationLearnerRepository.getLatestOrganizationLearner)({
        nationalStudentId: '123456789AB',
        birthdate: '2000-12-07',
      });

      // then
      expect(result).to.be.instanceOf(UserNotFoundError);
    });
  });

  describe('#updateUserIdWhereNull', function () {
    let userId;
    let organizationLearnerId;

    beforeEach(async function () {
      userId = databaseBuilder.factory.buildUser().id;
      await databaseBuilder.commit();
    });

    it('should update userId if it was null before', async function () {
      // given
      organizationLearnerId = databaseBuilder.factory.buildOrganizationLearner({
        userId: null,
      }).id;
      await databaseBuilder.commit();

      // when
      const updatedOrganizationLearner = await organizationLearnerRepository.updateUserIdWhereNull({
        organizationLearnerId,
        userId,
      });

      // then
      expect(updatedOrganizationLearner.userId).to.equal(userId);
    });

    it('should throw where organizationLearner is already linked with a user', async function () {
      // given
      organizationLearnerId = databaseBuilder.factory.buildOrganizationLearner({
        userId,
      }).id;
      await databaseBuilder.commit();

      // when
      const error = await catchErr(organizationLearnerRepository.updateUserIdWhereNull)({
        organizationLearnerId,
        userId,
      });

      // then
      expect(error).to.be.an.instanceOf(OrganizationLearnerNotFound);
    });
  });

  describe('#isActive', function () {
    it('returns true when there is no organization learner', async function () {
      const userId = databaseBuilder.factory.buildUser().id;
      const campaignId = databaseBuilder.factory.buildCampaign().id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId });
      await databaseBuilder.commit();

      const isActive = await organizationLearnerRepository.isActive({ userId, campaignId });

      expect(isActive).to.be.true;
    });

    it('returns true when the organization learner is active', async function () {
      const userId = databaseBuilder.factory.buildUser().id;
      const organizationId = databaseBuilder.factory.buildOrganization().id;
      const campaignId = databaseBuilder.factory.buildCampaign({ organizationId }).id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId });
      databaseBuilder.factory.buildOrganizationLearner({ userId, organizationId, isDisabled: false });
      await databaseBuilder.commit();

      const isActive = await organizationLearnerRepository.isActive({ userId, campaignId });

      expect(isActive).to.be.true;
    });

    it('returns false when the organization learner is disabled', async function () {
      const userId = databaseBuilder.factory.buildUser().id;
      const organizationId = databaseBuilder.factory.buildOrganization().id;
      const campaignId = databaseBuilder.factory.buildCampaign({ organizationId }).id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId });
      databaseBuilder.factory.buildOrganizationLearner({ userId, organizationId, isDisabled: true });
      await databaseBuilder.commit();

      const isActive = await organizationLearnerRepository.isActive({ userId, campaignId });

      expect(isActive).to.be.false;
    });

    it('takes into account only organization learner for the given userId', async function () {
      const organizationId = databaseBuilder.factory.buildOrganization().id;
      const campaignId = databaseBuilder.factory.buildCampaign({ organizationId }).id;
      const userId = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId });
      databaseBuilder.factory.buildOrganizationLearner({ userId, organizationId, isDisabled: true });

      const otherUserId = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildCampaignParticipation({ userId: otherUserId, campaignId });
      databaseBuilder.factory.buildOrganizationLearner({ userId: otherUserId, organizationId, isDisabled: false });
      await databaseBuilder.commit();

      const isActive = await organizationLearnerRepository.isActive({ userId: otherUserId, campaignId });

      expect(isActive).to.be.true;
    });

    it('takes into account only organization learner for the given campaignId', async function () {
      const userId = databaseBuilder.factory.buildUser().id;
      const organizationId = databaseBuilder.factory.buildOrganization().id;
      const campaignId = databaseBuilder.factory.buildCampaign({ organizationId }).id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId });
      databaseBuilder.factory.buildOrganizationLearner({ userId, organizationId, isDisabled: true });

      const otherOrganizationId = databaseBuilder.factory.buildOrganization().id;
      const otherCampaignId = databaseBuilder.factory.buildCampaign({ organizationId: otherOrganizationId }).id;
      databaseBuilder.factory.buildCampaignParticipation({ userId, campaignId: otherCampaignId });
      databaseBuilder.factory.buildOrganizationLearner({
        userId,
        organizationId: otherOrganizationId,
        isDisabled: false,
      });
      await databaseBuilder.commit();

      const isActive = await organizationLearnerRepository.isActive({ userId, campaignId: otherCampaignId });

      expect(isActive).to.be.true;
    });
  });

  describe('#countByOrganizationsWhichNeedToComputeCertificability', function () {
    let featureId;
    let fromUserActivityDate;
    let toUserActivityDate;

    beforeEach(function () {
      fromUserActivityDate = dayjs('2023-07-02').hour(21).minute(0).second(0).millisecond(0).toDate();
      toUserActivityDate = dayjs('2023-07-03').hour(21).minute(0).second(0).millisecond(0).toDate();
      featureId = databaseBuilder.factory.buildFeature(
        ORGANIZATION_FEATURE.COMPUTE_ORGANIZATION_LEARNER_CERTIFICABILITY,
      ).id;
    });

    it('should return count of organization learners with lastLoggedAt in the past 24hours', async function () {
      // given
      const userNotComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: userNotComputed,
        lastLoggedAt: dayjs('2023-07-03').hour(21).minute(0).second(0).millisecond(0),
      });

      const anotherUserNotComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: anotherUserNotComputed,
        lastLoggedAt: dayjs('2023-07-02').hour(21).minute(0).second(0).millisecond(0),
      });

      const userComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: userComputed,
        lastLoggedAt: dayjs('2023-07-02').hour(20).minute(59).second(0).millisecond(0),
      });

      const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: userNotComputed });
      databaseBuilder.factory.buildOrganizationLearner({ userId: userComputed, organizationId });
      databaseBuilder.factory.buildOrganizationLearner({ userId: anotherUserNotComputed, organizationId });

      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.equal(1);
    });

    it('should not count organization learners not reconciliated', async function () {
      // given
      const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: null });

      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
        });
      });

      // then
      expect(result).to.equal(0);
    });

    it('should not count a disabled organization learner', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner({ isDisabled: true });
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date() });

      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
        });
      });

      // then
      expect(result).to.equal(0);
    });

    context('when "skipLoggedLastDayCheck" option is passed', function () {
      it('should return count of all organization learners', async function () {
        // given
        const userRecentlyConnectedId = databaseBuilder.factory.buildUser().id;
        databaseBuilder.factory.buildUserLogin({ userId: userRecentlyConnectedId, lastLoggedAt: new Date() });
        const userNotRecentlyConnectedId = databaseBuilder.factory.buildUser().id;

        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({
          userId: userRecentlyConnectedId,
        });
        databaseBuilder.factory.buildOrganizationLearner({ userId: userNotRecentlyConnectedId, organizationId });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            skipLoggedLastDayCheck: true,
          });
        });

        // then
        expect(result).to.equal(2);
      });

      it('should not count organization learners not reconciliated with option skipLoggedLastDayCheck', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: null });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            skipLoggedLastDayCheck: true,
          });
        });

        // then
        expect(result).to.equal(0);
      });
    });

    context('when "onlyNotComputed" option is passed', function () {
      it('should not use this option if "skipLoggedLastDayCheck" is not true', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: null });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            skipLoggedLastDayCheck: false,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.equal(0);
      });

      it('should return count of organization learners with no certificability', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: null });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            skipLoggedLastDayCheck: true,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.equal(1);
      });

      it('should not count organization learners already computed', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: true });
        databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: null, organizationId });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.countByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            skipLoggedLastDayCheck: true,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.equal(1);
      });
    });
  });

  describe('#findByOrganizationsWhichNeedToComputeCertificability', function () {
    let featureId;
    let fromUserActivityDate;
    let toUserActivityDate;

    beforeEach(function () {
      fromUserActivityDate = dayjs('2023-07-02').hour(21).minute(0).second(0).millisecond(0).toDate();
      toUserActivityDate = dayjs('2023-07-03').hour(21).minute(0).second(0).millisecond(0).toDate();
      featureId = databaseBuilder.factory.buildFeature(
        ORGANIZATION_FEATURE.COMPUTE_ORGANIZATION_LEARNER_CERTIFICABILITY,
      ).id;
    });

    it('should return only organization learner with lastLoggedAt in the past 24hours', async function () {
      // given
      const userNotComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: userNotComputed,
        lastLoggedAt: dayjs('2023-07-03').hour(21).minute(1).second(0).millisecond(0),
      });

      const anotherUserNotComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: anotherUserNotComputed,
        lastLoggedAt: dayjs('2023-07-02').hour(20).minute(59).second(0).millisecond(0),
      });

      const userComputed = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildUserLogin({
        userId: userComputed,
        lastLoggedAt: dayjs('2023-07-02').hour(21).minute(1).second(0).millisecond(0),
      });

      const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: userNotComputed });
      const { id: organizationLearnerIdComputed } = databaseBuilder.factory.buildOrganizationLearner({
        userId: userComputed,
        organizationId,
      });
      databaseBuilder.factory.buildOrganizationLearner({ userId: anotherUserNotComputed, organizationId });

      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.deep.equal([organizationLearnerIdComputed]);
    });

    it('should not return an organization learner not reconciliated', async function () {
      // given
      const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: null });

      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.be.empty;
    });

    it('should not return a disabled organization learner id', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner({ isDisabled: true });
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.be.empty;
    });

    it('should not return an organization learner id for organizations that cannot compute certificability', async function () {
      // given
      const { userId } = databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.be.empty;
    });

    it('should not return an organization learner id for organizations with other features', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      const otherFeatureId = databaseBuilder.factory.buildFeature(ORGANIZATION_FEATURE.MULTIPLE_SENDING_ASSESSMENT).id;
      databaseBuilder.factory.buildOrganizationFeature({ featureId: otherFeatureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
        });
      });

      // then
      expect(result).to.deep.equal([]);
    });

    context('when "skippLoggedLastDayCheck" option is passed', function () {
      it('should return all organization learners', async function () {
        // given
        const userRecentlyConnectedId = databaseBuilder.factory.buildUser().id;
        databaseBuilder.factory.buildUserLogin({
          userId: userRecentlyConnectedId,
          lastLoggedAt: new Date('2023-07-01'),
        });
        const userNotRecentlyConnectedId = databaseBuilder.factory.buildUser().id;

        const { id: organizationLearnerRecentlyConnecterId, organizationId } =
          databaseBuilder.factory.buildOrganizationLearner({ userId: userRecentlyConnectedId });
        const { id: organizationLearnerNotRecentlyConnectedId } = databaseBuilder.factory.buildOrganizationLearner({
          userId: userNotRecentlyConnectedId,
          organizationId,
        });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
            skipLoggedLastDayCheck: true,

            fromUserActivityDate,
            toUserActivityDate,
          });
        });

        // then
        expect(result).to.deep.include.members([
          organizationLearnerNotRecentlyConnectedId,
          organizationLearnerRecentlyConnecterId,
        ]);
      });

      it('should not return an organization learner not reconciliated with option skipLoggedLastDayCheck', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ userId: null });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            toUserActivityDate,
            skipLoggedLastDayCheck: true,
          });
        });

        // then
        expect(result).to.be.empty;
      });
    });

    context('when "onlyNotComputed" option is passed', function () {
      it('should return organization learners with no certificability', async function () {
        // given
        const { organizationId, id: organizationLearnerId } = databaseBuilder.factory.buildOrganizationLearner({
          isCertifiable: null,
        });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            toUserActivityDate,
            skipLoggedLastDayCheck: true,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.deep.equal([organizationLearnerId]);
      });

      it('should not return organization learners already computed', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: true });
        const { id: learnerNeverBeenComputed } = databaseBuilder.factory.buildOrganizationLearner({
          isCertifiable: null,
          organizationId,
        });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            toUserActivityDate,
            skipLoggedLastDayCheck: true,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.deep.equal([learnerNeverBeenComputed]);
      });

      it('should not use this option if "skipLoggedLastDayCheck" is not true', async function () {
        // given
        const { organizationId } = databaseBuilder.factory.buildOrganizationLearner({ isCertifiable: true });
        databaseBuilder.factory.buildOrganizationLearner({
          isCertifiable: null,
          organizationId,
        });

        databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
        await databaseBuilder.commit();

        // when
        const result = await DomainTransaction.execute(async () => {
          return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
            fromUserActivityDate,
            toUserActivityDate,
            skipLoggedLastDayCheck: false,
            onlyNotComputed: true,
          });
        });

        // then
        expect(result).to.be.empty;
      });
    });

    it('should returned ordered by id', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner({ id: 12 });
      databaseBuilder.factory.buildUserLogin({
        userId,
        lastLoggedAt: dayjs('2023-07-03').hour(18).minute(0).second(0).millisecond(0).toDate(),
      });
      const { userId: otherUserId } = databaseBuilder.factory.buildOrganizationLearner({ id: 3, organizationId });
      databaseBuilder.factory.buildUserLogin({
        userId: otherUserId,
        lastLoggedAt: dayjs('2023-07-03').hour(2).minute(0).second(0).millisecond(0).toDate(),
      });
      const { userId: anotherUserId } = databaseBuilder.factory.buildOrganizationLearner({ id: 567, organizationId });
      databaseBuilder.factory.buildUserLogin({
        userId: anotherUserId,
        lastLoggedAt: dayjs('2023-07-03').hour(12).minute(6).second(0).millisecond(0).toDate(),
      });
      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
          limit: 3,
        });
      });

      // then
      expect(result).to.be.deep.equal([3, 12, 567]);
    });

    it('should limit ids returned', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      const { userId: otherUserId } = databaseBuilder.factory.buildOrganizationLearner({ organizationId });
      databaseBuilder.factory.buildUserLogin({ userId: otherUserId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
          limit: 1,
        });
      });

      // then
      expect(result.length).to.be.equal(1);
    });

    it('should return ids from offset', async function () {
      // given
      const { organizationId, userId } = databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildUserLogin({ userId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      const { userId: otherUserId } = databaseBuilder.factory.buildOrganizationLearner({
        organizationId,
      });
      databaseBuilder.factory.buildUserLogin({ userId: otherUserId, lastLoggedAt: new Date('2023-07-03T19:00:00Z') });
      databaseBuilder.factory.buildOrganizationFeature({ featureId, organizationId });
      await databaseBuilder.commit();

      // when
      const result = await DomainTransaction.execute(async () => {
        return organizationLearnerRepository.findByOrganizationsWhichNeedToComputeCertificability({
          fromUserActivityDate,
          toUserActivityDate,
          offset: 1,
        });
      });

      // then
      expect(result.length).to.be.equal(1);
    });
  });

  describe('#findAllLearnerWithAtLeastOneParticipationByOrganizationId', function () {
    let registeredParticipantId, unRegisteredParticipantId, organizationId;

    beforeEach(async function () {
      const anonymousUserId = databaseBuilder.factory.buildUser({
        lastName: '',
        firstName: '',
        isAnonymous: true,
      }).id;
      organizationId = databaseBuilder.factory.buildOrganization().id;
      registeredParticipantId = databaseBuilder.factory.buildOrganizationLearner({ organizationId }).id;
      unRegisteredParticipantId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId,
        userId: anonymousUserId,
      }).id;
      await databaseBuilder.commit();
    });

    it('should return count of active linked learner on account with at least one participation for given organizationId', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: registeredParticipantId,
      });

      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(1);
      expect(result.totalUnRegisteredParticipant).to.equal(0);
    });

    it('should return count of active not linked learner on account with at least one participation for given organizationId', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: unRegisteredParticipantId,
      });

      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(0);
      expect(result.totalUnRegisteredParticipant).to.equal(1);
    });

    it('should not count an active learner several times for given organizationId', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: registeredParticipantId,
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: registeredParticipantId,
      });

      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(1);
    });

    it('should return 0 for active learner without participation', async function () {
      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for active learner with deleted participation', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: registeredParticipantId,
        deletedAt: new Date(),
      });
      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for active learner with at least one participation from another organization', async function () {
      const { id: activeOrganizationLearnerFromAnotherOrganizationId } =
        databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: activeOrganizationLearnerFromAnotherOrganizationId,
      });
      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for deleted learner', async function () {
      const deletedById = databaseBuilder.factory.buildUser().id;
      databaseBuilder.factory.buildOrganizationLearner({
        organizationId,
        deletedAt: new Date(),
        deletedBy: deletedById,
      });
      await databaseBuilder.commit();

      const result =
        await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationId(organizationId);

      expect(result.totalRegisteredParticipant).to.equal(0);
    });
  });

  describe('#findAllLearnerWithAtLeastOneParticipationByOrganizationIds', function () {
    let firstRegisteredParticipantId,
      secondRegisteredParticipantId,
      firstUnRegisteredParticipantId,
      secondUnRegisteredParticipantId,
      firstOrganizationId,
      secondOrganizationId;

    beforeEach(async function () {
      const firstAnonymousUserId = databaseBuilder.factory.buildUser({
        lastName: '',
        firstName: '',
        isAnonymous: true,
      }).id;
      const secondAnonymousUserId = databaseBuilder.factory.buildUser({
        lastName: '',
        firstName: '',
        isAnonymous: true,
      }).id;
      firstOrganizationId = databaseBuilder.factory.buildOrganization().id;
      secondOrganizationId = databaseBuilder.factory.buildOrganization().id;
      firstRegisteredParticipantId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: firstOrganizationId,
      }).id;
      firstUnRegisteredParticipantId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: firstOrganizationId,
        userId: firstAnonymousUserId,
      }).id;
      secondRegisteredParticipantId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: secondOrganizationId,
      }).id;
      secondUnRegisteredParticipantId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: secondOrganizationId,
        userId: secondAnonymousUserId,
      }).id;
      await databaseBuilder.commit();
    });

    it('should return count of active linked learner on account with at least one participation for given organizationIds', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: firstRegisteredParticipantId,
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: secondRegisteredParticipantId,
      });

      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
        secondOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(1);
      expect(result[firstOrganizationId].totalUnRegisteredParticipant).to.equal(0);
      expect(result[secondOrganizationId].totalRegisteredParticipant).to.equal(1);
      expect(result[secondOrganizationId].totalUnRegisteredParticipant).to.equal(0);
    });

    it('should return count of active not linked learner on account with at least one participation for given organizationIds', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: firstUnRegisteredParticipantId,
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: secondUnRegisteredParticipantId,
      });

      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
        secondOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(0);
      expect(result[firstOrganizationId].totalUnRegisteredParticipant).to.equal(1);
      expect(result[secondOrganizationId].totalRegisteredParticipant).to.equal(0);
      expect(result[secondOrganizationId].totalUnRegisteredParticipant).to.equal(1);
    });

    it('should not count an active learner several times for given organizationIds', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: firstRegisteredParticipantId,
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: firstRegisteredParticipantId,
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: secondRegisteredParticipantId,
      });

      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
        secondOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(1);
    });

    it('should return 0 for active learner without participation', async function () {
      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
        secondOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(0);
      expect(result[secondOrganizationId].totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for active learner with deleted participation', async function () {
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: firstRegisteredParticipantId,
        deletedAt: new Date(),
      });
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: secondRegisteredParticipantId,
        deletedAt: new Date(),
      });
      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
        secondOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(0);
      expect(result[secondOrganizationId].totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for active learner with at least one participation from another organization', async function () {
      const { id: activeOrganizationLearnerFromAnotherOrganizationId } =
        databaseBuilder.factory.buildOrganizationLearner();
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: activeOrganizationLearnerFromAnotherOrganizationId,
      });
      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(0);
    });

    it('should return 0 for deleted learner', async function () {
      const deletedById = databaseBuilder.factory.buildUser().id;
      const deletedLearnerId = databaseBuilder.factory.buildOrganizationLearner({
        organizationId: firstOrganizationId,
        deletedAt: new Date(),
        deletedBy: deletedById,
      }).id;
      databaseBuilder.factory.buildCampaignParticipation({
        organizationLearnerId: deletedLearnerId,
      });
      await databaseBuilder.commit();

      const result = await organizationLearnerRepository.findAllLearnerWithAtLeastOneParticipationByOrganizationIds([
        firstOrganizationId,
      ]);

      expect(result[firstOrganizationId].totalRegisteredParticipant).to.equal(0);
    });
  });
});
