angular.module('requests', []).factory('Requests', function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/requests');
      },
      
      create: function(email, budgetMin, budgetMax, numChildren, numAdults, text) {
        return $http.post('http://localhost:8080/api/requests?email=' + email + "&state=Pending&budgetMin=" + 
        budgetMin + "&budgetMax=" + budgetMax + "&numChildren=" + numChildren + "&numAdults=" + numAdults + 
        "&text=" + text);
      }, 
  
      delete: function(id) {
       return $http.delete('http://localhost:8080/api/requests/'+id);
  
      }
    };
  
    return methods;
  });
  