import PixSelect from '@1024pix/pix-ui/components/pix-select';
import { t } from 'ember-intl';
<template>
  {{#if @isEditionMode}}
    <PixSelect
      @onChange={{@onRoleSelected}}
      @value={{@role}}
      @screenReaderOnly={{true}}
      @options={{@certificationCenterRoles}}
    >
      <:label>{{t "components.users.certification-centers.memberships.items.role.select-role"}}</:label>
      <:default as |certificationCenterRole|>{{certificationCenterRole.label}}</:default>
    </PixSelect>
  {{else}}
    {{t @roleLabelKey}}
  {{/if}}
</template>
