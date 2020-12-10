import { describe, it } from 'mocha';
import { expect } from 'chai';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupIntlRenderingTest from '../../../helpers/setup-intl-rendering';

describe.only('Integration | Component | Dashboard | Content', function() {
  setupIntlRenderingTest();

  it('should render component', async function() {
    // when
    await render(hbs`<Dashboard::Content />}`);

    // then
    expect(find('.dashboard-content')).to.exist;
  });
});
