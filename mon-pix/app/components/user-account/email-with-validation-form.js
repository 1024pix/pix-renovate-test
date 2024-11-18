import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import isEmailValid from '../../utils/email-validator';

const ERROR_INPUT_MESSAGE_MAP = {
  invalidEmail: 'pages.user-account.account-update-email-with-validation.fields.errors.invalid-email',
  emptyPassword: 'pages.user-account.account-update-email-with-validation.fields.errors.empty-password',
  emailAlreadyExist: 'pages.user-account.account-update-email-with-validation.fields.errors.new-email-already-exist',
  invalidOrAlreadyUsedEmail:
    'pages.user-account.account-update-email-with-validation.fields.errors.invalid-or-already-used-email',
  invalidPassword: 'pages.user-account.account-update-email-with-validation.fields.errors.invalid-password',
  unknownError: 'pages.user-account.account-update-email.fields.errors.unknown-error',
};

export default class EmailWithValidationForm extends Component {
  @service intl;
  @service store;
  @tracked newEmail = '';
  @tracked password = '';
  @tracked newEmailValidationMessage = null;
  @tracked errorMessage = null;
  @tracked hasRequestedUpdate = false;
  @tracked newEmailValidationStatus = 'default';

  get isFormValid() {
    return isEmailValid(this.newEmail) && !isEmpty(this.password);
  }

  @action
  validateNewEmail(event) {
    this.newEmail = event.target.value;
    this.newEmail = this.newEmail.trim();
    const isInvalidInput = !isEmailValid(this.newEmail);

    this.newEmailValidationMessage = null;
    this.newEmailValidationStatus = 'default';

    if (isInvalidInput) {
      this.newEmailValidationStatus = 'error';
      this.newEmailValidationMessage = this.intl.t(ERROR_INPUT_MESSAGE_MAP['invalidEmail']);
    }
  }

  @action
  async onSubmit(event) {
    event && event.preventDefault();

    this.errorMessage = null;

    if (this.isFormValid) {
      try {
        if (!this.hasRequestedUpdate) {
          this.hasRequestedUpdate = true;

          const emailVerificationCode = this.store.createRecord('email-verification-code', {
            password: this.password,
            newEmail: this.newEmail,
          });
          await emailVerificationCode.sendNewEmail();

          this.args.showVerificationCode({ newEmail: this.newEmail, password: this.password });
        }
      } catch (response) {
        this.handleSubmitError(response);
      } finally {
        this.hasRequestedUpdate = false;
      }
    }
  }

  @action
  passwordChanged(event) {
    this.password = event.target.value;
  }

  handleSubmitError(response) {
    const status = get(response, 'errors[0].status');
    if (status === '422') {
      const pointer = get(response, 'errors[0].source.pointer');
      if (pointer.endsWith('email')) {
        this.errorMessage = this.intl.t(ERROR_INPUT_MESSAGE_MAP['invalidOrAlreadyUsedEmail']);
      }
      if (pointer.endsWith('password')) {
        this.errorMessage = this.intl.t(ERROR_INPUT_MESSAGE_MAP['emptyPassword']);
      }
    } else if (status === '400') {
      this.errorMessage = this.intl.t(ERROR_INPUT_MESSAGE_MAP['invalidPassword']);
    } else {
      this.errorMessage = this.intl.t(ERROR_INPUT_MESSAGE_MAP['unknownError']);
    }
  }
}
