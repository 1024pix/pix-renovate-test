import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixTextarea from '@1024pix/pix-ui/components/pix-textarea';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';

import AdministrationBlockLayout from '../block-layout';

export default class CertificationScoringConfiguration extends Component {
  @service store;
  @service pixToast;
  certificationScoringConfiguration = '';

  @action
  onCertificationScoringConfigurationChange(event) {
    this.certificationScoringConfiguration = event.target.value;
  }

  @action
  async onCertificationScoringConfigurationSubmit(event) {
    event.preventDefault();
    const adapter = this.store.adapterFor('scoring-configuration');
    try {
      await adapter.updateCertificationScoringConfiguration(this.certificationScoringConfiguration);
      this.pixToast.sendSuccessNotification({ message: 'Configuration enregistrée' });
    } catch (_) {
      this.pixToast.sendErrorNotification({ message: "La config n'a pas pu être ajoutée" });
    }
  }

  <template>
    <AdministrationBlockLayout
      @title={{t "pages.administration.certification.certification-scoring-configuration.title"}}
    >
      <form
        class="certification-scoring-configuration-form"
        {{on "submit" this.onCertificationScoringConfigurationSubmit}}
      >
        <PixTextarea
          @id="certification-scoring-configuration"
          rows="4"
          @value={{this.certificationScoringConfiguration}}
          {{on "change" this.onCertificationScoringConfigurationChange}}
        >
          <:label>{{t "pages.administration.certification.certification-scoring-configuration.form.label"}}</:label>
        </PixTextarea>
        <PixButton @type="submit">{{t "common.actions.save"}}</PixButton>
      </form>
    </AdministrationBlockLayout>
  </template>
}
