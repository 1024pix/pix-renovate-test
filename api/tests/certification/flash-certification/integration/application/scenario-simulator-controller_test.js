import * as moduleUnderTest from '../../../../../src/certification/flash-certification/application/scenario-simulator-route.js';
import { usecases } from '../../../../../src/certification/flash-certification/domain/usecases/index.js';
import { pickAnswerStatusService } from '../../../../../src/certification/shared/domain/services/pick-answer-status-service.js';
import { pickChallengeService } from '../../../../../src/evaluation/domain/services/pick-challenge-service.js';
import { securityPreHandlers } from '../../../../../src/shared/application/security-pre-handlers.js';
import { domainBuilder, expect, HttpTestServer, parseJsonStream, sinon } from '../../../../test-helper.js';

describe('Integration | Application | scenario-simulator-controller', function () {
  let httpTestServer;
  let simulationResults;
  let reward1;
  let errorRate1;
  let challenge1;
  let capacity1;
  const initialCapacity = 2;

  beforeEach(async function () {
    sinon.stub(usecases, 'simulateFlashAssessmentScenario');
    sinon.stub(securityPreHandlers, 'checkAdminMemberHasRoleSuperAdmin');
    sinon.stub(pickAnswerStatusService, 'pickAnswerStatusFromArray');
    sinon.stub(pickAnswerStatusService, 'pickAnswerStatusForCapacity');
    sinon.stub(pickChallengeService, 'chooseNextChallenge');

    httpTestServer = new HttpTestServer();
    await httpTestServer.register(moduleUnderTest);
  });

  describe('/api/scenario-simulator', function () {
    describe('#post', function () {
      beforeEach(async function () {
        challenge1 = domainBuilder.buildChallenge({ id: 'chall1', successProbabilityThreshold: 0.65 });
        reward1 = 0.2;
        errorRate1 = 0.3;
        capacity1 = 0.4;
        simulationResults = [
          {
            challenge: challenge1,
            reward: reward1,
            errorRate: errorRate1,
            capacity: capacity1,
            answerStatus: 'ok',
            numberOfAvailableChallenges: 1,
          },
        ];
      });

      context('When configuring the challenge pick probability', function () {
        it('should call simulateFlashAssessmentScenario usecase with correct arguments', async function () {
          // given
          const challengePickProbability = 40;

          const pickChallengeImplementation = sinon.stub();
          pickChallengeService.chooseNextChallenge
            .withArgs(challengePickProbability)
            .returns(pickChallengeImplementation);
          const pickAnswerStatusForCapacityImplementation = sinon.stub();
          pickAnswerStatusService.pickAnswerStatusForCapacity
            .withArgs(6)
            .returns(pickAnswerStatusForCapacityImplementation);

          usecases.simulateFlashAssessmentScenario
            .withArgs({
              pickAnswerStatus: pickAnswerStatusForCapacityImplementation,
              locale: 'en',
              pickChallenge: pickChallengeImplementation,
              initialCapacity,
            })
            .resolves(simulationResults);
          securityPreHandlers.checkAdminMemberHasRoleSuperAdmin.returns(() => true);

          // when
          const response = await httpTestServer.request(
            'POST',
            '/api/scenario-simulator',
            {
              initialCapacity,
              capacity: 6,
              challengePickProbability,
              locale: 'en',
            },
            null,
          );

          // then
          expect(response.statusCode).to.equal(200);
          const parsedResult = parseJsonStream(response);
          expect(parsedResult).to.deep.equal([
            {
              index: 0,
              simulationReport: [
                {
                  challengeId: challenge1.id,
                  errorRate: errorRate1,
                  capacity: capacity1,
                  minimumCapability: 0.6190392084062237,
                  answerStatus: 'ok',
                  reward: reward1,
                  difficulty: challenge1.difficulty,
                  discriminant: challenge1.discriminant,
                  numberOfAvailableChallenges: 1,
                },
              ],
            },
          ]);
        });
      });

      context('When the route is called with correct arguments', function () {
        context('When the route is called without an initial capacity', function () {
          it('should call simulateFlashAssessmentScenario usecase with correct arguments', async function () {
            // given
            const capacity = -3.1;

            const pickChallengeImplementation = sinon.stub();
            pickChallengeService.chooseNextChallenge.returns(pickChallengeImplementation);
            const pickAnswerStatusFromCapacityImplementation = sinon.stub();
            pickAnswerStatusService.pickAnswerStatusForCapacity
              .withArgs(capacity)
              .returns(pickAnswerStatusFromCapacityImplementation);

            usecases.simulateFlashAssessmentScenario
              .withArgs({
                pickChallenge: pickChallengeImplementation,
                locale: 'en',
                pickAnswerStatus: pickAnswerStatusFromCapacityImplementation,
              })
              .resolves(simulationResults);
            securityPreHandlers.checkAdminMemberHasRoleSuperAdmin.returns(() => true);

            // when
            const response = await httpTestServer.request(
              'POST',
              '/api/scenario-simulator',
              {
                capacity,
                locale: 'en',
              },
              null,
            );

            // then
            expect(response.statusCode).to.equal(200);
            const parsedResult = parseJsonStream(response);
            expect(parsedResult).to.deep.equal([
              {
                index: 0,
                simulationReport: [
                  {
                    challengeId: challenge1.id,
                    errorRate: errorRate1,
                    capacity: capacity1,
                    minimumCapability: 0.6190392084062237,
                    answerStatus: 'ok',
                    reward: reward1,
                    difficulty: challenge1.difficulty,
                    discriminant: challenge1.discriminant,
                    numberOfAvailableChallenges: 1,
                  },
                ],
              },
            ]);
          });
        });

        context('When the route is called with an initial capacity', function () {
          it('should call simulateFlashAssessmentScenario usecase with correct arguments', async function () {
            // given
            const capacity = -3.1;

            const pickChallengeImplementation = sinon.stub();
            pickChallengeService.chooseNextChallenge.returns(pickChallengeImplementation);
            const pickAnswerStatusFromCapacityImplementation = sinon.stub();
            pickAnswerStatusService.pickAnswerStatusForCapacity
              .withArgs(capacity)
              .returns(pickAnswerStatusFromCapacityImplementation);

            usecases.simulateFlashAssessmentScenario
              .withArgs({
                pickChallenge: pickChallengeImplementation,
                locale: 'en',
                pickAnswerStatus: pickAnswerStatusFromCapacityImplementation,
                initialCapacity,
              })
              .resolves(simulationResults);
            securityPreHandlers.checkAdminMemberHasRoleSuperAdmin.returns(() => true);

            // when
            const response = await httpTestServer.request(
              'POST',
              '/api/scenario-simulator',
              {
                capacity,
                initialCapacity,
                locale: 'en',
              },
              null,
            );

            // then
            expect(response.statusCode).to.equal(200);
            const parsedResult = parseJsonStream(response);
            expect(parsedResult).to.deep.equal([
              {
                index: 0,
                simulationReport: [
                  {
                    challengeId: challenge1.id,
                    errorRate: errorRate1,
                    capacity: capacity1,
                    minimumCapability: 0.6190392084062237,
                    answerStatus: 'ok',
                    reward: reward1,
                    difficulty: challenge1.difficulty,
                    discriminant: challenge1.discriminant,
                    numberOfAvailableChallenges: 1,
                  },
                ],
              },
            ]);
          });
        });
        context('When the route is called with uppercased supported locale', function () {
          it('should call simulateFlashAssessmentScenario usecase with correct arguments', async function () {
            // given
            const capacity = -3.1;

            const pickChallengeImplementation = sinon.stub();
            pickChallengeService.chooseNextChallenge.returns(pickChallengeImplementation);
            const pickAnswerStatusFromCapacityImplementation = sinon.stub();
            pickAnswerStatusService.pickAnswerStatusForCapacity
              .withArgs(capacity)
              .returns(pickAnswerStatusFromCapacityImplementation);

            usecases.simulateFlashAssessmentScenario
              .withArgs({
                pickChallenge: pickChallengeImplementation,
                locale: 'en',
                pickAnswerStatus: pickAnswerStatusFromCapacityImplementation,
                initialCapacity,
              })
              .resolves(simulationResults);
            securityPreHandlers.checkAdminMemberHasRoleSuperAdmin.returns(() => true);

            // when
            const response = await httpTestServer.request(
              'POST',
              '/api/scenario-simulator',
              {
                capacity,
                initialCapacity,
                locale: 'EN',
              },
              null,
            );

            // then
            expect(response.statusCode).to.equal(200);
            const parsedResult = parseJsonStream(response);
            expect(parsedResult).to.deep.equal([
              {
                index: 0,
                simulationReport: [
                  {
                    challengeId: challenge1.id,
                    errorRate: errorRate1,
                    capacity: capacity1,
                    minimumCapability: 0.6190392084062237,
                    answerStatus: 'ok',
                    reward: reward1,
                    difficulty: challenge1.difficulty,
                    discriminant: challenge1.discriminant,
                    numberOfAvailableChallenges: 1,
                  },
                ],
              },
            ]);
          });
        });
        context('When the route is called with non supported locale', function () {
          it('should returns 400', async function () {
            // given
            const capacity = -3.1;

            // when
            const response = await httpTestServer.request(
              'POST',
              '/api/scenario-simulator',
              {
                capacity,
                initialCapacity,
                locale: 'jp',
              },
              null,
            );

            // then
            expect(response.statusCode).to.equal(400);
            expect(response.result.errors[0].detail).to.have.string('"locale" must be one of');
          });
        });
      });
    });
  });
});
