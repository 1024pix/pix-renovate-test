import * as flashAlgorithmService from '../../../../../../src/certification/flash-certification/domain/services/algorithm-methods/flash.js';
import { downgradeCapacity } from '../../../../../../src/certification/scoring/domain/services/scoring-degradation-service.js';
import { domainBuilder, expect } from '../../../../../test-helper.js';

describe('Integration | Domain | services | scoringDegradationService', function () {
  it('should degrade the initial capacity', function () {
    // given
    const initialCapacity = 2;
    const allChallenges = _buildChallenges();
    const allAnswers = _buildAnswers();
    const flashAssessmentAlgorithmConfiguration = domainBuilder.buildFlashAlgorithmConfiguration({
      maximumAssessmentLength: 4,
      challengesBetweenSameCompetence: 0,
      limitToOneQuestionPerTube: false,
      enablePassageByAllCompetences: false,
      variationPercent: null,
      createdAt: new Date('2020-01-01T00:00:00Z'),
    });

    const algorithm = domainBuilder.buildFlashAssessmentAlgorithm({
      flashAlgorithmImplementation: flashAlgorithmService,
      configuration: flashAssessmentAlgorithmConfiguration,
    });

    // when
    const degradedCapacity = downgradeCapacity({
      algorithm,
      capacity: initialCapacity,
      allChallenges,
      allAnswers,
      flashAssessmentAlgorithmConfiguration,
    });

    expect(degradedCapacity).to.be.lessThan(initialCapacity);
  });
});

const _buildChallenges = () => {
  const allChallenges = [];
  for (let index = 1; index < 5; index++) {
    allChallenges.push(
      domainBuilder.buildChallenge({
        id: `recChallenge${index}`,
        difficulty: 1.5,
        discriminant: 5,
        skill: domainBuilder.buildSkill({ id: `skill${index}` }),
      }),
    );
  }

  return allChallenges;
};

const _buildAnswers = () => {
  const allAnswers = [];
  for (let index = 1; index <= 3; index++) {
    allAnswers.push(
      domainBuilder.buildAnswer({
        challengeId: `recChallenge${index}`,
      }),
    );
  }

  return allAnswers;
};
