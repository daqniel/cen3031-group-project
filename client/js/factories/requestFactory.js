angular.module('requests', []).factory('Requests', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/requests');
      },
      
      create: function(request) {
        return $http.post('http://localhost:8080/api/requests', request);
      }, 
  
      delete: function(id) {
       return $http.delete('http://localhost:8080/api/requests/'+id);
  
      }
    };
  
    return methods;
  });
  