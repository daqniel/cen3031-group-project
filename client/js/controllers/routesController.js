angular.module("routes").controller("RoutesController", [
  "$scope",
  "$route",
  "$routeParams",
  "$location",
  function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  }
]);
