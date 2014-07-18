angular.module('gmajor.userController', [])

.controller('UserController', function ($scope, User) {
  // this is pretty broken, need to refactor with promises and such
  $scope.currentUser = User.getUserName();
});
