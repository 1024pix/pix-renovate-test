import { render } from '@1024pix/ember-testing-library';
import { setupRenderingTest } from 'ember-qunit';
import Cgu from 'pix-admin/components/users/cgu';
import { module, test } from 'qunit';

import setupIntl from '../../../helpers/setup-intl';

module('Integration | Component | cgu', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.intl = this.owner.lookup('service:intl');
  });

  test('displays correct Terms of Service status for Pix App, Pix Orga and Pix Certif', async function (assert) {
    //Given

    const cgu = true;
    const lastTermsOfServiceValidatedAt = new Date('2021-12-10');
    const pixOrgaTermsOfServiceAccepted = true;
    const lastPixOrgaTermsOfServiceValidatedAt = null;
    const pixCertifTermsOfServiceAccepted = false;
    const lastPixCertifTermsOfServiceValidatedAt = null;

    const appDomain = this.intl.t('components.users.user-detail-personal-information.cgu.validation.domain.pix-app');
    const validatedWithDate = this.intl.t(
      'components.users.user-detail-personal-information.cgu.validation.status.validated-with-date',
      { formattedDate: '10/12/2021' },
    );

    const orgaDomain = this.intl.t('components.users.user-detail-personal-information.cgu.validation.domain.pix-orga');
    const validated = this.intl.t('components.users.user-detail-personal-information.cgu.validation.status.validated');

    const certifDomain = this.intl.t(
      'components.users.user-detail-personal-information.cgu.validation.domain.pix-certif',
    );
    const nonValidated = this.intl.t(
      'components.users.user-detail-personal-information.cgu.validation.status.non-validated',
    );

    //When
    const screen = await render(
      <template>
        <Cgu
          @lastTermsOfServiceValidatedAt={{lastTermsOfServiceValidatedAt}}
          @cgu={{cgu}}
          @lastPixOrgaTermsOfServiceValidatedAt={{lastPixOrgaTermsOfServiceValidatedAt}}
          @pixOrgaTermsOfServiceAccepted={{pixOrgaTermsOfServiceAccepted}}
          @lastPixCertifTermsOfServiceValidatedAt={{lastPixCertifTermsOfServiceValidatedAt}}
          @pixCertifTermsOfServiceAccepted={{pixCertifTermsOfServiceAccepted}}
        />
      </template>,
    );

    //Then
    assert.dom(screen.queryByText(`${appDomain} ${validatedWithDate}`)).exists();
    assert.dom(screen.queryByText(`${orgaDomain} ${validated}`)).exists();
    assert.dom(screen.queryByText(`${certifDomain} ${nonValidated}`)).exists();
  });
});
