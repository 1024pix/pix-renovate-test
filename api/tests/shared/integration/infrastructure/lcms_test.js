import { lcms } from '../../../../src/shared/infrastructure/lcms.js';
import { catchErr, expect, mockLearningContent, nock } from '../../../test-helper.js';

describe('Integration | Infrastructure | LCMS', function () {
  describe('#getLatestRelease', function () {
    it('calls LCMS API to get learning content latest release', async function () {
      // given
      const learningContent = { models: [{ id: 'recId' }] };
      const lcmsCall = mockLearningContent(learningContent);

      // when
      const response = await lcms.getLatestRelease();

      // then
      expect(response).to.deep.equal(learningContent);
      expect(lcmsCall.isDone()).to.be.true;
    });

    it('rejects when learning content release failed to get', async function () {
      // given
      nock('https://lcms-test.pix.fr/api')
        .get('/releases/latest')
        .matchHeader('Authorization', 'Bearer test-api-key')
        .reply(500);

      // when
      const error = await catchErr(lcms.getLatestRelease)();

      // then
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`An error occurred while fetching https://lcms-test.pix.fr/api`);
    });
  });

  describe('#createRelease', function () {
    it('calls LCMS API endpoint', async function () {
      // given
      const lcmsCall = nock('https://lcms-test.pix.fr/api')
        .post('/releases')
        .matchHeader('Authorization', 'Bearer test-api-key')
        .reply(201);

      // when
      await lcms.createRelease();

      // then
      expect(lcmsCall.isDone()).to.equal(true);
    });

    it('returns created release', async function () {
      // given
      const learningContent = { models: [{ id: 'recId' }] };
      nock('https://lcms-test.pix.fr/api')
        .post('/releases')
        .matchHeader('Authorization', 'Bearer test-api-key')
        .reply(201, { content: learningContent });

      // when
      const response = await lcms.createRelease();

      // then
      expect(response).to.deep.equal(learningContent);
    });

    it('throws when LCMS Api response is not successful', async function () {
      // given
      nock('https://lcms-test.pix.fr/api')
        .post('/releases')
        .matchHeader('Authorization', 'Bearer test-api-key')
        .reply(403);

      // when
      const error = await catchErr(lcms.createRelease)();

      // then
      expect(error.message).to.deep.equal('An error occurred while creating a release on https://lcms-test.pix.fr/api');
    });
  });
});
