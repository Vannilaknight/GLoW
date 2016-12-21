var user;
angular.module('app').factory('gAuth', function ($http, $rootScope, gIdentity, $q, gUser, $cookies) {
  if (!gIdentity.currentUser) {
    var savedIdentity = $cookies.get('gIdentity');
    if (savedIdentity) {
      gIdentity.currentUser = JSON.parse(savedIdentity).currentUser;
      $rootScope.currentUserId = gIdentity.currentUser;
    }
  }

  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function (response) {
        if (response.data.success) {
          user = new gUser();
          angular.extend(user, response.data.user);
          gIdentity.currentUser = user;
          $rootScope.currentUser = user;
          $cookies.putObject('gIdentity', gIdentity);
          window.parent.postMessage(user, "*");
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    createUser: function (newUserData) {
      var newUser = new gUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function () {
        gIdentity.currentUser = newUser;
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    updateCurrentUser: function (newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(gIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function () {
        gIdentity.currentUser = clone;
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    logoutUser: function () {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function () {
        gIdentity.currentUser = undefined;
        $rootScope.currentUserId = '';
        $cookies.remove('gIdentity');
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function (role) {
      if (gIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    },
    authorizeAuthenticatedUserForRoute: function () {
      if (gIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});
