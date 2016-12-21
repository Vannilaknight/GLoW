angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ngCookies'])
  .config(function ($routeProvider, $locationProvider) {
    console.log("works");
    // var routeRoleChecks = {
    //   admin: {
    //     auth: function (gAuth) {
    //       return gAuth.authorizeCurrentUserForRoute('admin')
    //     }
    //   },
    //   user: {
    //     auth: function (gAuth) {
    //       return gAuth.authorizeAuthenticatedUserForRoute()
    //     }
    //   }
    // };

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main/hub',
        controller: 'hubCtrl',
        // resolve: routeRoleChecks.user
      })
      .when('/login', {
        templateUrl: '/partials/account/login',
        controller: 'accountCtrl',
        // resolve: routeUserCheck.loggedIn
      })
      .when('/register', {
        templateUrl: '/partials/account/register',
        controller: 'accountCtrl'
      });
  })
  .run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/login');
      }
    })
  });
