angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {
  // somehow scope should be updated to have facebook name?
  // I think
  $scope.$root.loggedIn = false;

  $scope.logout = function(){
    openFB.logout();
    window.sessionStorage.clear();
    $scope.$root.loggedIn = false;
    console.log($scope.$root.loggedIn);
  };

  $scope.loginMain = function(){
    $scope.$root.loggedIn = true;
  };

});
// for reference at the moment, should not be here during deployment
// 'http://graph.facebook.com/endpoint?key=' + window.sessionStorage.fbid +'&access_token=' + window.sessionStorage.fbtoken