/* register the modules the application depends upon here*/
angular.module('specials', []);
angular.module('blogPosts',[]);
angular.module('users',[]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('agencyApp', ['specials','blogPosts','users']);