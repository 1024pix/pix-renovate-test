const {
  sinon,
  expect,
} = require('../../../test-helper');

const publishSession = require('../../../../lib/domain/usecases/publish-session');

describe('Unit | UseCase | publish-session', function() {

  it('delegates the action to the session-publication-service and return the session', async function() {
    // given
    const sessionId = Symbol('a session id');
    const session = Symbol('a session');
    const certificationRepository = Symbol('the certification repository');
    const finalizedSessionRepository = Symbol('the finalizedSessionRepository');
    const publishedAt = Symbol('a publication date');

    const sessionRepository = {
      get: sinon.stub(),
    };
    sessionRepository.get.resolves(session);

    const sessionPublicationService = {
      publishSession: sinon.stub(),
    };

    // when
    const result = await publishSession({
      sessionId,
      certificationRepository,
      finalizedSessionRepository,
      sessionRepository,
      sessionPublicationService,
      publishedAt,
    });

    // then
    expect(sessionPublicationService.publishSession).to.have.been.calledWithExactly({
      sessionId,
      certificationRepository,
      finalizedSessionRepository,
      sessionRepository,
      publishedAt,
    });
    expect(result).to.equal(session);
  });
});
