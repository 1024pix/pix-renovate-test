import { Validator } from '../../../../../src/evaluation/domain/models/Validator.js';
import { AnswerStatus } from '../../../../../src/shared/domain/models/AnswerStatus.js';
import { Validation } from '../../../../../src/shared/domain/models/Validation.js';
import { domainBuilder, expect } from '../../../../test-helper.js';

describe('Unit | Domain | Models | Validator', function () {
  describe('#assess', function () {
    let uncorrectedAnswer;
    let validation;
    let validator;

    beforeEach(function () {
      // given
      uncorrectedAnswer = domainBuilder.buildAnswer.uncorrected();
      validator = new Validator();

      // when
      validation = validator.assess(uncorrectedAnswer);
    });

    it('should return a validation object with Unimplemented status', function () {
      const expectedValidation = domainBuilder.buildValidation({
        result: AnswerStatus.UNIMPLEMENTED,
        resultDetails: null,
      });

      // then
      expect(validation).to.be.an.instanceOf(Validation);
      expect(validation).to.deep.equal(expectedValidation);
    });
  });
});
