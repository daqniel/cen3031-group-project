angular.module('users').controller('UsersController', ['$scope', 'Users', 
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    $scope.addUser = function(user) {

      Listings.create(user).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.authenticateUser = function(email, password)
    {
      
    }


    };

    $scope.deleteUser = function(id) {

      Users.delete(id).then(function(response)
      {
        $scope.users = response.data;
          
          Users.getAll().then(function(response) {
            $scope.users = response.data;
          }, function(error) {
            console.log('Unable to retrieve users:', error);
          });}, function(error) {
        console.log('Unable to retrieve users:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);