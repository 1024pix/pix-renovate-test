import dayjs from 'dayjs';

import * as flashAlgorithmConfigurationRepository from '../../../../../../../api/src/certification/shared/infrastructure/repositories/flash-algorithm-configuration-repository.js';
import { FlashAssessmentAlgorithmConfiguration } from '../../../../../../src/certification/shared/domain/models/FlashAssessmentAlgorithmConfiguration.js';
import { NotFoundError } from '../../../../../../src/shared/domain/errors.js';
import { catchErr, databaseBuilder, domainBuilder, expect } from '../../../../../test-helper.js';

describe('Certification | Shared | Integration | Infrastructure | Repository | FlashAlgorithmConfigurationRepository', function () {
  describe('#getMostRecent', function () {
    describe('when there is a saved configuration', function () {
      it('should return a flash algorithm configuration', async function () {
        // given
        const flashAlgorithmConfiguration = databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          maximumAssessmentLength: 2,
          challengesBetweenSameCompetence: 3,
          variationPercent: 4,
          limitToOneQuestionPerTube: true,
          enablePassageByAllCompetences: false,
        });

        const expectedFlashAlgorithmConfiguration = domainBuilder.buildFlashAlgorithmConfiguration({
          ...flashAlgorithmConfiguration,
        });

        await databaseBuilder.commit();

        // when
        const configResult = await flashAlgorithmConfigurationRepository.getMostRecent();

        // then
        expect(configResult.toDTO()).to.deep.equal(expectedFlashAlgorithmConfiguration.toDTO());
      });
    });

    describe('when there are multiple saved configurations', function () {
      it('should return the latest', async function () {
        // given
        const latestFlashAlgorithmConfiguration = databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          maximumAssessmentLength: 2,
          challengesBetweenSameCompetence: 3,
          variationPercent: 4,
          limitToOneQuestionPerTube: true,
          enablePassageByAllCompetences: false,
          createdAt: new Date('2021-01-01'),
        });

        databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          maximumAssessmentLength: 2,
          challengesBetweenSameCompetence: 3,
          variationPercent: 4,
          limitToOneQuestionPerTube: true,
          enablePassageByAllCompetences: false,
          createdAt: new Date('2020-01-01'),
        });

        const expectedFlashAlgorithmConfiguration = domainBuilder.buildFlashAlgorithmConfiguration({
          ...latestFlashAlgorithmConfiguration,
        });

        await databaseBuilder.commit();

        // when
        const configResult = await flashAlgorithmConfigurationRepository.getMostRecent();

        // then
        expect(configResult.toDTO()).to.deep.equal(expectedFlashAlgorithmConfiguration.toDTO());
      });
    });

    describe('when there is no saved configuration', function () {
      it('should return default configuration', async function () {
        // when
        const configResult = await flashAlgorithmConfigurationRepository.getMostRecent();

        // then
        expect(configResult).to.be.instanceOf(FlashAssessmentAlgorithmConfiguration);
      });
    });
  });

  describe('#getMostRecentBeforeDate', function () {
    const firstConfigDate = new Date('2020-01-01T08:00:00Z');
    const firstConfigVariationPercent = 0.1;

    const secondConfigDate = new Date('2021-01-01T08:00:00Z');
    const secondConfigVariationPercent = 0.2;

    const thirdConfigDate = new Date('2022-01-01T08:00:00Z');
    const thirdConfigVariationPercent = 0.3;

    describe('when there are saved configurations', function () {
      let firstConfiguration;
      let thirdConfiguration;

      beforeEach(async function () {
        firstConfiguration = databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          createdAt: firstConfigDate,
          variationPercent: firstConfigVariationPercent,
        });
        databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          createdAt: secondConfigDate,
          variationPercent: secondConfigVariationPercent,
        });
        thirdConfiguration = databaseBuilder.factory.buildFlashAlgorithmConfiguration({
          createdAt: thirdConfigDate,
          variationPercent: thirdConfigVariationPercent,
        });
        await databaseBuilder.commit();
      });

      describe('when date is more recent than the latest configuration', function () {
        it('should return the latest configuration', async function () {
          // given
          const date = dayjs(thirdConfigDate).add(7, 'day').toDate();

          // when
          const configResult = await flashAlgorithmConfigurationRepository.getMostRecentBeforeDate(date);

          // then
          expect(configResult.toDTO()).to.deep.equal(thirdConfiguration);
        });
      });

      describe('when date is between the first and second configuration', function () {
        it('should return the first configuration', async function () {
          // given
          const date = dayjs(firstConfigDate).add(7, 'day').toDate();

          // when
          const configResult = await flashAlgorithmConfigurationRepository.getMostRecentBeforeDate(date);

          // then
          expect(configResult.toDTO()).to.deep.equal(firstConfiguration);
        });
      });

      describe('when date is older than the first configuration', function () {
        it('should return the first configuration', async function () {
          // given
          const date = dayjs(firstConfigDate).subtract(7, 'day').toDate();

          // when
          const configResult = await flashAlgorithmConfigurationRepository.getMostRecentBeforeDate(date);

          // then
          expect(configResult.toDTO()).to.deep.equal(firstConfiguration);
        });
      });
    });

    describe('when there is no saved configuration', function () {
      it('should throw a not found error', async function () {
        // given
        const configDate = new Date('2020-01-01T08:00:00Z');

        // when
        const error = await catchErr(flashAlgorithmConfigurationRepository.getMostRecentBeforeDate)(configDate);

        // then
        expect(error).to.be.instanceOf(NotFoundError);
      });
    });
  });
});
