angular.module("listings").controller("ListingsController", [
  "$scope",
  "Listings",
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(
      function(response) {
        $scope.listings = response.data;
      },
      function(error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    $scope.detailedInfo = undefined;

    $scope.reset = function() {
      // reset fields
      $scope.newListing.code = undefined;
      $scope.newListing.name = undefined;
      $scope.newListing.coords = undefined;
      $scope.newListing.address = undefined;
    };

    $scope.showError = function(errString) {
      $scope.errorText = errString;
    };

    $scope.addListing = function() {
      if (
        $scope.newListing.code == undefined ||
        $scope.newListing.name == undefined
      ) {
        $scope.showError("*Missing Required Information");
        return;
      }
      $scope.showError("");
      var listing = {
        code: $scope.newListing.code,
        name: $scope.newListing.name
      };
      if ($scope.newListing.coords != undefined) {
        var coords = {
          latitude: $scope.newListing.coords.split("/")[0],
          longitude: $scope.newListing.coords.split("/")[1]
        };
        listing.coordinates = coords;
      }
      if ($scope.newListing.address != undefined)
        listing.address = $scope.newListing.address;

      Listings.create(listing).then(
        function(response) {
          $scope.listings.push(response.data);
          $scope.reset();
        },
        function(error) {
          console.log("Unable to add listing:", error);
        }
      );
      /**TODO
    *Save the article using the Listings factory. If the object is successfully
    saved redirect back to the list page. Otherwise, display the error
   */
    };

    $scope.deleteListing = function(id) {
      Listings.delete(id).then(
        function(response) {
          var toDelete = $scope.listings.findIndex(function(listing) {
            return listing == response.data;
          });
          console.log("todelete: ", toDelete);
          $scope.listings.splice(toDelete, 1);
        },
        function(error) {
          console.log("Unable to delete listing", error);
        }
      );
      /**TODO 
        Delete the article using the Listings factory. If the removal is successful,
    navigate back to 'listing.list'. Otherwise, display the error.
       */
    };

    $scope.showDetails = function(index) {
      $scope.detailCode = "N/A";
      $scope.detailName = "N/A";
      $scope.detailCoords = "N/A";
      $scope.detailAddress = "N/A";

      $scope.detailCode = $scope.filteredList[index].code;
      $scope.detailName = $scope.filteredList[index].name;
      // doesnt show any info if it doesnt exist.
      if ($scope.filteredList[index].coordinates != undefined) {
        $scope.detailCoords =
          $scope.filteredList[index].coordinates.latitude +
          "/" +
          $scope.filteredList[index].coordinates.longitude;
      }
      if ($scope.filteredList[index].address != undefined) {
        $scope.detailAddress = $scope.filteredList[index].address;
      }
    };
  }
]);
