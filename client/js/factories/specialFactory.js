angular.module("specials", []).factory("Specials", function($http, $location) {
  const apiHost =
    $location.protocol() + "://" + $location.host() + ":" + $location.port();
  const httpOptions = {
    headers: {
      "Content-Type": "application/json"
      //'Authorization': 'auth-token' TODO: add request authorization via tokens?
    }
  };
  var methods = {
    getAll: function() {
      return $http.get(apiHost + "/api/specials");
    },

    create: function(special) {
      return $http.post(apiHost + "/api/specials", special, httpOptions);
    },

    get3MostRecent: function(response) {
      return $http.get(apiHost + "/api/specials/?num=3");
    },

    delete: function(id) {
      return $http.delete(apiHost + "/api/specials/" + id);
    }
  };

  return methods;
});
