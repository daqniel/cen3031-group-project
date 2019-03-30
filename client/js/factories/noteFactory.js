angular.module('notes', []).factory('Notes', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/notes');
      },
      
      create: function(note) {
        return $http.post('http://localhost:8080/api/notes', note);
      }, 
  
      delete: function(id) {
         /**TODO
          return result of HTTP delete method
         */
       return $http.delete('http://localhost:8080/api/notes/'+id);
  
      }
    };
  
    return methods;
  });
  