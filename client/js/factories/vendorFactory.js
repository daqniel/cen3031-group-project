angular.module('vendors', []).factory('Vendors', function($http, $location) {
    var methods = {
      getAll: function() {
        return $http.get($location.absUrl() + 'api/vendors');
      },
      
      create: function(vendor) {
        return $http.post($location.absUrl() + 'api/vendors', vendor);
      }, 
  
      delete: function(id) {
       return $http.delete($location.absUrl() + 'api/vendors/'+id);
  
      }
    };
  
    return methods;
  });
  