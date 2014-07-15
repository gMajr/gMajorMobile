angular.module('gmajor.loginController', [])

.controller('LoginController', function ($scope) {
  $scope.navTitle = 'Log In';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
  };

});
