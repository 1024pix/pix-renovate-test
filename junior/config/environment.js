'use strict';

require('dotenv').config();

function _isFeatureEnabled(environmentVariable) {
  return environmentVariable === 'true';
}

module.exports = function (environment) {
  const analyticsEnabled = _isFeatureEnabled(process.env.WEB_ANALYTICS_ENABLED);
  const ENV = {
    modulePrefix: 'junior',
    environment,
    locationType: 'history',
    rootURL: '/',
    metrics: {
      enabled: analyticsEnabled,
      matomoUrl: process.env.WEB_ANALYTICS_URL,
    },
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      API_HOST: process.env.API_HOST || '',
      // Here you can pass flags/options to your application instance
      // when it is created
      BANNER_CONTENT: process.env.BANNER_CONTENT || '',
      BANNER_TYPE: process.env.BANNER_TYPE || '',
      EMBED_ALLOWED_ORIGINS: (
        process.env.EMBED_ALLOWED_ORIGINS || 'https://epreuves.pix.fr,https://1024pix.github.io'
      ).split(','),
      APP_VERSION: process.env.SOURCE_VERSION || 'development',
      CHALLENGE_DISPLAY_DELAY: process.env.CHALLENGE_DISPLAY_DELAY || 1500,
    },
    'ember-cli-mirage': {
      usingProxy: true,
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.APP.API_HOST = 'http://localhost:3000';
    // Testem prefers this...
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.CHALLENGE_DISPLAY_DELAY = 0;
    ENV.metrics.enabled = false;
  }

  ENV['ember-component-css'] = {
    namespacing: false,
  };
  return ENV;
};
