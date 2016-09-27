angular.module('app').factory('gIdentity', function ($window, gUser, $rootScope) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new gUser();
        $rootScope.currentUserId = currentUser;
        console.log("currentUser : " + $rootScope.currentUserId);
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})
