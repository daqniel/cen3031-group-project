angular.module('users', []).factory('Users', function($http, $location) {
    const apiHost = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    var methods = {
      getAll: function() {
        return $http.get(apiHost + '/api/users');
      },
      
      create: function(newFirst, newMiddle, newLast, newPass, newPhone, newEmail) {
        return $http.post(apiHost + '/api/users?' + "fname=" +newFirst 
        +"&mname=" + newMiddle + "&lname=" + newLast + "&password=" + newPass + "&phoneNumber=" + newPhone + 
        "&email=" + newEmail);
      }, 
  
      delete: function(id) {
         /**TODO
          return result of HTTP delete method
         */
       return $http.delete(apiHost + '/api/users/'+id);
  
      },
      authenticate: function(username, password)
      {
        return $http.get(apiHost + '/api/users/' + username + "/" + password);
      }
    };
  
    return methods;
  });
  