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

    $scope.addVendor = function(
      newName,
      newText,
      newPhoneNumber,
      newEmail,
      newLink
    ) {
      var newVendor = {
        name: newName,
        text: newText,
        phoneNumber: newPhoneNumber,
        email: newEmail,
        link: newLink
      };
      Vendors.create(newVendor)
        .then(res => {
          //TODO: what should we do when we get a res?
          if (res.status == 200)
            console.log("vendor added successfully", res.data);
        })
        .catch(err => console.log("Error creating vendor: ", err));
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
