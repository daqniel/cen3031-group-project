angular.module("vendors").controller("VendorsController", [
  "$scope",
  "Vendors",
  function($scope, Vendors) {
    Vendors.getAll()
      .then(res => {
        console.log(res.data);
        $scope.vendors = res.data;
      })
      .catch(err => {
        console.log("unable to retrieve vendors: ", err);
      });

    $scope.detailedInfo = undefined;

    $scope.addVendor = function (newVendor) {
      Vendor.create(newVendor).then(function (response) {
        window.location = window.location;
      }, function (error) {
        console.log('Unable to retrieve vendor:', error);
      });
    };

    $scope.deleteVendor = function(id) {
      Vendors.delete(id).then(
        function(res) {
          $scope.vendors = res.data;

          Vendors.getAll().then(
            function(res) {
              $scope.vendors = res.data;
            },
            function(error) {
              console.log("Unable to retrieve vendors:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve vendors:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.vendors[index];
    };
  }
]);
