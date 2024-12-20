function setTitleClasses(spaceBetweenTools, centerTitle) {
  const classes = ['page-title__main'];

  if (spaceBetweenTools) classes.push('page-title__main--stick');
  if (centerTitle) classes.push('page-title__main--center');

  return classes.join(' ');
}

<template>
  <header class="page-title">
    {{#if (has-block "breadcrumb")}}
      {{yield to="breadcrumb"}}
    {{/if}}
    <div class={{setTitleClasses @spaceBetweenTools @centerTitle}}>
      <h1 class="page-title__title">{{yield to="title"}}</h1>
      {{#if (has-block "tools")}}
        {{yield to="tools"}}
      {{/if}}
    </div>

    {{#if (has-block "subtitle")}}
      <div class="page-title__sub-title">
        {{yield to="subtitle"}}
      </div>
    {{/if}}
  </header>
</template>
