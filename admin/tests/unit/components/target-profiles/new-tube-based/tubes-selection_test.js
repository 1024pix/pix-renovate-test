import { module, test } from 'qunit';
import { A as EmberArray } from '@ember/array';
import { setupTest } from 'ember-qunit';

import createComponent from '../../../../helpers/create-glimmer-component';

module('Unit | Component | authenticated/target-profiles/new-tube-based/tubes-selection', function (hooks) {
  setupTest(hooks);

  let component;

  hooks.beforeEach(function () {
    component = createComponent('component:target-profiles/new-tube-based/tubes-selection');
  });

  module('#checkTube', function () {
    test('it should populate tubesSelected if element is checked with a selected level', function (assert) {
      // given

      const tube = {
        id: 'tubeId',
        name: 'tubeName',
      };
      const expectedTubesSelected = ['tubeId'];

      // when
      component.checkTube(tube);

      // then

      assert.deepEqual(component.tubesSelected, expectedTubesSelected);
    });
  });

  module('#uncheckTube', function () {
    test('it should remove tube from tubesSelected if element is not checked', function (assert) {
      // given
      component.tubesSelected = EmberArray(['tubeId']);

      const tube = {
        id: 'tubeId',
        name: 'tubeName',
      };

      // when
      component.uncheckTube(tube);

      // then

      assert.deepEqual(component.tubesSelected, []);
    });
  });

  module('#setLevelTube', function () {
    test('it should set a level on tube', function (assert) {
      // given
      component.tubeLevels = {
        tubeId2: '3',
      };

      // when
      component.setLevelTube('tubeId1', '5');

      // then

      assert.deepEqual(component.tubeLevels, {
        tubeId1: 5,
        tubeId2: 3,
      });
    });
  });

  module('#haveNoTubeSelected', function () {
    module('when some tubes are selected', function () {
      test('it should return false', function (assert) {
        // given
        component.tubesSelected = EmberArray(['tubeId']);

        // then
        assert.false(component.haveNoTubeSelected);
      });
    });

    module('when no tubes are selected', function () {
      test('it should return true', function (assert) {
        // given
        component.tubesSelected = EmberArray([]);

        // then
        assert.true(component.haveNoTubeSelected);
      });
    });
  });

  module('#numberOfTubesSelected', function () {
    test('it should return the number of selected tubes', function (assert) {
      // given
      component.tubesSelected = EmberArray(['tube1', 'tube2', 'tube3', 'tube4', 'tube5', 'tube6']);

      // when
      const result = component.numberOfTubesSelected;

      // then
      assert.strictEqual(result, 6);
    });
  });

  module('#hasNoFrameworksSelected', function () {
    module('when some frameworks are selected', function () {
      test('it should return false', function (assert) {
        // given
        component.args.selectedFrameworks = [{ id: 'fmk1' }, { id: 'fmk2' }];

        // then
        assert.false(component.hasNoFrameworksSelected);
      });
    });

    module('when no frameworks are selected', function () {
      test('it should return true', function (assert) {
        // given
        component.args.selectedFrameworks = [];

        // then
        assert.true(component.hasNoFrameworksSelected);
      });
    });
  });
});
