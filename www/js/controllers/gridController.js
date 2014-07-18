angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, GridTargetFactory, ChatsFactory, $location) {
  var prevPlayingCol = 0;
  var playStatus = 'stopped';

  $scope.navTitle = 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
        stopPlayingGrid();
    }
  }];

  $scope.test = function(){

    ChatsFactory.currentGrid = GridTargetFactory.soundBoard.Grids[0];
    ChatsFactory.currentBoard = GridTargetFactory.soundBoard;
    $location.url('/' + 'comment');

  }

  $scope.rightButtons = [];

  $scope.playButtonText = 'Play';
  $scope.playButtonIcon = 'ion-play';
  $scope.playButtonStyle = 'button-balanced';

  var startPlayingGrid = function() {
    GridTargetFactory.play(playcallback);
    playStatus = 'playing';
    //Change the play button to a stop button
    $scope.playButtonText = 'Stop';
    $scope.playButtonIcon = 'ion-stop';
    $scope.playButtonStyle = 'button-assertive';
  }

  var stopPlayingGrid = function() {
    GridTargetFactory.stop();
    playStatus = 'stopped';
    //Change the stop button back to a play button
    $scope.playButtonText = 'Play';
    $scope.playButtonIcon = 'ion-play';
    $scope.playButtonStyle = 'button-balanced';
  }


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
      startPlayingGrid();
    } else {
      stopPlayingGrid();
    }
  }

  //Stop playing when the user navigates away via the side menu.
  $scope.$on('SideMenuNavigate', function(){
    stopPlayingGrid();
  })
});