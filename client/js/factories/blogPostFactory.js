angular.module('blogPosts', []).factory('BlogPosts', function($http, $location) {
  const apiHost = $location.protocol() + "://" + $location.host() + ":" + $location.port();
  var methods = {
    getAll: function() {
      console.log($location.absUrl());
      
      return $http.get(apiHost + '/api/blogPosts');
    },
	
	create: function(blogPost) {
	  return $http.post(apiHost + '/api/blogPosts', blogPost);
    }, 

    delete: function(id) {

     return $http.delete(apiHost + '/api/blogPosts/'+id);

    }
  };

  return methods;
});
