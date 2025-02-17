import PixButton from '@1024pix/pix-ui/components/pix-button';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjsFormat from 'ember-dayjs/helpers/dayjs-format';

import ConfirmPopup from '../confirm-popup';

export default class CampaignParticipation extends Component {
  @service accessControl;

  @tracked displayRemoveParticipationModal = false;
  @tracked participationToDelete = null;

  @action
  toggleDisplayRemoveParticipationModal(participation) {
    this.participationToDelete = participation;
    this.displayRemoveParticipationModal = !this.displayRemoveParticipationModal;
  }

  @action
  async removeParticipation() {
    try {
      await this.args.removeParticipation(this.participationToDelete);
    } finally {
      this.toggleDisplayRemoveParticipationModal();
    }
  }

  <template>
    <header class="page-section__header">
      <h2 class="page-section__title">Participations à des campagnes</h2>
    </header>
    <p class="participations-section__subtitle">
      Attention toute modification sur une participation nécessite un accord écrit du prescripteur et du prescrit.
    </p>

    <div class="content-text content-text--small">
      <table class="table-admin">
        <thead>
          <tr>
            <th>Prescrit</th>
            <th>Campagne</th>
            <th>Identifiant externe</th>
            <th>Date de début</th>
            <th>Statut</th>
            <th>Date d'envoi</th>
            <th>Supprimé le</th>
            {{#if this.accessControl.hasAccessToUsersActionsScope}}
              <th>Actions</th>
            {{/if}}
          </tr>
        </thead>
        <tbody>
          {{#each @participations as |participation|}}
            <tr aria-label="Participation">
              <td>{{participation.organizationLearnerFullName}}</td>
              <td>
                <LinkTo @route="authenticated.campaigns.campaign" @model={{participation.campaignId}}>
                  {{participation.campaignCode}}
                </LinkTo>
              </td>
              {{#if participation.participantExternalId}}
                <td>{{participation.participantExternalId}}</td>
              {{else}}
                <td>-</td>
              {{/if}}
              <td>{{dayjsFormat participation.createdAt "DD/MM/YYYY"}}</td>
              <td>{{participation.displayedStatus}}</td>
              <td>
                {{if participation.sharedAt (dayjsFormat participation.sharedAt "DD/MM/YYYY") "-"}}
              </td>
              {{#if participation.deletedAt}}
                <td>
                  {{dayjsFormat participation.deletedAt "DD/MM/YYYY"}}
                </td>
              {{else}}
                <td>-</td>
              {{/if}}
              {{#if this.accessControl.hasAccessToUsersActionsScope}}
                <td>
                  {{#unless participation.deletedAt}}
                    <PixButton
                      @triggerAction={{fn this.toggleDisplayRemoveParticipationModal participation}}
                      @size="small"
                      @variant="error"
                    >
                      Supprimer
                    </PixButton>
                  {{/unless}}
                </td>
              {{/if}}
            </tr>
          {{/each}}
        </tbody>
      </table>
      {{#unless @participations}}
        <div class="table__empty">Aucune participation</div>
      {{/unless}}
    </div>

    <ConfirmPopup
      @message="Vous êtes sur le point de supprimer la ou les participation(s) de {{this.participationToDelete.organizationLearnerFullName}} (y compris celles améliorées), celle-ci ne sera plus visible ni comprise dans les statistiques de la campagne de Pix Orga. Le participant pourra terminer son parcours mais ne pourra plus envoyer ses résultats. Il ne pourra pas non plus participer de nouveau à cette campagne."
      @title="Supprimer cette participation ?"
      @submitTitle="Oui, je supprime"
      @submitButtonType="danger"
      @confirm={{this.removeParticipation}}
      @cancel={{this.toggleDisplayRemoveParticipationModal}}
      @show={{this.displayRemoveParticipationModal}}
    />
  </template>
}
