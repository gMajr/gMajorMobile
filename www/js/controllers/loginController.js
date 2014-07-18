angular.module('gmajor.loginController', [])

.controller('LoginController', function ($scope) {
  $scope.navTitle = 'Log In';
  
  // seems mostly pointless?
  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  //I assume this doesn't do anything
  $scope.buttonClick = function(){
    alert('button clicked');
  };

  $scope.login = function(){
    openFB.login('', function(){
      console.log('login successful');
      window.location.href = window.location.origin + '/#/grid';
    },
    function(err){
      console.log(err);
    });
  };

});
