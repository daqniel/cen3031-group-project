//TODO: bring this up to par with other factories
angular.module("requests", []).factory("Requests", function($http, $location) {
  const apiHost =
    $location.protocol() + "://" + $location.host() + ":" + $location.port();
  var methods = {
    getAll: function() {
      return $http.get(apiHost + "/api/requests");
    },

    create: function(
      email,
      budgetMin,
      budgetMax,
      numChildren,
      numAdults,
      text
    ) {
      return $http.post(
        apiHost +
          "/api/requests?email=" +
          email +
          "&state=Pending&budgetMin=" +
          budgetMin +
          "&budgetMax=" +
          budgetMax +
          "&numChildren=" +
          numChildren +
          "&numAdults=" +
          numAdults +
          "&text=" +
          text
      );
    },

    delete: function(id) {
      return $http.delete(apiHost + "/api/requests/" + id);
    }
  };

  return methods;
});
