angular.module('gmajor.gameController', [])

.controller('GameController', function ($scope, $timeout, $location, GameGridFactory) {
	var prevPlayingCol = 0;
	var loop = false;
  var playStatus = 'stopped';
  var BPM = '100';

  $scope.opponentGrid = new Grid('piano', BPM, 329.63);
  $scope.playerGrid = new Grid('piano', BPM, 329.63);
  $scope.opponentMatrix = GameGridFactory.newMatrix($scope.opponentGrid);
  $scope.playerMatrix = GameGridFactory.newMatrix($scope.playerGrid);

  $scope.navTitle = 'Game';

  // active settings
  $scope.columns = $scope.opponentMatrix.columns;
  $scope.currentBoard = $scope.opponentGrid;

  $scope.config = {};
 
  $scope.config.instrument = $scope.currentBoard.instrumentName;
  $scope.config.BPM = BPM;

  // generate random opponent's grid
  var randomizeGrid = function(targetMatrix) {
  	for (var c = 0; c < targetMatrix.length; c++) {
  		var rowIndex = Math.floor(Math.random()*6);
  		targetMatrix[c][rowIndex].clickToggle();
  	}
  };
  randomizeGrid($scope.opponentMatrix.columns);


  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      // TODO: Stuff on click
      stopPlayingGrid();
    }
  }];

  $scope.rightButtons = [];

  $scope.playButtonText = 'Play';
  $scope.playButtonIcon = 'ion-play';
  $scope.playButtonStyle = 'button-balanced';

  var startPlayingGrid = function() {
  	console.log("here ", $scope.currentBoard);
    $scope.currentBoard.playInterval(playcallback);
    playStatus = 'playing';
    //Change the play button to a stop button
    $scope.playButtonText = 'Stop';
    $scope.playButtonIcon = 'ion-stop';
    $scope.playButtonStyle = 'button-assertive';
  }

  var stopPlayingGrid = function() {
    $scope.currentBoard.stopSounds();
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
    // prevent loop
    if(!loop && playingCol === 7) {
    	$timeout(function() {
	    	$scope.columns[playingCol].activeClass = undefined;
	    	$scope.$apply();
	    	stopPlayingGrid();
    	}, 100);
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
  });
});
