import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Route | authenticated/sessions/add-student', function(hooks) {
  setupTest(hooks);
  let route;

  module('#model', function(hooks) {
    const session_id = 1;
    const session = { id: session_id };
    const certificationCenterId = Symbol('certificationCenterId');
    const studentEnriched = [{ id: '1', firstName: 'Tom', lastName: 'Dupont', isEnrolled: true }];
    const expectedModel = {
      session,
      students: studentEnriched,
    };

    hooks.beforeEach(function() {
      route = this.owner.lookup('route:authenticated/sessions/add-student');
    });

    test('it should return the session', async function(assert) {
      // given
      const findRecordStub = sinon.stub();
      findRecordStub.withArgs('session', session_id).resolves(session);
      route.store.findRecord = findRecordStub;
      route.modelFor = sinon.stub().returns({ id: certificationCenterId });
      route.store.findAll = sinon.stub().resolves(studentEnriched);

      // when
      const actualModel = await route.model({ session_id });

      // then
      sinon.assert.calledWith(route.modelFor, 'authenticated');
      sinon.assert.calledWith(route.store.findAll, 'student', { adapterOptions : { certificationCenterId, sessionId: session.id } });
      assert.deepEqual(actualModel, expectedModel);
    });
  });
});
