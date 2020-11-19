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

    const paginatedStudents =  {
      data: [{ id: '1', firstName: 'Tom', lastName: 'Dupont', isEnrolled: true }],
      meta: {
        page: 1,
        pageCount: 1,
        pageSize: 10,
        rowCount: 5,
      },
    };

    const expectedModel = {
      session,
      students: paginatedStudents,
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
      route.store.query = sinon.stub().resolves(paginatedStudents);

      // when
      const actualModel = await route.model({ session_id, pageNumber: 1, pageSize: 1  });

      // then
      sinon.assert.calledWith(route.modelFor, 'authenticated');
      sinon.assert.calledWith(route.store.query, 'student', { 
        filter: {
          certificationCenterId, 
          sessionId: session.id, 
        },
        page: {
          size: 1,
          number:1,
        }, 
      },
      );
      assert.deepEqual(actualModel, expectedModel);
    });
  });
});
