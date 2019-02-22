angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://daniel-quintero-bootcamp5.herokuapp.com/api/listings');
    },

	  create: function(listing) {
	  return $http.post('https://daniel-quintero-bootcamp5.herokuapp.com/api/listings/api/listings', listing);
    },

    delete: function(id) {

        return $http.delete('https://daniel-quintero-bootcamp5.herokuapp.com/api/listings/api/listings/' + id);
	   /**TODO
        return result of HTTP delete method
       */

    }
  };

  return methods;
});
