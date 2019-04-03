angular.module('recommendations', []).factory('Recommendations', function($http, $location) {
    var methods = {
      getAll: function() {
        return $http.get($location.absUrl() + 'api/recommendations');
        //sends to index, doesnt show recommendations
      },
      
      create: function(brecommendation) {
        return $http.post($location.absUrl() + 'api/recommendations', recommendation);
      }, 
  
      delete: function(id) {
  
       return $http.delete($location.absUrl() + 'api/recommendations/'+id);
  
      }
    };
  
    return methods;
  });
  
