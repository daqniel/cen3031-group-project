angular.module("notes").controller("NotesController", [
  "$scope",
  "Notes",
  function($scope, Notes) {
    Notes.getAll().then(
      function(res) {
        $scope.notes = res.data;
      },
      function(error) {
        console.log("Unable to retrieve note:", error);
      }
    );

    $scope.detailedInfo = undefined;

    $scope.addNote = function(newType, newLinkedId, newTitle, newText) {
      var newNote = {
        type: newType,
        linkedId: newLinkedId,
        title: newTitle,
        text: newText
      };
      Notes.create(newNote)
        .then(res => {
          if (res.status == 200)
            // console.log("vendor added successfully", res.data);
          window.location = window.location;
        })
        .catch(err => {
          console.log("Error creating note: ", err);
        });
    };

    $scope.deleteNote = function(id) {
      Notes.delete(id).then(
        function(res) {
          $scope.notes = res.data;

          Notes.getAll().then(
            function(res) {
              $scope.notes = res.data;
            },
            function(error) {
              console.log("Unable to retrieve notes:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve notes:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.notes[index];
    };
  }
]);
