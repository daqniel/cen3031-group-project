angular.module("users", []).factory("Users", function($http, $location) {
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
      return $http.get(apiHost + "/api/users");
    },

    /* I think this is a better way to make post requests */
    create: function(newUser) {
      return $http.post(apiHost + "/api/users", newUser, httpOptions);
    },

    delete: function(id) {
      /**TODO
          return result of HTTP delete method
         */
      return $http.delete(apiHost + "/api/users/" + id);
    },
    authenticate: function(username, password) {
      // console.log(`/api/users/login?email=${username}&password=${password}`);
      var login = {
        email: username,
        password: password
      };
      // return $http.post(apiHost + `/api/users/login?email=${username}&password=${password}`);
      return $http.post(apiHost + "/api/users/login", login, httpOptions);
    },

    logout: function() {
      return $http.get(apiHost + "/api/users/logout");
    },

    // this could probably be somewhere else, it's useful
    // for more than just user info.
    getSession: function() {
      return $http.get(apiHost + "/api/session");
    }
  };

  return methods;
});
