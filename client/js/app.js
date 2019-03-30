/* register the modules the application depends upon here*/
angular.module('specials', []);
angular.module('blogPosts',[]);
angular.module('users',[]);
angular.module('notes',[]);
angular.module('recommendations',[]);
angular.module('requests',[]);
angular.module('vendor',[]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('agencyApp', ['specials','blogPosts','users','notes','recommendations','requests','vendor']);