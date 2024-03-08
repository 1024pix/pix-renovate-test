import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ToBePublishedSessionsList extends Component {
  @service accessControl;

  @tracked shouldShowModal = false;
  currentSelectedSession;

  _cancelModalSelection() {
    this.shouldShowModal = false;
    this.currentSelectedSession = null;
  }

  @action
  showConfirmModal(currentSelectedSession) {
    this.shouldShowModal = true;
    this.currentSelectedSession = currentSelectedSession;
  }

  @action
  hideConfirmModal() {
    this._cancelModalSelection();
  }

  @action
  publishSession() {
    this.args.publishSession(this.currentSelectedSession);
    this._cancelModalSelection();
  }
}
