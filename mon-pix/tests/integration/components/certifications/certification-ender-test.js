import { render as renderScreen } from '@1024pix/ember-testing-library';
import { hbs } from 'ember-cli-htmlbars';
import { t } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import { stubCurrentUserService } from '../../../helpers/service-stubs';
import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

module('Integration | Component | Certifications | CertificationEnder', function (hooks) {
  setupIntlRenderingTest(hooks);

  test('should display the translated labels', async function (assert) {
    // when
    const screen = await renderScreen(hbs`<Certifications::CertificationEnder />`);

    // then
    assert.ok(screen.getByText(t('pages.certification-ender.candidate.title')));
  });

  test('should display the certification number', async function (assert) {
    // given
    this.certificationNumber = 1234;

    // when
    const screen = await renderScreen(
      hbs`<Certifications::CertificationEnder @certificationNumber={{this.certificationNumber}} />`,
    );

    // then
    assert.ok(screen.getByText(1234));
  });

  test('should display the current user name', async function (assert) {
    // given
    stubCurrentUserService(this.owner, { firstName: 'Jim', lastName: 'Halpert' });

    // when
    const screen = await renderScreen(
      hbs`<Certifications::CertificationEnder @certificationNumber={{this.certificationNumber}} />`,
    );

    // then
    assert.ok(screen.getByText('Jim Halpert'));
  });

  test('should display the remote certification logout message', async function (assert) {
    // when
    const screen = await renderScreen(
      hbs`<Certifications::CertificationEnder @certificationNumber={{this.certificationNumber}} />`,
    );

    // then
    assert.ok(screen.getByText(t('pages.certification-ender.candidate.remote-certification')));
  });

  module('when the assessment status is not ended by supervisor', function () {
    test('should not display the ended by supervisor text', async function (assert) {
      // given
      stubCurrentUserService(this.owner, { firstName: 'Jim', lastName: 'Halpert' });

      // when
      const screen = await renderScreen(
        hbs`<Certifications::CertificationEnder @certificationNumber={{this.certificationNumber}} @isEndedBySupervisor={{false}} />`,
      );

      // then
      assert.notOk(screen.queryByText(t('pages.certification-ender.candidate.ended-by-supervisor')));
    });
  });

  module('when the assessment status is ended by supervisor', function () {
    test('should display the ended by supervisor text', async function (assert) {
      // given
      stubCurrentUserService(this.owner, { firstName: 'Jim', lastName: 'Halpert' });

      // when
      const screen = await renderScreen(
        hbs`<Certifications::CertificationEnder @certificationNumber={{this.certificationNumber}} @isEndedBySupervisor={{true}} />`,
      );

      // then
      assert.ok(screen.getByText(t('pages.certification-ender.candidate.ended-by-supervisor')));
    });
  });

  module('when the assessment status is ended by finalization', function () {
    test('should display the ended by finalization text', async function (assert) {
      // given
      stubCurrentUserService(this.owner, { firstName: 'Jim', lastName: 'Halpert' });

      // when
      const screen = await renderScreen(hbs`<Certifications::CertificationEnder
  @certificationNumber={{this.certificationNumber}}
  @hasBeenEndedDueToFinalization={{true}}
/>`);

      // then
      assert.ok(screen.getByText(t('pages.certification-ender.candidate.ended-due-to-finalization')));
    });
  });
});
