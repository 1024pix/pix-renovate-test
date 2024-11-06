import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixButtonLink from '@1024pix/pix-ui/components/pix-button-link';
import PixInput from '@1024pix/pix-ui/components/pix-input';
import PixMessage from '@1024pix/pix-ui/components/pix-message';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import ENV from 'mon-pix/config/environment';
import { FormValidation } from 'mon-pix/utils/form-validation';

import isEmailValid from '../../../utils/email-validator.js';
import PasswordResetDemandReceivedInfo from './password-reset-demand-received-info';

export default class PasswordResetDemandForm extends Component {
  @service errors;

  @tracked globalError = this.errors.hasErrors && this.errors.shift();
  @tracked isLoading = false;
  @tracked isPasswordResetDemandReceived = false;

  validation = new FormValidation({
    email: {
      validate: (value) => isEmailValid(value),
      error: 'components.authentication.password-reset-demand-form.fields.email.error-message-invalid',
    },
  });

  @action
  handleEmailChange(event) {
    this.email = event.target.value?.trim();
    this.validation.email.validate(this.email);
  }

  @action
  async handlePasswordResetDemand(event) {
    if (event) event.preventDefault();

    const email = this.email?.trim();

    const isValid = this.validation.validateAll({ email });
    if (!isValid) return;

    this.globalError = null;
    this.isLoading = true;
    this.isPasswordResetDemandReceived = false;

    try {
      const response = await window.fetch(`${ENV.APP.API_HOST}/api/password-reset-demands`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!response.ok && response.status != 404) {
        throw new Error(`Response status: ${response.status}`);
      }

      this.isPasswordResetDemandReceived = true;
    } catch (error) {
      this.globalError = 'common.api-error-messages.internal-server-error';
    } finally {
      this.isLoading = false;
    }
  }

  <template>
    {{#if this.isPasswordResetDemandReceived}}
      <PasswordResetDemandReceivedInfo />
    {{else}}
      <form {{on "submit" this.handlePasswordResetDemand}} class="authentication-password-reset-demand-form">
        <p class="authentication-password-reset-demand-form__rule">
          {{t "components.authentication.password-reset-demand-form.rule"}}
        </p>

        {{#if this.globalError}}
          <PixMessage
            @type="error"
            @withIcon={{true}}
            class="authentication-password-reset-demand-form__error"
            role="alert"
          >
            {{t this.globalError}}
          </PixMessage>
        {{/if}}

        <div class="authentication-password-reset-demand-form__input-block">
          <PixInput
            @value={{this.email}}
            {{on "change" this.handleEmailChange}}
            @validationStatus={{this.validation.email.status}}
            @errorMessage={{t this.validation.email.error}}
            placeholder={{t "components.authentication.password-reset-demand-form.fields.email.placeholder"}}
            aria-required="true"
            autocomplete="email"
          >
            <:label>{{t "components.authentication.password-reset-demand-form.fields.email.label"}}</:label>
          </PixInput>
        </div>

        <div>
          <PixButton
            @type="submit"
            @isLoading={{this.isLoading}}
            @isDisabled={{this.isFormDisabled}}
            class="authentication-password-reset-demand-form__button"
          >
            {{t "components.authentication.password-reset-demand-form.actions.receive-reset-button"}}
          </PixButton>
        </div>

        <p class="authentication-password-reset-demand-form__help">
          {{t "components.authentication.password-reset-demand-form.no-email-question"}}
          <PixButtonLink
            @variant="tertiary"
            @href="{{t 'components.authentication.password-reset-demand-form.contact-us-link.link-url'}}"
            target="_blank"
            class="authentication-password-reset-demand-form__help-contact-us-link"
          >
            {{t "components.authentication.password-reset-demand-form.contact-us-link.link-text"}}
          </PixButtonLink>
        </p>
      </form>
    {{/if}}
  </template>
}
