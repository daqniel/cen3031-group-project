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
    $scope.addRecommendation = function(rec) {
      Recommendations.create(rec).then(
        function(res) {
          window.location = window.location;
        },
        function(error) {
          console.log("Unable to retrieve recommendations:", error);
        }
      );
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
