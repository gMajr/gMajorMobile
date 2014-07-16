angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, GridTargetFactory) {
  var prevPlayingCol = 0;
  var playStatus = 'stopped';

  $scope.navTitle = 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.playButtonText = 'Play';
  $scope.playButtonStyle = 'button-balanced';


  var playcallback = function(playingCol) {
    if(playingCol >= 0){
      $scope.columns[prevPlayingCol].activeClass = undefined;
      $scope.columns[playingCol].activeClass = 'colActive';
      $scope.$apply();
      prevPlayingCol = playingCol;
    }
  }

  $scope.playGrid = function() {
    if(playStatus === 'stopped'){
      GridTargetFactory.play(playcallback);
      playStatus = 'playing';
      //Change the play button to a stop button
      $scope.playButtonText = 'Stop';
      $scope.playButtonStyle = 'button-assertive';
    } else {
      GridTargetFactory.stop();
      playStatus = 'stopped';
      //Change the stop button back to a play button
      $scope.playButtonText = 'Play';
      $scope.playButtonStyle = 'button-balanced';
    }
  }

});