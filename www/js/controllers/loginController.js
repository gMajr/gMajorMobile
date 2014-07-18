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

  $scope.login = function(){
    openFB.login('', function(){
      console.log('success');
      window.location.href = window.location.origin + '/#/chats';
    },
    function(err){
      console.log(err);
    });
  }

});
