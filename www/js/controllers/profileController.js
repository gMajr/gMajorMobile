angular.module('gmajor.profileController', [])

.controller('ProfileController', function ($scope, $location) {
  $scope.user = {};
  $scope.user.photoUrl = window.sessionStorage['photoUrl'];
  $scope.user.id = window.sessionStorage['fbid'];
  $scope.navTitle = 'Profile';
  $scope.user.name=window.sessionStorage['name'];

    $scope.goTo = function(page) {
    // a bit wonky, but works in the short term
    if (page !== 'logout'){
      $location.url('/' + page);
    }else{
      $scope.logout();
    }
  };

});
