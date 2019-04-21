//TODO: bring this up to par with other controllers
angular.module("recommendation").controller("RecommendationsController", [
  "$scope",
  "Recommendations",
  function($scope, Recommendations) {
    Recommendations.getAll().then(
      function(res) {
        $scope.recommendations = res.data;
      },
      function(error) {
        console.log("Unable to retrieve recommendations:", error);
      }
    );
    $scope.detailedInfo = undefined;

    /* this is going to have to change after we settle on fields for schema */
    $scope.addRecommendation = function(newClient, newTitle, newText, newLink) {
      var newRecommendation = {
        clientId: newClient,
        title: newTitle,
        text: newText,
        link: newLink
      };
      Recommendations.create(newRecommendation)
        .then(res => {
          if (res.status == 200)
            console.log("recommendation added successfully", res.data);
        })
        .catch(err => {
          console.log("err creating recommendations: ", err);
        });
    };

    $scope.deleteRecommendations = function(id) {
      Recommendations.delete(id).then(
        function(res) {
          $scope.recommendations = res.data;

          Recommendations.getAll().then(
            function(res) {
              $scope.recommendations = res.data;
            },
            function(error) {
              console.log("Unable to retrieve recommendations:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve recommendations:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.recommendations[index];
    };
  }
]);
