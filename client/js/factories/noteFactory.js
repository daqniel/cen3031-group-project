angular.module("notes", []).factory("Notes", function($http, $location) {
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
      return $http.get(apiHost + "/api/notes");
    },

    create: function(note) {
      return $http.post(apiHost + "/api/notes", note, httpOptions);
    },

    delete: function(id) {
      return $http.delete(apiHost + "/api/notes/" + id);
    }
  };

  return methods;
});
