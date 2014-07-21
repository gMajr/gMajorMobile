angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {
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
