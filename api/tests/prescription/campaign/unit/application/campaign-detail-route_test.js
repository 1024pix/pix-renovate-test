import { campaignDetailController } from '../../../../../src/prescription/campaign/application/campaign-detail-controller.js';
import * as moduleUnderTest from '../../../../../src/prescription/campaign/application/campaign-detail-route.js';
import { securityPreHandlers } from '../../../../../src/shared/application/security-pre-handlers.js';
import { NotFoundError } from '../../../../../src/shared/domain/errors.js';
import { expect, HttpTestServer, sinon } from '../../../../test-helper.js';

describe('Unit | Application | Router | campaign-detail-router ', function () {
  describe('GET /api/campaigns', function () {
    let getByCodeStub;

    beforeEach(function () {
      getByCodeStub = sinon.stub(campaignDetailController, 'getByCode');
    });

    it('should return 200', async function () {
      // given
      getByCodeStub.callsFake((request, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns?filter[code]=SOMECODE');

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('should return 400 when unauthorized filter', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns?filter[toto]=plop');

      // then
      expect(getByCodeStub.notCalled).to.be.true;
      expect(response.statusCode).to.equal(400);
    });

    it('should return 400 when no filter', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns');

      // then
      expect(getByCodeStub.notCalled).to.be.true;
      expect(response.statusCode).to.equal(400);
    });

    it('should return a 400 error when code is a funky mess of utf-8 chars', async function () {
      // given
      const code = '���� LEXI';
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', `/api/campaigns?filter[code]=${code}`);

      // then
      expect(getByCodeStub.notCalled).to.be.true;
      expect(response.statusCode).to.equal(400);
    });

    it('should return 404 when controller throws a NotFound domain error', async function () {
      // given
      getByCodeStub.rejects(new NotFoundError());

      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns?filter[code]=SOMECODE');

      // then
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('GET /api/campaigns/{campaignId}', function () {
    it('should return 200', async function () {
      // given
      sinon.stub(campaignDetailController, 'getById').callsFake((request, h) => h.response('ok').code(200));
      sinon.stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign').callsFake((request, h) => h.response(true));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1');

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('should return 403', async function () {
      // given
      sinon.stub(campaignDetailController, 'getById').callsFake((request, h) => h.response('ok').code(200));
      sinon
        .stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign')
        .callsFake((request, h) => h.response().code(403).takeover());
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1');

      // then
      expect(response.statusCode).to.equal(403);
    });

    it('should return 400 with an invalid campaign id', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/invalid');

      // then
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('GET /api/campaigns/{campaignId}/csv-profiles-collection-results', function () {
    it('should return 200', async function () {
      // given
      sinon.stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign').callsFake((request, h) => h.response(true));
      sinon
        .stub(campaignDetailController, 'getCsvProfilesCollectionResults')
        .callsFake((_, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1/csv-profiles-collection-results');

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('should return 403', async function () {
      // given
      sinon
        .stub(campaignDetailController, 'getCsvProfilesCollectionResults')
        .callsFake((request, h) => h.response('ok').code(200));
      sinon
        .stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign')
        .callsFake((request, h) => h.response().code(403).takeover());
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1/csv-profiles-collection-results');

      // then
      expect(response.statusCode).to.equal(403);
    });

    it('should return 400 with an invalid campaign id', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/invalid/csv-profiles-collection-results');

      // then
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('GET /api/campaigns/{campaignId}/csv-assessment-results', function () {
    it('should return 200', async function () {
      // given
      sinon.stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign').callsFake((request, h) => h.response(true));
      sinon
        .stub(campaignDetailController, 'getCsvAssessmentResults')
        .callsFake((request, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1/csv-assessment-results');

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('should return 403', async function () {
      // given
      sinon
        .stub(campaignDetailController, 'getCsvAssessmentResults')
        .callsFake((request, h) => h.response('ok').code(200));
      sinon
        .stub(securityPreHandlers, 'checkAuthorizationToAccessCampaign')
        .callsFake((request, h) => h.response().code(403).takeover());
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/1/csv-profiles-collection-results');

      // then
      expect(response.statusCode).to.equal(403);
    });

    it('should return 400 with an invalid campaign id', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/campaigns/invalid/csv-assessment-results');

      // then
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('GET /api/campaigns/{campaignId}/participants-activity', function () {
    it('should return 200', async function () {
      sinon
        .stub(campaignDetailController, 'findParticipantsActivity')
        .callsFake((request, h) => h.response('ok').code(200));

      // when
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);
      const result = await httpTestServer.request('GET', '/api/campaigns/1/participants-activity');

      // then
      expect(result.statusCode).to.equal(200);
    });

    it('should return 200 with a string array of one element as division filter', async function () {
      // given
      sinon
        .stub(campaignDetailController, 'findParticipantsActivity')
        .callsFake((request, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const result = await httpTestServer.request(
        'GET',
        '/api/campaigns/1/participants-activity?filter[divisions][]="3EMEB"',
      );

      // then
      expect(result.statusCode).to.equal(200);
    });

    it('should return 200 with a string array of several elements as division filter', async function () {
      // given
      sinon
        .stub(campaignDetailController, 'findParticipantsActivity')
        .callsFake((request, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const result = await httpTestServer.request(
        'GET',
        '/api/campaigns/1/participants-activity?filter[divisions][]="3EMEB"&filter[divisions][]="3EMEA"',
      );

      // then
      expect(result.statusCode).to.equal(200);
    });

    it('should return 400 with an invalid campaign id', async function () {
      // when
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);
      const result = await httpTestServer.request('GET', '/api/campaigns/invalid/participants-activity');

      // then
      expect(result.statusCode).to.equal(400);
    });

    it('should return 400 with unexpected filters', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const result = await httpTestServer.request(
        'GET',
        '/api/campaigns/1/participants-activity?filter[unexpected][]=5',
      );

      // then
      expect(result.statusCode).to.equal(400);
    });

    it('should return 400 with a division filter which is not an array', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const result = await httpTestServer.request(
        'GET',
        '/api/campaigns/1/participants-activity?filter[divisions]="3EMEA"',
      );

      // then
      expect(result.statusCode).to.equal(400);
    });
  });

  describe('GET /api/admin/campaigns/{campaignId}', function () {
    it('should return 200', async function () {
      // given
      sinon.stub(securityPreHandlers, 'hasAtLeastOneAccessOf').returns(() => true);
      sinon.stub(campaignDetailController, 'getCampaignDetails').callsFake((request, h) => h.response('ok').code(200));
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/admin/campaigns/1');

      // then
      expect(response.statusCode).to.equal(200);
    });

    it('should return 400 with an invalid campaign id', async function () {
      // given
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/admin/campaigns/invalid');

      // then
      expect(response.statusCode).to.equal(400);
    });

    it('should return 403 when unauthorized', async function () {
      // given
      sinon
        .stub(securityPreHandlers, 'hasAtLeastOneAccessOf')
        .returns((request, h) => h.response().code(403).takeover());
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/admin/campaigns/1');

      // then
      expect(response.statusCode).to.equal(403);
    });
  });
});
