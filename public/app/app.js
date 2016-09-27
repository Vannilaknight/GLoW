angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ngCookies']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

  var routeRoleChecks = {
    admin: {auth: function(gAuth) {
      return gAuth.authorizeCurrentUserForRoute('admin')
    }},
    user: {auth: function(gAuth) {
      return gAuth.authorizeAuthenticatedUserForRoute()
    }}
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: '/partials/main/hub',
      controller: 'hubCtrl', resolve: routeRoleChecks.user
    })
    .when('/login', {
      templateUrl: '/partials/account/login',
      controller: 'accountCtrl', resolve: routeUserCheck.loggedIn
    })
    .when('/register', {
      templateUrl: '/partials/account/register',
      controller: 'accountCtrl'
    })
});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/login');
    }
  })
});
