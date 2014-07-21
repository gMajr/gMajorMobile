// I have no idea why we have these (they are still reqired in the app.js)
// will delete soon
angular.module('gmajor.controllers', [])

// * Legacy demo page controllers. These need to be moved out.
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
