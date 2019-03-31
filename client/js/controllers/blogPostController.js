angular.module('blogPosts').controller('BlogPostsController', ['$scope', 'BlogPosts', 
  function($scope, BlogPosts) {
    BlogPosts.getAll().then(function(response) {
      $scope.blogPost1 = response.data[0];
      $scope.blogPost2 = response.data[1];
      $scope.blogPost3 = response.data[2];

      console.log($scope.blogPost1.title);
    }, function(error) {
      console.log('Unable to retrieve blogPosts:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addBlogPost = function(blog) {
      BlogPosts.create(blog).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve blogPosts:', error);
    });

    };

    $scope.deleteBlogPost = function(id) {
	
      BlogPosts.delete(id).then(function(response)
      {
        $scope.blogPosts = response.data;
          
          BlogPosts.getAll().then(function(response) {
            $scope.blogPosts = response.data;
          }, function(error) {
            console.log('Unable to retrieve blogPosts:', error);
          });}, function(error) {
        console.log('Unable to retrieve blogPosts:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.blogPosts[index];
    };
  }
]);