import { saveAutonomousCourse } from '../../../../../src/evaluation/domain/usecases/save-autonomous-course.js';
import { constants } from '../../../../../src/shared/domain/constants.js';
import {
  AutonomousCourseRequiresATargetProfileWithSimplifiedAccessError,
  NotFoundError,
} from '../../../../../src/shared/domain/errors.js';
import { catchErr, domainBuilder, expect, sinon } from '../../../../test-helper.js';

describe('Unit | UseCase | save-autonomous-course', function () {
  let autonomousCourse;
  let autonomousCourseRepository;
  let targetProfileRepository;
  let targetProfileAdministrationRepository;

  beforeEach(function () {
    sinon.stub(constants, 'AUTONOMOUS_COURSES_ORGANIZATION_ID').value(777);

    autonomousCourse = {
      id: 1,
      organizationId: constants.AUTONOMOUS_COURSES_ORGANIZATION_ID,
      targetProfileId: 3,
      campaignId: 4,
      publicTitle: 'default public title',
      internalTitle: 'default internal title',
    };

    autonomousCourseRepository = {
      save: sinon.stub(),
    };
    autonomousCourseRepository.save.resolves(autonomousCourse.id);

    targetProfileRepository = {
      findOrganizationIds: sinon.stub(),
    };

    targetProfileAdministrationRepository = {
      get: sinon.stub(),
    };
  });

  context('when all foreign keys exist', function () {
    it('should save an autonomous-course', async function () {
      // given
      targetProfileRepository.findOrganizationIds.resolves([constants.AUTONOMOUS_COURSES_ORGANIZATION_ID]);
      targetProfileAdministrationRepository.get.resolves({ isSimplifiedAccess: true });

      // when
      await saveAutonomousCourse({
        autonomousCourse,
        autonomousCourseRepository,
        targetProfileRepository,
        targetProfileAdministrationRepository,
      });

      // then
      expect(autonomousCourseRepository.save).to.be.calledOnceWithExactly({ autonomousCourse });
    });
  });

  context('when target profile is not simplified access', function () {
    it('should throw a domain error', async function () {
      const targetProfile = domainBuilder.buildTargetProfile({ isSimplifiedAccess: false });
      targetProfileAdministrationRepository.get
        .withArgs({ id: autonomousCourse.targetProfileId })
        .resolves(targetProfile);
      targetProfileRepository.findOrganizationIds.resolves([constants.AUTONOMOUS_COURSES_ORGANIZATION_ID]);

      // when
      const error = await catchErr(saveAutonomousCourse)({
        autonomousCourse,
        autonomousCourseRepository,
        targetProfileAdministrationRepository,
        targetProfileRepository,
      });

      // then
      expect(error).to.be.instanceOf(AutonomousCourseRequiresATargetProfileWithSimplifiedAccessError);
      expect(autonomousCourseRepository.save).to.not.have.been.called;
    });
  });

  context('when target profile does not exist', function () {
    it('should throw a not found error', async function () {
      // given
      targetProfileAdministrationRepository.get.rejects();

      // when
      const error = await catchErr(saveAutonomousCourse)({
        autonomousCourse,
        autonomousCourseRepository,
        targetProfileRepository,
        targetProfileAdministrationRepository,
      });

      // then
      expect(error).to.be.instanceOf(NotFoundError);
      expect(error.message).to.equal(`No target profile found for ID ${autonomousCourse.targetProfileId}`);
      expect(autonomousCourseRepository.save).to.not.have.been.called;
    });
  });
});
