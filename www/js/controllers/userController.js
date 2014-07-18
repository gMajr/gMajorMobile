angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {
  // somehow scope should be updated to have facebook name?
  // I think
  $scope.loggedIn = false;

  $scope.logout = function(){
    openFb.logout();
    $scope.loggedIn = false;
  };

});
// for reference at the moment, should not be here during deployment
// 'http://graph.facebook.com/endpoint?key=' + window.sessionStorage.fbid +'&access_token=' + window.sessionStorage.fbtoken