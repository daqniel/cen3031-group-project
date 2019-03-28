angular.module('specials').controller('SpecialsController', ['$scope', 'Specials', 
  function($scope, Specials) {
    /* Get all the listings, then bind it to the scope */
    Specials.getAll().then(function(response) {
      $scope.specials = response.data;
    }, function(error) {
      console.log('Unable to retrieve specials:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addSpecial = function(list) {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Specials.create(list).then(function(response) {
     // $scope.listings = response.data;
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve specials:', error);
    });


    };

    $scope.deleteSpecial = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */ 
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