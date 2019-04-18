//TODO: bring this up to par with other factories
angular.module("requests", []).factory("Requests", function($http, $location) {
  const apiHost =
    $location.protocol() + "://" + $location.host() + ":" + $location.port();
  /* httpOptions is necessary for requests that send data in the body */
  /* POST/PUT */
  const httpOptions = {
    headers: {
      "Content-Type": "application/json"
      //'Authorization': 'auth-token' TODO: add request authorization via tokens?
    }
  };
  var methods = {
    getAll: function() {
      return $http.get(apiHost + "/api/requests");
    },

    create: function(newRequest) {
      return $http.post(apiHost +  "/api/requests", newRequest, httpOptions);
    },

    delete: function(id) {
      return $http.delete(apiHost + "/api/requests/" + id);
    }
  };

  return methods;
});
