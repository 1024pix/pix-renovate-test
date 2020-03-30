const { sinon, expect, generateValidRequestAuthorizationHeader, hFake } = require('../../../test-helper');
const assessmentController = require('../../../../lib/application/assessments/assessment-controller');
const usecases = require('../../../../lib/domain/usecases');
const { badgeCreationHandler } = require('../../../../lib/domain/events/badge-creation-handler');
const assessmentSerializer = require('../../../../lib/infrastructure/serializers/jsonapi/assessment-serializer');
const DomainTransaction = require('../../../../lib/infrastructure/DomainTransaction');

describe('Unit | Controller | assessment-controller', function() {

  describe('#findByFilters', () => {

    const assessments = [{ id: 1 }, { id: 2 }];
    const assessmentsInJSONAPI = [{
      id: 1,
      type: 'assessments',
      attributes: { pixScore: 12 }
    }, {
      id: 1,
      type: 'assessments',
      attributes: { pixScore: 12 }
    }];

    const userId = 24504875;

    beforeEach(() => {

      sinon.stub(usecases, 'findSmartPlacementAssessments');
      sinon.stub(assessmentSerializer, 'serialize');
    });

    it('should serialize assessment to JSON API', async function() {
      // given
      const request = {
        query: { 'filter[codeCampaign]': 'Code' },
        headers: { authorization: generateValidRequestAuthorizationHeader(userId) }
      };
      usecases.findSmartPlacementAssessments.resolves(assessments);
      assessmentSerializer.serialize.returns(assessmentsInJSONAPI);

      // when
      const response = await assessmentController.findByFilters(request, hFake);

      // then
      expect(assessmentSerializer.serialize).to.have.been.calledWithExactly(assessments);
      expect(response).to.deep.equal(assessmentsInJSONAPI);
    });

    context('GET assessments with campaignCode filter', () => {

      const request = {
        query: { 'filter[codeCampaign]': 'Code' },
        headers: { authorization: generateValidRequestAuthorizationHeader(userId) }
      };

      it('should call assessment service with query filters', async function() {
        // given
        usecases.findSmartPlacementAssessments.resolves();

        // when
        await assessmentController.findByFilters(request, hFake);

        // then
        expect(usecases.findSmartPlacementAssessments).to.have.been.calledWithExactly({
          userId,
          filters: { codeCampaign: 'Code' },
        });
      });
    });

    //BUG
    context('GET assessments with no valid filter', () => {

      const request = {
        query: { 'filter[type]': 'DEMO' },
        headers: { authorization: generateValidRequestAuthorizationHeader(userId) }
      };

      it('should resolve []', async () => {
        // given
        assessmentSerializer.serialize.withArgs([]).returns({ data: [] });

        // when
        const response = await assessmentController.findByFilters(request, hFake);

        // then
        expect(response).to.deep.equal({ data: [] });
      });
    });

    context('GET assessment with invalid token', () => {

      const request = {
        query: { 'filter[type]': 'DEMO' },
        headers: { authorization: 'Bearer invalidtoken' }
      };

      it('should resolve []', async function() {
        // when
        await assessmentController.findByFilters(request, hFake);

        // then
        expect(assessmentSerializer.serialize).to.have.been.calledWithExactly([]);
      });
    });
  });

  describe('#completeAssessment', () => {
    const assessmentId = 2;
    const event = Symbol('un événement de fin de test');
    const domainTransaction = Symbol('domain transaction');
    let transactionToBeExecuted;

    beforeEach(() => {
      sinon.stub(usecases, 'completeAssessment');
      usecases.completeAssessment.resolves(event);

      sinon.stub(badgeCreationHandler, 'handle');
      sinon.stub(DomainTransaction, 'execute').callsFake((lambda) => {
        transactionToBeExecuted = lambda;
      });
    });

    it('should call the completeAssessment use case', async () => {
      // given
      badgeCreationHandler.handle.resolves({});

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });
      await transactionToBeExecuted(domainTransaction);

      // then
      expect(usecases.completeAssessment).to.have.been.calledWithExactly({ domainTransaction, assessmentId });
    });

    it('should pass the assessment completed event to the CleaBadgeCreationHandler', async () => {
      /// given
      badgeCreationHandler.handle.resolves({});

      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });
      await transactionToBeExecuted(domainTransaction);

      // then
      expect(badgeCreationHandler.handle).to.have.been.calledWithExactly(domainTransaction, event);
    });

    it('should call usecase and handler within the transaction', async () => {
      // when
      await assessmentController.completeAssessment({ params: { id: assessmentId } });
      // and transactionToBeExecuted is not executed

      // then
      expect(badgeCreationHandler.handle).to.not.have.been.called;
      expect(usecases.completeAssessment).to.not.have.been.called;

    });
  });
});

