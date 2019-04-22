angular.module("blogPosts").controller("BlogPostsController", [
  "$scope",
  "BlogPosts",
  function($scope, BlogPosts) {
    BlogPosts.getAll()
      .then(res => {
        $scope.blogPosts = res.data;
        console.log('resdata', $scope.blogPosts);
      })
      .catch(err => {
        console.log("Unable to get blogPosts:", error);
      });


    $scope.detailedInfo = undefined;

    $scope.addBlogPost = function(newTitle, newText) {
      var newBlogPost = {
        title: newTitle,
        text: newText
      };
      BlogPosts.create(newBlogPost)
        .then(res => {
          //TODO: what should we do when we get a res?
          if (res.status == 200)
            console.log("blogPost added successfully", res.data);
          window.location = window.location;
        })
        .catch(err => console.log("Unable to retrieve blogPosts:", error));
    };

    $scope.deleteBlogPost = function(id) {
      BlogPosts.delete(id).then(
        function(response) {
          $scope.blogPosts = response.data;

          BlogPosts.getAll().then(
            function(response) {
              $scope.blogPosts = response.data;
            },
            function(error) {
              console.log("Unable to retrieve blogPosts:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve blogPosts:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.blogPosts[index];
    };
  }
]);
