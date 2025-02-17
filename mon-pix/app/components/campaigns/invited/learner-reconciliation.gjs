import PixBackgroundHeader from '@1024pix/pix-ui/components/pix-background-header';
import PixBlock from '@1024pix/pix-ui/components/pix-block';
import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixInput from '@1024pix/pix-ui/components/pix-input';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { t } from 'ember-intl';

dayjs.extend(LocalizedFormat);
dayjs.extend(CustomParseFormat);

export default class LearnerReconciliation extends Component {
  @service intl;
  @tracked reconciliationFieldData;

  constructor() {
    super(...arguments);

    this.reconciliationFieldData = [];

    this.args.reconciliationFields.forEach(({ fieldId, name, type }) => {
      this.reconciliationFieldData.push({
        id: fieldId,
        type,
        value: null,
        status: 'default',
        errorMessage: null,
        label: this.args.mappingFields[name] || name,
        subLabel: this._getSubLabel(type),
      });
    });
  }

  @action
  async submitHandler(event) {
    event.preventDefault();

    this._validateForm();

    if (this.isFormInvalid) return;

    this.args.onSubmit(
      this.reconciliationFieldData.reduce((object, reconciliationField) => {
        if (reconciliationField.type === 'date') {
          object[reconciliationField.id] = dayjs(reconciliationField.value, 'L', true).format('YYYY-MM-DD');
        } else {
          object[reconciliationField.id] = reconciliationField.value;
        }

        return object;
      }, {}),
    );
  }

  get isFormInvalid() {
    return Object.values(this.reconciliationFieldData).some((field) => field.status === 'error');
  }

  _getSubLabel(type) {
    if (type === 'date') {
      return this.intl.t('components.invited.reconciliation.field.sub-label.date', {
        dateFormat: dayjs('2020-12-31').format('L'),
      });
    } else {
      return null;
    }
  }

  _validateForm() {
    const fields = this.reconciliationFieldData.map((field) => {
      if (!field.value) {
        return {
          ...field,
          status: 'error',
          errorMessage: this.intl.t('components.invited.reconciliation.error-message.mandatory-field', {
            fieldName: this.intl.t(field.label),
          }),
        };
      }

      if (field.type === 'date') {
        const isValidDate = dayjs(field.value, 'L', true).isValid();

        if (!isValidDate) {
          return {
            ...field,
            status: 'error',
            errorMessage: this.intl.t('components.invited.reconciliation.error-message.date-field', {
              fieldName: this.intl.t(field.label),
            }),
          };
        }
      }

      return { ...field, status: '', errorMessage: null };
    });
    // force tracked properties to update as they don't detect deep changes
    this.reconciliationFieldData = fields;
  }

  @action
  updateFields(index, event) {
    this.reconciliationFieldData[index].value = event.target.value.trim();
  }

  <template>
    <PixBackgroundHeader>
      <PixBlock class="learner-reconciliation">
        <header class="learner-reconciliation__title-container" role="banner">
          <h1 class="learner-reconciliation__title">{{t
              "components.invited.reconciliation.title"
              organizationName=@organizationName
            }}</h1>

          <p class="learner-reconciliation__sub-title">{{t "common.form.mandatory-all-fields"}}</p>
        </header>

        <form onSubmit={{this.submitHandler}} role="form" class="learner-reconciliation__form">
          {{#each this.reconciliationFieldData as |reconciliationField index|}}
            <PixInput
              @id={{reconciliationField.id}}
              @errorMessage={{reconciliationField.errorMessage}}
              @validationStatus={{reconciliationField.status}}
              @value={{reconciliationField.value}}
              @subLabel={{reconciliationField.subLabel}}
              {{on "change" (fn this.updateFields index)}}
            >
              <:label>{{t reconciliationField.label}}</:label>
            </PixInput>
          {{/each}}
          {{#if @reconciliationError}}
            <div class="join-restricted-campaign__error" aria-live="polite">{{@reconciliationError}}</div>
          {{/if}}
          <PixButton @type="submit" @isLoading={{@isLoading}}>{{t "common.actions.lets-go"}}</PixButton>
        </form>
      </PixBlock>
    </PixBackgroundHeader>
  </template>
}
