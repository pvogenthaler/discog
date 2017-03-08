var results = angular.module('discog.results', []);

results.controller('ResultsCtrl', ['$scope', '$window', 'ApiFactory', 'DataFactory', function($scope, $window, ApiFactory, DataFactory) {

  // update curSearch for use on ng-repeat
  $scope.curSearch = DataFactory.data.curSearch;
  $scope.albumResults = {};

  // execute album retrieval
  $scope.retrieveAlbums = function(artistMbid, pageNum) {
    // if we've already used searchTerm, use cache
    if (DataFactory.data.albumsResults[artistMbid] && !pageNum) {
      $scope.albumResults = DataFactory.data.albumsResults;

    } else {
      // execute album retrieval
      ApiFactory.retrieveAlbums(artistMbid, pageNum)
      // update DataFactory with album results
      .then(function(res) {
        console.log('albums res: ', res);
        $scope.$apply(function() {
          if (!res.length) {
            $scope.albumResults[artistMbid] = {
              0: {title: "No available albums"}
            };
            document.getElementsByClassName('more').visibility = 'hidden';
          } else {
            var index = $scope.albumResults[artistMbid] ? Object.keys($scope.albumResults[artistMbid]).length : 0;
            console.log(index);

            $scope.albumResults[artistMbid] = $scope.albumResults[artistMbid] || {};

            res.forEach(function(album) {
              $scope.albumResults[artistMbid][index++] = album;
            });

          }
          DataFactory.updateAlbumsResults(artistMbid, $scope.albumResults[artistMbid]);
        });
      })
      .catch(function(err) {
        console.log('error on retrieving artist\'s albums: ', err);
      })
    }
  }


  $scope.searchResults = {};
  $scope.search = function(searchTerm) {

    // no api call without searchTerm
    if (!searchTerm) {
      return;
    }

    // if we've already used searchTerm, use cache
    else if (DataFactory.data.searchResults[searchTerm]) {
      DataFactory.updateCurSearch(DataFactory.data.searchResults[searchTerm]);
      $scope.curSearch = DataFactory.data.curSearch;

    } else {
      // execute search
      ApiFactory.searchArtists(searchTerm)
      .then(function(res) {
        console.log('artists res: ', res);
        $scope.$apply(function() {

          // update DataFactory with search results
          $scope.searchResults[searchTerm] = res.reduce(function (acc, cur, i) {
            acc[i] = cur;
            return acc;
          }, {});
          DataFactory.updateSearchResults(searchTerm, $scope.searchResults[searchTerm]);

          // update DataFactory with current searchArtists
          DataFactory.updateCurSearch( DataFactory.data.searchResults[searchTerm]);
          $scope.curSearch = DataFactory.data.curSearch;

        })

      })
      .catch(function(err) {
        console.log('error on artist search: ', err);
      });
    }
  }

}]);
