angular.module('gmajor.controllers', [])

.controller('MenuController', function ($scope, $location, MenuService) {
    // "MenuService" is a service returning mock data (services.js)
    $scope.list = MenuService.all();

    $scope.goTo = function(page) {
        console.log('Going to ' + page);
        $location.url('/' + page);
    };
})

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
