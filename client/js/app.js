/* register the modules the application depends upon here*/
angular.module('routes', ['ngRoute']);
angular.module('routes').config(['$routeProvider', ($routeProvider) => {
    $routeProvider
    // .when('/', {
    //     templateUrl: "../index.html"
    // })
    .when("/specials", {
        templateUrl: "/specials.html",
        resolve: {
            delay: function(){
                console.log("what the hecc");
            }
        }
    });
}]);

angular.module('specials', []);
angular.module('blogPosts',[]);
angular.module('users',[]);
angular.module('notes',[]);
angular.module('recommendations',[]);
angular.module('requests',[]);
angular.module('vendor',[]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('agencyApp', ['specials','routes','blogPosts','users','notes','recommendations','requests','vendor']);
