import PixBackgroundHeader from '@1024pix/pix-ui/components/pix-background-header';
import PixBlock from '@1024pix/pix-ui/components/pix-block';
import PixButton from '@1024pix/pix-ui/components/pix-button';
import PixMessage from '@1024pix/pix-ui/components/pix-message';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import ENV from 'mon-pix/config/environment';
import PixWindow from 'mon-pix/utils/pix-window';

export default class DownloadSessionResults extends Component {
  @tracked errorMessage = null;
  @service fileSaver;
  @service intl;

  @action
  async downloadSessionResults(event) {
    event.preventDefault();
    this.errorMessage = null;

    try {
      const token = decodeURIComponent(PixWindow.getLocationHash().slice(1));
      await this.fileSaver.save({
        url: `${ENV.APP.API_HOST}/api/sessions/download-all-results`,
        options: {
          method: 'POST',
          body: { token },
        },
      });
    } catch (error) {
      if (error.code === 'INVALID_SESSION_RESULT_TOKEN') {
        this.errorMessage = this.intl.t('pages.download-session-results.errors.invalid-token');
      } else {
        this.errorMessage = this.intl.t('common.error');
      }
    }
  }

  <template>
    <PixBackgroundHeader id="main">
      <PixBlock class="download-session-results">
        <form class="download-session-results__form" autocomplete="off">

          <h1 class="form__title">
            {{t "pages.download-session-results.title"}}
          </h1>

          <PixButton @type="submit" @triggerAction={{this.downloadSessionResults}} @size="large" class="form__actions">
            {{t "pages.download-session-results.button.label"}}
          </PixButton>

          {{#if this.errorMessage}}
            <PixMessage @type="error" class="form__error">
              {{this.errorMessage}}
            </PixMessage>
          {{/if}}
        </form>
      </PixBlock>
    </PixBackgroundHeader>
  </template>
}
