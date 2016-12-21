angular.module('app').controller('hubCtrl', function ($scope, $rootScope, $http, $location, gIdentity, $cookies) {
  $rootScope.currentUser = gIdentity.currentUser;
  if(!$rootScope.currentUser){
    $location.path('/login')
  }
});
