angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'loginCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'signupCtrl'
        })
        .when('/confirmation', {
            templateUrl: '/partials/account/confirm',
            controller: 'confirmCtrl'
        })
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/login');
        }
    })
});
