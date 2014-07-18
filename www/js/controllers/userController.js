angular.module('gmajor.userController', [])

.controller('UserController', function ($scope) {

  openFB.api({
        path: '/me',
        params: {fields: 'id, name'},
        success: function(user) {
            $scope.user = user;
            console.log($scope.user);
            // $scope.$apply(function() {
            //     $scope.user = user;
            // });
        },
        error: function(error) {
            console.log(error);
            alert('Facebook error: ' + error.error_description);
        }
    });
});
