import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | routes/authenticated/campaign | list-items', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('goToCampaignPageSpy', () => {});
    this.set('triggerFilteringSpy', () => {});
  });

  test('it should display a list of campaigns', async function(assert) {
    // given
    const campaigns = [
      { name: 'campagne 1', code: 'AAAAAA111' },
      { name: 'campagne 2', code: 'BBBBBB222' },
    ];
    campaigns.meta = {
      rowCount: 2
    };
    this.set('campaigns', campaigns);

    // when
    await render(hbs`{{routes/authenticated/campaigns/list-items campaigns=campaigns triggerFiltering=triggerFilteringSpy goToCampaignPage=goToCampaignPageSpy}}`);

    // then
    assert.dom('.campaign-list').exists();
    assert.dom('.campaign-list .table tbody tr').exists({ count: 2 });
  });

  test('it should display the name of the campaigns', async function(assert) {
    // given
    const store = this.owner.lookup('service:store');
    const campaign1 = run(() => store.createRecord('campaign', {
      id: 1,
      name: 'campagne 1',
      code: 'AAAAAA111'
    }));
    const campaign2 = run(() => store.createRecord('campaign', {
      id: 2,
      name: 'campagne 1',
      code: 'BBBBBB222'
    }));
    const campaigns = [campaign1, campaign2];
    campaigns.meta = {
      rowCount: 2
    };
    this.set('campaigns', campaigns);

    // when
    await render(hbs`{{routes/authenticated/campaigns/list-items campaigns=campaigns triggerFiltering=triggerFilteringSpy goToCampaignPage=goToCampaignPageSpy}}`);

    // then
    assert.dom('.campaign-list .table tbody tr:first-child td:first-child').hasText('campagne 1');
  });

  test('it should display the participations count', async function(assert) {
    // given
    const store = this.owner.lookup('service:store');
    const campaignReport = run(() => store.createRecord('campaignReport', {
      id: 1,
      participationsCount: 10,
      sharedParticipationsCount: 4,
    }));

    const campaign1 = run(() => store.createRecord('campaign', {
      id: 1,
      name: 'campagne 1',
      code: 'AAAAAA111',
      campaignReport
    }));

    const campaigns = [campaign1];
    campaigns.meta = {
      rowCount: 1
    };
    this.set('campaigns', campaigns);

    // when
    await render(hbs`{{routes/authenticated/campaigns/list-items campaigns=campaigns triggerFiltering=triggerFilteringSpy goToCampaignPage=goToCampaignPageSpy}}`);

    // then
    assert.dom('.campaign-list .table tbody tr:first-child td:nth-child(2)').hasText('10');
  });

  test('it should display the shared participations count', async function(assert) {
    // given
    const store = this.owner.lookup('service:store');
    const campaignReport = run(() => store.createRecord('campaignReport', {
      id: 1,
      participationsCount: 10,
      sharedParticipationsCount: 4,
    }));

    const campaign1 = run(() => store.createRecord('campaign', {
      id: 1,
      name: 'campagne 1',
      code: 'AAAAAA111',
      campaignReport
    }));

    const campaigns = [campaign1];
    campaigns.meta = {
      rowCount: 1
    };
    this.set('campaigns', campaigns);

    // when
    await render(hbs`{{routes/authenticated/campaigns/list-items campaigns=campaigns triggerFiltering=triggerFilteringSpy goToCampaignPage=goToCampaignPageSpy}}`);

    // then
    assert.dom('.campaign-list .table tbody tr:first-child td:nth-child(3)').hasText('4');
  });
});
