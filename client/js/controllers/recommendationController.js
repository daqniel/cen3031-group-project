angular.module('recommendation').controller('RecommendationsController', ['$scope', 'Recommendations', 
  function($scope, Recommendations) {
    Recommendations.getAll().then(function(response) {
      $scope.recommendations = response.data;
    }, function(error) {
      console.log('Unable to retrieve recommendations:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addRecommendation = function(rec) {
      Recommendations.create(rec).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve recommendations:', error);
    });

    };

    $scope.deleteRecommendations = function(id) {
	
      Recommendations.delete(id).then(function(response)
      {
        $scope.recommendations = response.data;
          
        Recommendations.getAll().then(function(response) {
            $scope.recommendations = response.data;
          }, function(error) {
            console.log('Unable to retrieve recommendations:', error);
          });}, function(error) {
        console.log('Unable to retrieve recommendations:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.recommendations[index];
    };
  }
]);