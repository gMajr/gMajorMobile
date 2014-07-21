angular.module('gmajor.loginController', [])

.controller('LoginController', function ($scope, User) {
  $scope.navTitle = 'Log In';
  
  $scope.login = function(){
    openFB.login('public_profile', function(){
      // a little janky, but works for now
      window.location.href = window.location.origin + '/#/chats';
      User.userData();
      $scope.loginMain();
    },
    function(err){
      // maybe just throw this error?
      console.log(err);
    });
  };

});
