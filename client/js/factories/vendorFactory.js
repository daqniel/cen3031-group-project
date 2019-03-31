angular.module('vendors', []).factory('Vendors', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/vendors');
      },
      
      create: function(vendor) {
        return $http.post('http://localhost:8080/api/vendors', vendor);
      }, 
  
      delete: function(id) {
       return $http.delete('http://localhost:8080/api/vendors/'+id);
  
      }
    };
  
    return methods;
  });
  