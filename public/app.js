var app = angular.module('discog', [
  'ngRoute',
  'ngResource',
  'discog.search',
  'discog.results',
  'discog.apiFactory',
  'discog.dataFactory',
]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/search'
    })
    .when('/search', {
      templateUrl: '/static/search/search.html'
    })
    .when('/results', {
      templateUrl: '/static/results/results.html'
    })
    .otherwise({
      redirectTo: '/search'
    });
});
