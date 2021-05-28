const {
  expect,
  HttpTestServer,
  sinon,
} = require('../../../test-helper');

const moduleUnderTest = require('../../../../lib/application/courses');

const courseController = require('../../../../lib/application/courses/course-controller');

describe('Unit | Router | course-router', () => {

  describe('GET /api/courses/{id}', () => {

    it('should exist', async () => {
      // given
      sinon.stub(courseController, 'get').returns('ok');
      const httpTestServer = new HttpTestServer();
      await httpTestServer.register(moduleUnderTest);

      // when
      const response = await httpTestServer.request('GET', '/api/courses/course_id');

      // then
      expect(response.statusCode).to.equal(200);
    });
  });
});
