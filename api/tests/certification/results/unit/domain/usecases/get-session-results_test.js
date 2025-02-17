import { getSessionResults } from '../../../../../../src/certification/results/domain/usecases/get-session-results.js';
import { domainBuilder, expect, sinon } from '../../../../../test-helper.js';

describe('Unit | Domain | Use Cases | get-session-results', function () {
  const sessionEnrolmentRepository = { get: null };
  const certificationResultRepository = { findBySessionId: null };

  beforeEach(function () {
    sessionEnrolmentRepository.get = sinon.stub();
    certificationResultRepository.findBySessionId = sinon.stub();
  });

  it('should return the session and the certificationResults', async function () {
    // given
    const expectedSession = domainBuilder.certification.sessionManagement.buildSession();
    sessionEnrolmentRepository.get.withArgs({ id: 123 }).resolves(expectedSession);
    const certificationResult1 = domainBuilder.buildCertificationResult({ firstName: 'Buffy' });
    const certificationResult2 = domainBuilder.buildCertificationResult({ firstName: 'Spike' });
    certificationResultRepository.findBySessionId
      .withArgs({ sessionId: 123 })
      .resolves([certificationResult1, certificationResult2]);

    // when
    const { session, certificationResults } = await getSessionResults({
      sessionId: 123,
      sessionEnrolmentRepository,
      certificationResultRepository,
    });

    // then
    expect(session).to.deepEqualInstance(expectedSession);
    expect(certificationResults).to.deepEqualArray([certificationResult1, certificationResult2]);
  });
});
