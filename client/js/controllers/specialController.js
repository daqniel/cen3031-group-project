angular.module('specials').controller('SpecialsController', ['$scope', 'Specials', 
  function($scope, Specials) {
    /* Get all the listings, then bind it to the scope */
    Specials.get3MostRecent().then(function(response) {
      $scope.specials = response;
      console.log(response.data);
    }, function(error) {
      console.log('Unable to retrieve specials:', error);
    });
    

    $scope.addSpecial = function(list) {
	
      Specials.create(list).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve specials:', error);
    });


    };

    $scope.deleteSpecial = function(id) {
      Specials.delete(id).then(function(response)
      {
        $scope.specials = response.data;
          
          Specials.getAll().then(function(response) {
            $scope.specials = response.data;
          }, function(error) {
            console.log('Unable to retrieve specials:', error);
          });}, function(error) {
        console.log('Unable to retrieve specials:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.specials[index];
    };
  }
]);