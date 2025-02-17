import { t } from 'ember-intl';

import ListItem from './list-item';

<template>
  <table aria-label={{t "components.organizations.children-list.table-name"}}>
    <thead>
      <tr>
        <th>{{t "components.organizations.children-list.table-headers.id"}}</th>
        <th>{{t "components.organizations.children-list.table-headers.name"}}</th>
        <th>{{t "components.organizations.children-list.table-headers.external-id"}}</th>
      </tr>
    </thead>
    <tbody>
      {{#each @organizations as |organization|}}
        <ListItem @organization={{organization}} />
      {{/each}}
    </tbody>
  </table>
</template>
