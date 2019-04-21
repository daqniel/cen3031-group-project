/* register the modules the application depends upon here*/
angular.module('specials', []);
angular.module('blogPosts',[]);
angular.module('users',[]);
angular.module('notes',[]);
angular.module('recommendations',[]);
angular.module('requests',[]);
angular.module('vendors',[]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('agencyApp', ['ngRoute', 'specials','blogPosts','users','notes','recommendations','requests','vendors']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
    .when("/test", {
        templateUrl: "./test-index.html"
    })
    .when("/specials", {
        templateUrl: "specials.html"
    })
    .when("/home", {
        templateUrl: "home.html"
    })
    .otherwise({
        redirectTo: '/test'
    });
}]);