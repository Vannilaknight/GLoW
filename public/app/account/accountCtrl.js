angular.module('app').controller('accountCtrl', function ($scope, $rootScope, $http, gIdentity, gAuth, $location) {
  if(gIdentity.currentUser){
    $location.path('/');
  }

  $scope.identity = gIdentity;
  $rootScope.gIdentity = gIdentity;
  $scope.login = function (username, password) {
    gAuth.authenticateUser(username, password).then(function (success) {
      if (success) {
        console.log('You have successfully signed in!');
        $location.path('/');
      } else {
        console.log('Username/Password combination incorrect');
      }
    });
  };

  $scope.logout = function () {
    gAuth.logoutUser().then(function () {
      $scope.username = "";
      $scope.password = "";
      console.log('You have successfully signed out!');
      $location.path('/');
    })
  };

  $scope.signup = function () {
    var newUserData = {
      email: $scope.email,
      username: $scope.username,
      password: $scope.password,
      confirm: $scope.confirm,
    };

    console.log(newUserData);

    gAuth.createUser(newUserData).then(function () {
      console.log('User account created!');
      $location.path('/');
    }, function (reason) {
      console.error(reason);
    })
  }
});
