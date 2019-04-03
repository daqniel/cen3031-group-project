angular.module('notes', []).factory('Notes', function($http, $location) {
    var methods = {
      getAll: function() {
        return $http.get($location.absUrl() + 'api/notes');
      },
      
      create: function(note) {
        return $http.post($location.absUrl() + 'api/notes', note);
      }, 
  
      delete: function(id) {
         /**TODO
          return result of HTTP delete method
         */
       return $http.delete($location.absUrl() + 'api/notes/'+id);
  
      }
    };
  
    return methods;
  });
  