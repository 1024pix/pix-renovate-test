import { FinalizedSession } from '../../../../../../src/certification/session-management/domain/models/FinalizedSession.js';
import { unpublishSession } from '../../../../../../src/certification/session-management/domain/usecases/unpublish-session.js';
import { domainBuilder, expect, sinon } from '../../../../../test-helper.js';

describe('Certification | Session-Management | Unit | Domain | Use Cases | unpublish-session', function () {
  let certificationRepository;
  let sessionRepository;
  let sharedSessionRepository;
  let finalizedSessionRepository;

  beforeEach(function () {
    certificationRepository = {
      unpublishCertificationCoursesBySessionId: sinon.stub(),
    };
    sessionRepository = {
      updatePublishedAt: sinon.stub(),
    };
    sharedSessionRepository = {
      getWithCertificationCandidates: sinon.stub(),
    };
    finalizedSessionRepository = {
      get: sinon.stub(),
      save: sinon.stub(),
    };
    sessionRepository.flagResultsAsSentToPrescriber = sinon.stub();
  });

  it('should return the session', async function () {
    // given
    const sessionId = 123;
    const expectedSession = domainBuilder.certification.sessionManagement.buildSession({
      id: sessionId,
      publishedAt: new Date('2020-01-01'),
    });
    sharedSessionRepository.getWithCertificationCandidates.withArgs({ id: sessionId }).resolves(expectedSession);
    const finalizedSession = new FinalizedSession({ sessionId, publishSession: new Date('2020-01-01') });
    finalizedSessionRepository.get.withArgs({ sessionId }).resolves(finalizedSession);

    // when
    const actualSession = await unpublishSession({
      sessionId,
      certificationRepository,
      sessionRepository,
      sharedSessionRepository,
      finalizedSessionRepository,
    });

    // then
    expect(certificationRepository.unpublishCertificationCoursesBySessionId).to.have.been.calledWithExactly({
      sessionId,
    });
    expect(sessionRepository.updatePublishedAt).to.have.been.calledWithExactly({ id: sessionId, publishedAt: null });
    expect(finalizedSession.publishedAt).to.be.null;
    expect(finalizedSessionRepository.save).to.be.calledWith({ finalizedSession });
    expect(actualSession).to.deep.equal({
      ...expectedSession,
      publishedAt: null,
    });
  });
});
