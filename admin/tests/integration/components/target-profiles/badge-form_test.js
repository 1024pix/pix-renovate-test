import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

module('Integration | Component | TargetProfiles::BadgeForm', function (hooks) {
  setupRenderingTest(hooks);

  test('it should display the form', async function (assert) {
    // when
    await render(hbs`<TargetProfiles::BadgeForm />`);

    // then
    assert.dom('form').exists();
    assert.dom('input').exists();
  });

  test('it should display the expected number of inputs', async function (assert) {
    // given
    const expectedNumberOfInputsInForm = 8;
    const expectedNumberOfTextareasInForm = 1;
    const expectedNumberOfCheckboxesInForm = 2;

    // when
    await render(hbs`<TargetProfiles::BadgeForm />`);

    // then
    assert.dom('input, textarea').exists({ count: expectedNumberOfInputsInForm });
    assert.dom('textarea').exists({ count: expectedNumberOfTextareasInForm });
    assert.dom('input[type="checkbox"]').exists({ count: expectedNumberOfCheckboxesInForm });
  });

  test('it should display form actions', async function (assert) {
    // when
    await render(hbs`<TargetProfiles::BadgeForm />`);

    // then
    assert.dom('a[data-test="badge-form-cancel-button"]').exists();
    assert.dom('button[data-test="badge-form-submit-button"]').exists();
  });

  test('should send badge creation request to api', async function (assert) {
    // given
    const store = this.owner.lookup('service:store');
    const createRecordMock = sinon.mock();
    createRecordMock.returns({ save: function () {} });
    store.createRecord = createRecordMock;

    await render(hbs`<TargetProfiles::BadgeForm />`);

    // when
    await fillIn('input#badge-key', 'clé_du_badge');
    await fillIn('input#image-url', 'https://image-url.pix.fr');
    await fillIn('input#alt-message', 'texte alternatif à l‘image');
    await click('button[data-test="badge-form-submit-button"]');

    assert.ok(
      createRecordMock.calledWith('badge', {
        key: 'clé_du_badge',
        altMessage: 'texte alternatif à l‘image',
        imageUrl: 'https://image-url.pix.fr',
        message: '',
        title: '',
        isCertifiable: false,
        isAlwaysVisible: false,
      })
    );
  });
});
