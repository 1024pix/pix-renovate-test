import { config } from '../../../../../src/shared/config.js';
import { NotFoundError } from '../../../../../src/shared/domain/errors.js';
import * as courseRepository from '../../../../../src/shared/infrastructure/repositories/course-repository.js';
import { catchErr, domainBuilder, expect, mockLearningContent } from '../../../../test-helper.js';

describe('Integration | Repository | course-repository', function () {
  const courseData0 = {
    id: 'courseId0',
    name: 'instruction courseData0',
    description: 'description courseData0',
    isActive: true,
    competences: ['competenceId0'],
    challenges: ['challengeId0'],
  };
  const courseData1 = {
    id: 'courseId1',
    name: 'instruction courseData1',
    description: 'description courseData1',
    isActive: false,
    competences: ['competenceId1'],
    challenges: ['challengeId1'],
  };

  beforeEach(async function () {
    await mockLearningContent({
      courses: [courseData0, courseData1],
    });
  });

  testCourseRepository(); // eslint-disable-line mocha/no-setup-in-describe

  describe('when using old learning content', function () {
    beforeEach(function () {
      config.featureToggles.useNewLearningContent = false;
    });

    afterEach(function () {
      config.featureToggles.useNewLearningContent = true;
    });

    testCourseRepository(); // eslint-disable-line mocha/no-setup-in-describe
  });

  function testCourseRepository() {
    describe('#get', function () {
      context('when course found for given id', function () {
        it('should return the course', async function () {
          // when
          const course = await courseRepository.get('courseId1');

          // then
          expect(course).to.deepEqualInstance(domainBuilder.buildCourse(courseData1));
        });
      });

      context('when no course found', function () {
        it('should throw a NotFound error', async function () {
          // when
          const err = await catchErr(courseRepository.get, courseRepository)('coucouLoulou');

          // then
          expect(err).to.be.instanceOf(NotFoundError);
        });
      });
    });

    describe('#getCourseName', function () {
      context('when course found for given id', function () {
        it('should return the course name', async function () {
          // when
          const courseName = await courseRepository.getCourseName('courseId0');

          // then
          expect(courseName).to.deep.equal(courseData0.name);
        });
      });

      context('when no course found', function () {
        it('should throw a NotFound error', async function () {
          // when
          const err = await catchErr(courseRepository.getCourseName, courseRepository)('coucouLoulou');

          // then
          expect(err).to.be.instanceOf(NotFoundError);
          expect(err.message).to.equal("Le test demandé n'existe pas");
        });
      });
    });
  }
});
