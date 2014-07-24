angular.module('gmajor.profileController', [])

.controller('ProfileController', function ($scope, $location) {
  $scope.user = {};
  $scope.user.photoUrl = window.sessionStorage['photoUrl'];
  $scope.user.id = window.sessionStorage['fbid'];
  $scope.navTitle = 'Profile';
  $scope.user.name=window.sessionStorage['name'];
  console.log('name from session', window.sessionStorage['name']);
  console.log('window session storage', window.sessionStorage);
});
