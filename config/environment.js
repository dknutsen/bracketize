/* jshint node: true */


module.exports = function(environment) {
  require('dotenv').load({path:`./config/${environment}.env`});
  var ENV = {
    modulePrefix: 'bracketize',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      sessionServiceName: 'session'
    },

    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    },

    contentSecurityPolicy: {
      'script-src': "'self' liveReloadPort 'unsafe-eval' apis.google.com *.googleapis.com maps.gstatic.com *.firebaseio.com",
      'frame-src': "'self' https://*.firebaseapp.com https://*.firebaseio.com",
      'connect-src': "'self' liveReloadPort wss://*.firebaseio.com https://*.googleapis.com maps.gstatic.com",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' *.googleapis.com csi.gstatic.com data",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
    },
    //'default-src': "'none'",
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
