angular.module('app').factory('gUser', function($resource) {
  var UserResource = $resource('/user', {_id: "@id"}, {
    update: {method:'PUT',isArray:false}
  });

  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  };

  return UserResource;
});
