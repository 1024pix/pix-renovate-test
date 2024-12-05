import * as sessionResultsLinkService from '../../../../../../src/certification/results/domain/services/session-results-link-service.js';
import { tokenService } from '../../../../../../src/shared/domain/services/token-service.js';
import { getI18n } from '../../../../../../src/shared/infrastructure/i18n/i18n.js';
import { expect, sinon } from '../../../../../test-helper.js';

describe('Certification | Results | Unit | Domain | Service | Session Results Link Service', function () {
  describe('#generateResultsLink', function () {
    it('should return a valid download link', function () {
      // given
      const sessionId = 12345;
      const i18n = getI18n();
      const tokenServiceStub = sinon.stub(tokenService, 'createCertificationResultsLinkToken');
      tokenServiceStub.withArgs({ sessionId }).returns('a_valid_token');

      // when
      const link = sessionResultsLinkService.generateResultsLink({ sessionId, i18n });

      // then
      expect(link).to.deep.equal('https://test.app.pix.org/resultats-session?lang=fr#a_valid_token');
    });
  });
});
