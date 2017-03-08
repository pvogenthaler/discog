var search = angular.module('discog.search', []);

search.controller('SearchCtrl', ['$scope', '$window', 'ApiFactory', 'DataFactory', function($scope, $window, ApiFactory, DataFactory) {
  $scope.searchResults = {};

  $scope.search = function(searchTerm) {

    if (!searchTerm) {
      return;

    // if we've already used searchTerm, use cache
    } else if (DataFactory.data.searchResults[searchTerm]) {
      DataFactory.updateCurSearch(searchTerm, DataFactory.data.searchResults[searchTerm]);

    } else {
      // execute search
      ApiFactory.searchArtists(searchTerm)
      .then(function(res) {

        // update DataFactory with search results
        $scope.searchResults[searchTerm] = res.reduce(function (acc, cur, i) {
          acc[i] = cur;
          return acc;
        }, {});
        DataFactory.updateSearchResults(searchTerm, $scope.searchResults[searchTerm]);

        // update DataFactory with current searchArtists
        DataFactory.updateCurSearch( DataFactory.data.searchResults[searchTerm]);

        // navigate to results page
        $window.location.assign('/#/results');

      })
      .catch(function(err) {
        console.log('error on artist search: ', err);
      });
    }
  }

}]);

search.directive('myEnter', ['DirectiveFactory', function(DirectiveFactory) {
  return DirectiveFactory.myEnter;
}]);
