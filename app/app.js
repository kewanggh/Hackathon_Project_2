(function() {
  'use strict';

  var app = angular.module('Boom', ['ui.router', 'toastr', 'ngSanitize']);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('mashapeHttpInterceptor');

    $urlRouterProvider.otherwise("/main");

    $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: "app/partials/main.html",
        controller: "BoomController",
        controllerAs: "vm"
      })
      .state('main.results', {
        url: "/results",
        templateUrl: "app/partials/results.html",
        controller: "BoomController"
      })
      .state('main.details', {
        url: "/details/:name/:song",
        templateUrl: "app/partials/details.html",
        controller: "BoomDetailController",
        controllerAs: "vm"
      });

  });
})();
