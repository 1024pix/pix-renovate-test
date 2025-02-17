import { Answer } from '../../../../evaluation/domain/models/Answer.js';

export class AssessmentSimulatorSingleMeasureStrategy {
  constructor({ algorithm, challenges, pickChallenge, pickAnswerStatus, initialCapacity }) {
    this.algorithm = algorithm;
    this.challenges = challenges;
    this.pickAnswerStatus = pickAnswerStatus;
    this.pickChallenge = pickChallenge;
    this.initialCapacity = initialCapacity;
  }

  run({ challengesAnswers, stepIndex }) {
    const possibleChallenges = this.algorithm.getPossibleNextChallenges({
      assessmentAnswers: challengesAnswers,
      challenges: this.challenges,
      initialCapacity: this.initialCapacity,
    });

    const nextChallenge = this.pickChallenge({ possibleChallenges });

    if (!nextChallenge) {
      return null;
    }

    const answerStatus = this.pickAnswerStatus({
      answerIndex: stepIndex,
      nextChallenge,
    });

    if (!answerStatus) {
      return null;
    }

    const capacityBeforeAnswering = this.algorithm.getCapacityAndErrorRate({
      allAnswers: challengesAnswers,
      challenges: this.challenges,
      initialCapacity: this.initialCapacity,
    }).capacity;

    const newAnswer = new Answer({ result: answerStatus, challengeId: nextChallenge.id });

    const { capacity, errorRate } = this.algorithm.getCapacityAndErrorRate({
      allAnswers: [...challengesAnswers, newAnswer],
      challenges: this.challenges,
      initialCapacity: this.initialCapacity,
    });

    const reward = this.algorithm.getReward({
      capacity: capacityBeforeAnswering,
      difficulty: nextChallenge.difficulty,
      discriminant: nextChallenge.discriminant,
    });

    return {
      nextStepIndex: stepIndex + 1,
      results: [
        {
          challenge: nextChallenge,
          errorRate,
          capacity,
          reward,
          answerStatus,
          numberOfAvailableChallenges: possibleChallenges.length,
        },
      ],
      challengeAnswers: [newAnswer],
    };
  }
}
