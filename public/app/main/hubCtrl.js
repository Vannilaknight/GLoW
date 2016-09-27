angular.module('app').controller('hubCtrl', function ($scope, $rootScope, $http, $location, gIdentity, $cookies) {
  console.log($cookies.get('gIdentity'));
});
