angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, Grid, GridTargetFactory) {
  $scope.navTitle = 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
}

});
