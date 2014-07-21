angular.module('gmajor.loginController', [])

.controller('LoginController', function ($scope, User) {
  $scope.navTitle = 'Log In';
  

  $scope.login = function(){
    openFB.login('public_profile', function(){
      console.log('login successful');
      // a little janky, but works for now
      window.location.href = window.location.origin + '/#/chats';
      User.userData();
      $scope.loginMain();
      console.log($scope.$root.loggedIn);
    },
    function(err){
      console.log(err);
    });
  };

});
