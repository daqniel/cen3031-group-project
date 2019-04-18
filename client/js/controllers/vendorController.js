angular.module("vendors").controller("VendorsController", [
  "$scope",
  "Vendors",
  function($scope, Vendors) {
    Vendors.getAll().then(
      function(res) {
        $scope.vendors = res.data;
      },
      function(error) {
        console.log("Unable to retrieve vendors:", error);
      }
    );

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
