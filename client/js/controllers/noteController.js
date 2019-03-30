angular.module('notes').controller('NotesController', ['$scope', 'Notes', 
  function($scope, Notes) {
    Notes.getAll().then(function(response) {
      $scope.notes = response.data;
    }, function(error) {
      console.log('Unable to retrieve note:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addNote = function(note) {

      Notes.create(note).then(function(response) {
      window.location=window.location;
    }, function(error) {
      console.log('Unable to retrieve notes:', error);
    });


    };

    $scope.deleteNote = function(id) {

      Notes.delete(id).then(function(response)
      {
        $scope.notes = response.data;
          
          Notes.getAll().then(function(response) {
            $scope.notes = response.data;
          }, function(error) {
            console.log('Unable to retrieve notes:', error);
          });}, function(error) {
        console.log('Unable to retrieve notes:', error);
      });


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.notes[index];
    };
  }
]);