//TODO: bring this up to par with other controllers
angular.module("requests").controller("RequestsController", [
  "$scope",
  "Requests",
  function($scope, Requests) {
    Requests.getAll().then(
      function(response) {
        $scope.requests = response.data;
      },
      function(error) {
        console.log("Unable to retrieve requests:", error);
      }
    );
    $scope.detailedInfo = undefined;

    $scope.addRequest = function(
      newClientId,
      newRequestState,
      newBudgetMin,
      newBudgetMax,
      newLocationTo,
      newLocationFrom,
      newTravelDatesDeparting,
      newTravelDatesReturning,
      newParty,
      newWantTravelInsurance,
      newWantCruise,
      newText
    ) {
      var newRequest = {
        clientId: newClientId,
        requestState: newRequestState,
        budget: {
          min: newBudgetMin,
          max: newBudgetMax
        },
        location: {
          to: newLocationTo,
          from: newLocationFrom
        },
        travelDates: {
          departing: newTravelDatesDeparting,
          returning: newTravelDatesReturning
        },
        party: newParty,
        wantTravelInsurance: newWantTravelInsurance,
        wantCruise: newWantCruise,
        text: newText
      };

      Requests.create(newRequest)
        .then(res => {
          if(res.status == 200) alert("Request successfully made!");
        })
        .catch(err => {
          alert(err.data.code, "Request couldn't be made")
        })
    };

    $scope.deleteRequest = function(id) {
      Requests.delete(id).then(
        function(response) {
          $scope.requests = response.data;

          Requests.getAll().then(
            function(response) {
              $scope.requests = response.data;
            },
            function(error) {
              console.log("Unable to retrieve requests:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve requests:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.requests[index];
      $scope.parties = $scope.requests[index].party;
    };
  }
]);
