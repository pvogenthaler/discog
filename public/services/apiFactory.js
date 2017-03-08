var services = angular.module('discog.apiFactory', []);

services.factory('ApiFactory', ['$http', function($http) {

  var searchArtists = function (searchTerm) {

    // use XMLHttpRequest for sync option & promisify
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/v1/api/artists/?name=' + searchTerm, false);

      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          })
        }
      }

      xhr.onerror = function() {
        console.log('onerror: ', xhr.status, shr.statusText)
        reject({
        status: this.status,
        statusText: xhr.statusText
      });
      }
      xhr.send();
    });

    // deprecated: $http doesn't support sync requests
    // return $http({
    //   method: 'GET',
    //   url: '/v1/api/artists/?name=' + searchTerm,
    // });

  };

  var retrieveAlbums = function (artistMbid, page) {
    page = page || 0;

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'v1/api/albums/?artist_mbid=' + artistMbid + '&page=' + page, false);

      xhr.onload = function() {
        if (this.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          })
        }
      }

      xhr.onerror = function() {
        console.log('onerror: ', xhr.status, shr.statusText)
        reject({
        status: this.status,
        statusText: xhr.statusText
      });
      }
      xhr.send();
    });

    // deprecated: $http doesn't support sync requests
    // return $http({
    //   method: 'GET',
    //   url: 'v1/api/albums/?artist_mbid=' + artistMbid,
    // });

  };

  return {
    searchArtists: searchArtists,
    retrieveAlbums: retrieveAlbums,
  }

}]);
