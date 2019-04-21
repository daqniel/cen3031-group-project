//TODO: bring this up to par with other factories
angular
  .module("recommendations", [])
  .factory("Recommendations", function($http, $location) {
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
        return $http.get(apiHost + "/api/recommendations");
        //sends to index, doesnt show recommendations
      },

      getByClient: function(clientId) {
        return $http.get(apiHost + "/api/recommendations/" + clientId);
      },

      create: function(recommendation) {
        return $http.post(
          apiHost + "/api/recommendations",
          recommendation,
          httpOptions
        );
      },

      delete: function(id) {
        return $http.delete(apiHost + "/api/recommendations/" + id);
      }
    };

    return methods;
  });
