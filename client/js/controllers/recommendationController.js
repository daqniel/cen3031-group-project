//TODO: bring this up to par with other controllers
angular.module("recommendations").controller("RecommendationsController", [
  "$scope",
  "Recommendations",
  function($scope, Recommendations) {
    Recommendations.getAll()
      .then(res => {
        $scope.recommendations = res.data;
      })
      .catch(err => {
        console.log("Unable to retrieve recommendations:", err);
      });

    $scope.detailedInfo = undefined;

    $scope.sessionUsername = $.parseJSON(sessionStorage.getItem("user")).email;

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

    $scope.getByClient = function(clientId) {
      console.log("clientId: ", clientId);
      Recommendations.getByClient(clientId)
        .then(res => {
          $scope.recommendationsByClient = res.data;
        })
        .catch(err => {
          console.log("Unable to retrieve recommendations for client: ", err);
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
