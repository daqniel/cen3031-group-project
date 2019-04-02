angular.module('blogPosts', []).factory('BlogPosts', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/blogPosts');
    },
	
	create: function(blogPost) {
	  return $http.post('http://localhost:8080/api/blogPosts', blogPost);
    }, 

    delete: function(id) {

     return $http.delete('http://localhost:8080/api/blogPosts/'+id);

    }
  };

  return methods;
});
