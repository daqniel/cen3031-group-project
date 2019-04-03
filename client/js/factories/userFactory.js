angular.module('users', []).factory('Users', function($http, $location) {
    var methods = {
      getAll: function() {
        return $http.get($location.absUrl() + 'api/users');
      },
      
      create: function(newFirst, newMiddle, newLast, newPass, newPhone, newEmail) {
        return $http.post($location.absUrl() + 'api/users?' + "fname=" +newFirst 
        +"&mname=" + newMiddle + "&lname=" + newLast + "&password=" + newPass + "&phoneNumber=" + newPhone + 
        "&email=" + newEmail);
      }, 
  
      delete: function(id) {
         /**TODO
          return result of HTTP delete method
         */
       return $http.delete($location.absUrl() + 'api/users/'+id);
  
      },
      authenticate: function(username, password)
      {
        return $http.get($location.absUrl() + 'api/users/' + username + "/" + password);
      }
    };
  
    return methods;
  });
  