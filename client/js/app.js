/* register the modules the application depends upon here*/
angular.module('specials', []);
angular.module('blogPosts',[]);
angular.module('users',[]);
angular.module('notes',[]);
angular.module('recommendations',[]);
angular.module('requests',[]);
angular.module('vendors',[]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('agencyApp', ['ngRoute','specials','blogPosts','users','notes','recommendations','requests','vendors']);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when("/", {
        redirectTo: "/home"
    })
    .when("/home", {
        templateUrl: "./home.html"
    })
    .when("/specials", {
        templateUrl: "./specials.html"
    })
    .when("/reviews", {
        templateUrl: "./PastReview.html"
    })
    .when("/settings", {
        templateUrl: "./user-settings.html"
    })
    .when("/recommendations", {
        templateUrl: "./user-recommendations.html"
    })
    .when("/request", {
        templateUrl: "./user-recommendationRequest.html"
    })
    .when("/dashboard", {
        templateUrl: "./admin-recommendations.html"
    })
    .when("/dashboard/reviews", {
        templateUrl: "./admin-pastReviews.html"
    })
    .when("/dashboard/specials-vendors", {
        templateUrl: "./admin-SpecialsVendors.html"
    })
    .when("/dashboard/settings", {
        templateUrl: "./admin-settings.html"
    })
    .when("/dashboard/admin-create", {
        templateUrl: "./admin-create.html"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);