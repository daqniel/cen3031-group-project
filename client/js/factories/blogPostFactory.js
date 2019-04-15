angular
  .module("blogPosts", [])
  .factory("BlogPosts", function($http, $location) {
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
        return $http.get(apiHost + "/api/blogPosts");
      },

      create: function(blogPost) {
        return $http.post(apiHost + "/api/blogPosts", blogPost, httpOptions);
      },

      delete: function(id) {
        return $http.delete(apiHost + "/api/blogPosts/" + id);
      }
    };

    return methods;
  });
