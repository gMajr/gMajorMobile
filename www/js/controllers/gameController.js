angular.module('gmajor.gameController', [])

.controller('GameController', function ($scope, $state, $timeout, $location, $ionicPopup, GameGridFactory) {
	var prevPlayingCol = 0;
	var loop = false;
  var playStatus = 'stopped';
  var BPM = '100';

  // set up player and opponents grids (musical) and matrices (visual)
  $scope.opponentGrid = new Grid('piano', BPM, 329.63);
  $scope.playerGrid = new Grid('piano', BPM, 329.63);
  $scope.opponentMatrix = GameGridFactory.newMatrix($scope.opponentGrid);
  $scope.playerMatrix = GameGridFactory.newMatrix($scope.playerGrid);

  // default settings loaded when state is intiated
  $scope.columns = $scope.playerMatrix.columns; // cheat
  $scope.currentBoard = $scope.opponentGrid;
  // show or hide play button
  $scope.readyToPlay = true;

  $scope.config = {};
  $scope.navTitle = 'Match Each Note';
 
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

  var startPlayingGrid = function() {
  	console.log("here ", $scope.currentBoard);
    $scope.currentBoard.playInterval(playcallback);
    playStatus = 'playing';
  }

  var stopPlayingGrid = function() {
    $scope.currentBoard.stopSounds();
    playStatus = 'stopped';
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
	    	stopPlayingGrid();
	    	playersTurn();
	    	$scope.$apply();
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

  // Game
  // Play one time
  $scope.playGame = function() {
		$scope.columns = $scope.opponentMatrix.columns;
  	$scope.playGrid();
  	$scope.readyToPlay = false;
  	$scope.$apply();
  };
  // Show player an empty board
  var playersTurn = function() {
  	$scope.currentBoard = $scope.playerGrid;
  	$scope.columns = $scope.playerMatrix.columns;
  };

  $scope.decideWinner = function() {
  	var player = JSON.stringify($scope.playerGrid.noteMatrix);
  	var opponent = JSON.stringify($scope.opponentGrid.noteMatrix);
  	if (player === opponent) {
  		$scope.winOrLose("You win!");
  	} else {
  		$scope.winOrLose("You lose!");
  	}
  };

  // show alert for invalid phone
	$scope.winOrLose = function(title) {
	  $ionicPopup.alert({
	    title: title,
      template: 'Would you like to play again?'
	  }).then(function(res) {
	  	$scope.restartGame();
    });
  };

  $scope.restartGame = function() {
  	// refresh state
  	$state.go($state.current, {}, {reload: true});
  };


});
