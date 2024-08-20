<template>
  <div class="card" ...attributes>
    {{#if @title}}
      <h2 class="card__title">{{@title}}</h2>
    {{/if}}
    <div class="card__content">
      {{yield}}
    </div>
  </div>
</template>
