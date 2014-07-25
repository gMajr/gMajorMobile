angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {
  $scope.$root.loggedIn = false;

  $scope.logout = function(){
    openFB.logout();
    window.sessionStorage.clear();
    $scope.$root.loggedIn = false;
  };

  $scope.loginMain = function(){
    $scope.$root.loggedIn = true;
  };

});
