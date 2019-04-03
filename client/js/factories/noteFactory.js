angular.module('notes', []).factory('Notes', function($http, $location) {
    const apiHost = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    var methods = {
      getAll: function() {
        return $http.get(apiHost + '/api/notes');
      },
      
      create: function(note) {
        return $http.post(apiHost + '/api/notes', note);
      }, 
  
      delete: function(id) {
         /**TODO
          return result of HTTP delete method
         */
       return $http.delete(apiHost + '/api/notes/'+id);
  
      }
    };
  
    return methods;
  });
  