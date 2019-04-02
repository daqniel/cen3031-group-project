angular.module('requests').controller('RequestsController', ['$scope', 'Requests', 
  function($scope, Requests) {
    Requests.getAll().then(function(response) {
      $scope.requests = response.data;
    }, function(error) {
      console.log('Unable to retrieve requests:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addRequest = function(email, budgetMin, budgetMax, numChildren, numAdults, text) {
      Requests.create(email, budgetMin, budgetMax, numChildren, numAdults, text).then(function(response) {
      if(response.status == 200)
      {
        alert("request created successfully");
        window.location.href = '../../user-recommendations.html';
      }
    }, function(error) {
      console.log('Unable to retrieve requests:', error);
    });


    };

    $scope.deleteRequest = function(id) {

      Requests.delete(id).then(function(response)
      {
        $scope.requests = response.data;
          
          Requests.getAll().then(function(response) {
            $scope.requests = response.data;
          }, function(error) {
            console.log('Unable to retrieve requests:', error);
          });}, function(error) {
        console.log('Unable to retrieve requests:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.requests[index];
    };
  }
]);