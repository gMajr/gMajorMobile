angular.module('gmajor.loginController', [])

.controller('LoginController', function ($scope, User) {
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
    openFB.login('public_profile', function(){
      console.log('login successful');
      // a little janky, but works for now
      window.location.href = window.location.origin + '/#/chats';
      User.userData();
      //seems odd to do this here, but we need the data...
      $scope.loggedIn = true; // should be better than this
    },
    function(err){
      console.log(err);
    });
  };

});
