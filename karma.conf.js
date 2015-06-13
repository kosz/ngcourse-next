module.exports = function(config) {

  config.set({
    files : [
      'client/bower_components/es6-module-loader/dist/es6-module-loader.src.js',
      'client/bower_components/system.js/dist/system.src.js',
      'client/bower_components/lodash/dist/lodash.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/koast-angular/dist/koast.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/testing/test-utils.js',
      'client/testing/test-runner.js',
      'client/app/**/*.html',
      {pattern:'client/dist/**/*.js', included:false},
      {pattern:'client/dist/**/*-spec.js', included:false}
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    preprocessors: {
      'client/app/**/*.html': 'ng-html2js'
    },
    exclude: ['node_modules'],
    reporters: ['progress'],
    port: 9999,
    colors: true,
    logLevel: 'INFO',
    browsers: ['Chrome'], // Alternatively: 'PhantomJS'
    captureTimeout: 6000,
    singleRun: false,
    autoWatch : true
  });
};
