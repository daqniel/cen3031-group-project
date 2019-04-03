angular.module('vendors', []).factory('Vendors', function($http, $location) {
    const apiHost = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    var methods = {
      getAll: function() {
        return $http.get(apiHost + '/api/vendors');
      },
      
      create: function(vendor) {
        return $http.post(apiHost + '/api/vendors', vendor);
      }, 
  
      delete: function(id) {
       return $http.delete(apiHost + '/api/vendors/'+id);
  
      }
    };
  
    return methods;
  });
  