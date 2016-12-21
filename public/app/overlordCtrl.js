angular.module('app').controller('overlordCtrl', function ($scope, $rootScope, $http, $location, gAuth) {
  $scope.logout = function () {
    gAuth.logoutUser().then(function () {
      $rootScope.currentUser = "";
      console.log('You have successfully signed out!');
      $location.path('/login');
    })
  };
});
