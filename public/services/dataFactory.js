var services = angular.module('discog.dataFactory', []);

services.factory('DataFactory', function() {
  return {

    data: {
      curSearch : {},
      searchResults : {},
      albumsResults: {},
    },

    updateCurSearch: function(newSearch) {
      this.data.curSearch = newSearch;
    },

    updateSearchResults: function(key, val) {
      this.data.searchResults[key] = val;
    },

    updateAlbumsResults: function(key, val) {
      this.data.albumsResults[key] = val;
    },

  };
});
