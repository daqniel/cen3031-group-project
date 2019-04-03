angular.module('requests', []).factory('Requests', function($http, $location) {
    var methods = {
      getAll: function() {
        return $http.get($location.absUrl() + 'api/requests');
      },
      
      create: function(email, budgetMin, budgetMax, numChildren, numAdults, text) {
        return $http.post($location.absUrl() + 'api/requests?email=' + email + "&state=Pending&budgetMin=" + 
        budgetMin + "&budgetMax=" + budgetMax + "&numChildren=" + numChildren + "&numAdults=" + numAdults + 
        "&text=" + text);
      }, 
  
      delete: function(id) {
       return $http.delete($location.absUrl() + 'api/requests/'+id);
  
      }
    };
  
    return methods;
  });
  