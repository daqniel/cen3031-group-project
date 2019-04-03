angular.module('specials', []).factory('Specials', function($http, $location) {
  const apiHost = $location.protocol() + "://" + $location.host() + ":" + $location.port();
  var methods = {
    getAll: function() {
      return $http.get(apiHost + '/api/specials');
    },
	
	create: function(special) {
	  return $http.post($location.absUrl() + 'api/specials', special);
    }, 

    get3MostRecent: function(response)
    {
      return $http.get($location.absUrl() + 'api/specials/?num=3');
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
     return $http.delete($location.absUrl() + 'api/specials/'+id);

    }
  };

  return methods;
});
