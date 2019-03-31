angular.module('vendors').controller('VendorsController', ['$scope', 'Vendors', 
  function($scope, Vendors) {
    Vendors.getAll().then(function(response) {
      $scope.vendors = response.data;
    }, function(error) {
      console.log('Unable to retrieve vendors:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addVendor = function(vend) {
      Vendors.create(vend).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve vendors:', error);
    });


    };

    $scope.deleteVendor = function(id) {
      Vendors.delete(id).then(function(response)
      {
        $scope.vendors = response.data;
          
          Vendors.getAll().then(function(response) {
            $scope.vendors = response.data;
          }, function(error) {
            console.log('Unable to retrieve vendors:', error);
          });}, function(error) {
        console.log('Unable to retrieve vendors:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.vendors[index];
    };
  }
]);