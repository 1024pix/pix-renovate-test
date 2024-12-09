import { clickByName, clickByText, render } from '@1024pix/ember-testing-library';
import { click } from '@ember/test-helpers';
import { t } from 'ember-intl/test-support';
import ModulixNavbar from 'mon-pix/components/module/navbar';
import { module, test } from 'qunit';
import sinon from 'sinon';

import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';
import { waitForDialog, waitForDialogClose } from '../../../helpers/wait-for';

module('Integration | Component | Module | Navbar', function (hooks) {
  setupIntlRenderingTest(hooks);

  module('when at first step', function () {
    test('should display step 1 with empty progress bar', async function (assert) {
      // given
      const module = createModule(this.owner);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar @currentStep={{1}} @totalSteps={{3}} @module={{module}} @grainsToDisplay={{module.grains}} />
        </template>,
      );

      // then
      assert.ok(screen);
      assert.dom(screen.getByRole('navigation', { name: 'Étape 1 sur 3' })).exists();
      assert.dom('.progress-bar__bar').hasValue(0);
    });
  });

  module('when at step 2 of 3', function () {
    test('should display step 2 with half-filled progress bar', async function (assert) {
      // given
      const module = createModule(this.owner);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar @currentStep={{2}} @totalSteps={{3}} @module={{module}} @grainsToDisplay={{module.grains}} />
        </template>,
      );

      // then
      assert.ok(screen);
      assert.dom(screen.getByRole('navigation', { name: 'Étape 2 sur 3' })).exists();
      assert.dom('.progress-bar__bar').hasValue(50);
    });
  });

  module('when at last step', function () {
    test('should display step 3 with full-filled progress bar', async function (assert) {
      // given
      const module = createModule(this.owner);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar @currentStep={{3}} @totalSteps={{3}} @module={{module}} @grainsToDisplay={{module.grains}} />
        </template>,
      );

      // then
      assert.ok(screen);
      assert.dom(screen.getByRole('navigation', { name: 'Étape 3 sur 3' })).exists();
      assert.dom('.progress-bar__bar').hasValue(100);
    });
  });

  module('when there is only one step', function () {
    test('should display step 1/1 and a full-filled progress bar', async function (assert) {
      // given
      const module = createModule(this.owner);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar @currentStep={{1}} @totalSteps={{1}} @module={{module}} @grainsToDisplay={{module.grains}} />
        </template>,
      );

      // then
      assert.ok(screen);
      assert.dom(screen.getByRole('navigation', { name: 'Étape 1 sur 1' })).exists();
      assert.dom('.progress-bar__bar').hasValue(100);
    });
  });

  module('when user opens sidebar', function () {
    test('should display sidebar', async function (assert) {
      // given
      const module = createModule(this.owner);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar @currentStep={{1}} @totalSteps={{3}} @module={{module}} @grainsToDisplay={{module.grains}} />
        </template>,
      );
      const sidebarOpenButton = screen.getByRole('button', { name: 'Afficher les étapes du module' });
      await click(sidebarOpenButton);
      await waitForDialog();

      // then
      assert.ok(screen);
      assert.dom(screen.getByRole('dialog', { name: module.title })).exists();
    });

    test('should display steps list in sidebar', async function (assert) {
      // given
      const module = createModule(this.owner);
      const threeFirstGrains = module.grains.slice(0, -1);

      //  when
      const screen = await render(
        <template>
          <ModulixNavbar
            @currentStep={{3}}
            @totalSteps={{4}}
            @module={{module}}
            @grainsToDisplay={{threeFirstGrains}}
          />
        </template>,
      );
      await clickByName('Afficher les étapes du module');
      await waitForDialog();

      // then
      assert.strictEqual(
        screen.getByRole('link', { name: 'Découverte' }).textContent.trim(),
        t('pages.modulix.grain.tag.discovery'),
      );
      assert.strictEqual(
        screen.getByRole('link', { name: 'Activité' }).textContent.trim(),
        t('pages.modulix.grain.tag.activity'),
      );
      assert.strictEqual(
        screen.getByRole('link', { name: 'Leçon' }).textContent.trim(),
        t('pages.modulix.grain.tag.lesson'),
      );
      assert.dom(screen.getByRole('link', { name: 'Leçon' })).hasAria('current', 'step');

      assert.dom(screen.queryByRole('link', { name: "Récap'" })).doesNotExist();
    });

    module('when user clicks on grain’s type', function () {
      test('should call goToGrain action on matching grain element', async function (assert) {
        // given
        const module = createModule(this.owner);
        const threeFirstGrains = module.grains.slice(0, -1);
        const goToGrainSpy = sinon.spy();

        //  when
        await render(
          <template>
            <ModulixNavbar
              @currentStep={{3}}
              @totalSteps={{4}}
              @module={{module}}
              @grainsToDisplay={{threeFirstGrains}}
              @goToGrain={{goToGrainSpy}}
            />
          </template>,
        );
        await clickByName('Afficher les étapes du module');
        await waitForDialog();
        await clickByText('Activité');

        // then
        sinon.assert.calledOnce(goToGrainSpy);
        sinon.assert.calledWithExactly(goToGrainSpy, '234-abc');
        assert.ok(true);
      });

      test('should close sidebar', async function (assert) {
        // given
        const module = createModule(this.owner);
        const threeFirstGrains = module.grains.slice(0, -1);
        const goToGrainMock = sinon.mock();

        //  when
        const screen = await render(
          <template>
            <ModulixNavbar
              @currentStep={{3}}
              @totalSteps={{4}}
              @module={{module}}
              @grainsToDisplay={{threeFirstGrains}}
              @goToGrain={{goToGrainMock}}
            />
          </template>,
        );
        await clickByName('Afficher les étapes du module');
        await waitForDialog();
        await clickByText('Activité');
        await waitForDialogClose();

        // then
        assert.dom(screen.queryByRole('dialog', { name: module.title })).doesNotExist();
      });
    });
  });
});

function createModule(owner) {
  const store = owner.lookup('service:store');
  const grain1 = store.createRecord('grain', { title: 'Grain title', type: 'discovery', id: '123-abc' });
  const grain2 = store.createRecord('grain', { title: 'Grain title', type: 'activity', id: '234-abc' });
  const grain3 = store.createRecord('grain', { title: 'Grain title', type: 'lesson', id: '345-abc' });
  const grain4 = store.createRecord('grain', { title: 'Grain title', type: 'summary', id: '456-abc' });
  return store.createRecord('module', {
    title: 'Didacticiel',
    grains: [grain1, grain2, grain3, grain4],
    transitionTexts: [],
  });
}
