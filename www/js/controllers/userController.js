angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {

  openFB.api({
        path: '/me',
        params: {fields: 'id, name'},
        success: function(user) {
            // stores username in scope for client access
            // stores id in token for fbdata access (I hope this isn't a security issue)
            $scope.user = user.name;
            // feels janky
            window.sessionStorage['fbid'] = user.id;
        },
        error: function(error) {
            console.log(error);
            console.log('Facebook error: ' + error.error_description);
        }
    });

  $scope.logout = function(){
    openFb.logout();
    $scope.user = null;
  };

});
