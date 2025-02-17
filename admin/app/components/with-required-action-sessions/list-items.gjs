import { LinkTo } from '@ember/routing';

<template>
  <div class="content-text content-text--small table-admin__wrapper session-list">
    <table class="table-admin table-admin__auto-width">
      <thead>
        <tr>
          <th class="table__column table__column--id">ID</th>
          <th>Centre de certification</th>
          <th>Date de session</th>
          <th>Date de finalisation</th>
          <th>Qui ?</th>
        </tr>
      </thead>

      {{#if @withRequiredActionSessions}}
        <tbody>
          {{#each @withRequiredActionSessions as |withRequiredActionSession|}}
            <tr>
              <td class="table__column table__column--id">
                <LinkTo @route="authenticated.sessions.session" @model={{withRequiredActionSession.id}}>
                  {{withRequiredActionSession.id}}
                </LinkTo>
              </td>
              <td>{{withRequiredActionSession.certificationCenterName}}</td>
              <td>{{withRequiredActionSession.printableDateAndTime}}</td>
              <td>{{withRequiredActionSession.printableFinalizationDate}}</td>
              <td class="session-list__item--align-center">
                {{#if withRequiredActionSession.assignedCertificationOfficerName}}
                  {{withRequiredActionSession.assignedCertificationOfficerName}}
                {{else}}
                  -
                {{/if}}
              </td>
            </tr>
          {{/each}}
        </tbody>
      {{/if}}
    </table>

    {{#unless @withRequiredActionSessions}}
      <div class="table__empty">Aucun résultat</div>
    {{/unless}}
  </div>
</template>
