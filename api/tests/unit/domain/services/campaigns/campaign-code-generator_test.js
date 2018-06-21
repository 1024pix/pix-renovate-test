const { expect, sinon } = require('../../../../test-helper');
const campaignCodeGenerator = require('../../../../../lib/domain/services/campaigns/campaign-code-generator');

describe('Unit | Domain | Services | campaign code generator', function() {

  describe('#createCampaignCode', () => {

    const campaignRepository = {
      isCodeAvailable: () => undefined
    };

    beforeEach(() => {
      sinon.stub(campaignRepository, 'isCodeAvailable');
      campaignRepository.isCodeAvailable.resolves(true);
    });

    afterEach(() => {
      campaignRepository.isCodeAvailable.restore();
    });

    it('should create a code with a length of 9 characters', () => {
      // when
      const promise = campaignCodeGenerator.generate(campaignRepository);

      // then
      return promise.then((code) => {
        expect(code.length).to.equal(9);
      });
    });

    it('should create a code beginning with 6 letters', () => {
      // when
      const promise = campaignCodeGenerator.generate(campaignRepository);

      // then
      return promise.then((code) => {
        const codeLetters = code.substring(0, 6);
        expect(codeLetters).to.match(/^[A-Z]+$/);
      });
    });

    it('should create a code finishing with 3 numbers', () => {
      // when
      const promise = campaignCodeGenerator.generate(campaignRepository);

      // then
      return promise.then((code) => {
        const codeNumbers = code.substring(6, 9);
        expect(codeNumbers).to.match(/^[0-9]+$/);
      });
    });

    it('should not be already assigned', () => {
      // given
      campaignRepository.isCodeAvailable.onCall(0).resolves(false);
      campaignRepository.isCodeAvailable.onCall(1).resolves(true);

      // when
      const promise = campaignCodeGenerator.generate(campaignRepository);

      // then
      return promise.then((generatedCode) => {
        expect(campaignRepository.isCodeAvailable).to.have.been.called;

        const existingCampaignCode = campaignRepository.isCodeAvailable.callsArg(0);
        expect(generatedCode).to.not.equal(existingCampaignCode);
      });

    });

  });
});
