import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixIcon from '@1024pix/pix-ui/components/pix-icon';
import PixNotificationAlert from '@1024pix/pix-ui/components/pix-notification-alert';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import PixWindow from 'mon-pix/utils/pix-window';

export default class LiveAlert extends Component {
  @service router;

  @action
  refreshPage() {
    PixWindow.reload();
  }

  <template>
    <div class="live-alert">
      <PixNotificationAlert @type="error" @withIcon={{true}}>{{@message}}</PixNotificationAlert>

      <div class="live-alert__refresh-information">
        <p>{{t "pages.challenge.live-alerts.waiting-information"}}</p>
        <PixButton
          @variant="tertiary"
          @loadingColor="grey"
          @triggerAction={{this.refreshPage}}
          class="refresh-information-live-alert__button"
        >
          <PixIcon @name="refresh" @ariaHidden={{true}} class="refresh-information-live-alert__icon" />
          {{t "pages.challenge.live-alerts.refresh"}}
        </PixButton>
      </div>
    </div>
  </template>
}
