angular.module("vendors", []).factory("Vendors", function($http, $location) {
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
      return $http.get(apiHost + "/api/vendors");
    },

    create: function(vendor) {
      return $http.post(apiHost + "/api/vendors", vendor, httpOptions);
    },

    delete: function(id) {
      return $http.delete(apiHost + "/api/vendors/" + id);
    }
  };

  return methods;
});
