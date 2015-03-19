'use strict';

require('angular');
require('angular-route');
require('angular-animate');
require('angular-messages');
global._ = require('lodash');
global.moment = require('moment');

var vendor = ['ngRoute', 'ngAnimate', 'ngMessages'];
var components = [];
var app = angular.module('SampleApp', vendor.concat(components));

// pages
app.controller('PageController', require('./pages/page/page-controller.js'));

// components (controllers exposed for testing)
app.directive('component', require('./components/component/component'));
app.controller('ComponentController', require('./components/component/component-controller.js'));
app.directive('progressBar', require('./components/progress-bar/progress-bar'));
app.controller('ProgressBarController', require('./components/progress-bar/progress-bar-controller.js'));
app.directive('designCanvas', require('./components/design-canvas/design-canvas'));
app.controller('DesignCanvasController', require('./components/design-canvas/design-canvas-controller.js'));

// resources
app.factory('ResourceService', require('./services/resource-service'));
app.factory('ProgressService', require('./services/progress-service'));

// custom validators
app.directive('match', require('./validators/match'));

app.config([
  '$locationProvider',
  '$routeProvider',
  function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        template: require('./pages/page/page-template.jade'),
        controller: 'PageController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);

// Uncomment for debugging
//angular.module('utils').filter('isDefined', function () {
//  return function (value, msg) {
//    if (value === undefined) {
//      throw new Error('isDefined filter got undefined value ' + msg);
//    }
//    return value;
//  };
//});
