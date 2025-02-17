'use strict';

export default {
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  plugins: ['ember-template-lint-plugin-prettier'],
  ignore: ['blueprints/**'],
  overrides: [
    {
      files: ['**/*.gjs'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
