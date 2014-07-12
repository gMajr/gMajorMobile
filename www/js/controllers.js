// should split these out once they do more
angular.module('gmajor.controllers', [])

.controller('OneController', function ($scope) {
    $scope.navTitle = "Page One Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('TwoController', function ($scope) {
    $scope.navTitle = "Page Two Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('ThreeController', function ($scope) {
    $scope.navTitle = "Page Three Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
});
