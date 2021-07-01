import EmberObject from '@ember/object';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { contains } from '../../helpers/contains';
import setupIntlRenderingTest from '../../helpers/setup-intl-rendering';
import { clickByLabel } from '../../helpers/click-by-label';
import sinon from 'sinon';

describe('Integration | Component | recover-account-confirmation-step', function() {
  setupIntlRenderingTest();

  it('should render account recovery confirmation step', async function() {
    // given
    const studentInformationForAccountRecovery = EmberObject.create({
      firstName: 'Philippe',
      lastName: 'Auguste',
      username: 'Philippe.auguste2312',
      email: 'philippe.auguste@example.net',
      latestOrganizationName: 'Collège George-Besse, Loches',
    });
    this.set('studentInformationForAccountRecovery', studentInformationForAccountRecovery);

    // when
    await render(hbs`<RecoverAccountConfirmationStep
      @studentInformationForAccountRecovery={{this.studentInformationForAccountRecovery}}
    />`);

    // then
    expect(contains(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.good-news', { firstName: 'Philippe' }))).to.exist;
    expect(contains(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.found-account'))).to.exist;
    expect(contains(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.contact-support'))).to.exist;
    expect(contains('Auguste'));
    expect(contains('Philippe'));
    expect(contains('Philippe.auguste2312'));
    expect(contains('Collège George-Besse, Loches'));
    expect(contains(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.certify-account'))).to.exist;
  });

  it('should be possible to cancel the account recovery process', async function() {
    // given
    const studentInformationForAccountRecovery = EmberObject.create({
      firstName: 'Philippe',
      lastName: 'Auguste',
      username: 'Philippe.auguste2312',
      email: 'philippe.auguste@example.net',
      latestOrganizationName: 'Collège George-Besse, Loches',
    });
    this.set('studentInformationForAccountRecovery', studentInformationForAccountRecovery);
    const cancelAccountRecovery = sinon.stub();
    this.set('cancelAccountRecovery', cancelAccountRecovery);

    // when
    await render(hbs`<RecoverAccountConfirmationStep
      @studentInformationForAccountRecovery={{this.studentInformationForAccountRecovery}}
      @cancelAccountRecovery={{this.cancelAccountRecovery}}
    />`);
    await clickByLabel(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.buttons.cancel'));

    // then
    sinon.assert.calledOnce(cancelAccountRecovery);
  });

  it('should be possible to continue the account recovery process', async function() {
    // given
    const studentInformationForAccountRecovery = EmberObject.create({
      firstName: 'Philippe',
      lastName: 'Auguste',
      username: 'Philippe.auguste2312',
      email: 'philippe.auguste@example.net',
      latestOrganizationName: 'Collège George-Besse, Loches',
    });
    this.set('studentInformationForAccountRecovery', studentInformationForAccountRecovery);
    const continueAccountRecovery = sinon.stub();
    this.set('continueAccountRecovery', continueAccountRecovery);

    // when
    await render(hbs`<RecoverAccountConfirmationStep
      @studentInformationForAccountRecovery={{this.studentInformationForAccountRecovery}}
      @continueAccountRecovery={{this.continueAccountRecovery}}
    />`);
    await clickByLabel(this.intl.t('pages.recover-account-after-leaving-sco.confirmation-step.buttons.confirm'));

    // then
    sinon.assert.calledOnce(continueAccountRecovery);
  });
});
