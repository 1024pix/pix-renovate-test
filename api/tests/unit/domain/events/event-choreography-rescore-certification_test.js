import { ChallengeDeneutralized } from '../../../../src/certification/evaluation/domain/events/ChallengeDeneutralized.js';
import { ChallengeNeutralized } from '../../../../src/certification/evaluation/domain/events/ChallengeNeutralized.js';
import { expect } from '../../../test-helper.js';
import { buildEventDispatcherAndHandlersForTest } from '../../../tooling/events/event-dispatcher-builder.js';

describe('Event Choreography | Rescore Certification', function () {
  it('Should trigger Certification Rescoring handler on ChallengeNeutralized event', async function () {
    // given
    const { handlerStubs, eventDispatcher } = buildEventDispatcherAndHandlersForTest();
    const event = new ChallengeNeutralized({ certificationCourseId: 1, juryId: 7 });

    // when
    await eventDispatcher.dispatch(event);

    // then
    expect(handlerStubs.handleCertificationRescoring).to.have.been.calledWithExactly({
      domainTransaction: undefined,
      event,
    });
  });

  it('Should trigger Certification Rescoring handler on ChallengeDeneutralized event', async function () {
    // given
    const { handlerStubs, eventDispatcher } = buildEventDispatcherAndHandlersForTest();
    const event = new ChallengeDeneutralized({ certificationCourseId: 1, juryId: 7 });

    // when
    await eventDispatcher.dispatch(event);

    // then
    expect(handlerStubs.handleCertificationRescoring).to.have.been.calledWithExactly({
      domainTransaction: undefined,
      event,
    });
  });
});
