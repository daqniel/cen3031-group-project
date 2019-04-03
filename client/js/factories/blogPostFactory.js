angular.module('blogPosts', []).factory('BlogPosts', function($http, $location) {
  var methods = {
    getAll: function() {
      console.log($location.absUrl());
      
      return $http.get($location.absUrl() + 'api/blogPosts');
    },
	
	create: function(blogPost) {
	  return $http.post($location.absUrl() + 'api/blogPosts', blogPost);
    }, 

    delete: function(id) {

     return $http.delete($location.absUrl() + 'api/blogPosts/'+id);

    }
  };

  return methods;
});
