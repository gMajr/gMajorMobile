angular.module('gmajor.gameController', [])

.controller('GameController', function ($scope, $state, $timeout, $location, $ionicPopup, GameGridFactory) {
	var prevPlayingCol = 0;
	var loop = false;
  var playStatus = 'stopped';
  var BPM = '100';

  // set up player and opponents
  // grids contain musical data
  // matrices contain visual data necessary for the UI to render
  // toggling a target in the matrix, updates it's grid
  // grids also contain a noteMatrix that represents the state of it's matrix in basic on/off (1 or 0) terms
  // the grids' noteMatrix is used for comparing grids and determining whether they match
  $scope.opponentGrid = new Grid('piano', BPM, 329.63, null, 1);
  $scope.playerGrid = new Grid('piano', BPM, 329.63, null, 1);
  $scope.opponentMatrix = GameGridFactory.newMatrix($scope.opponentGrid);
  $scope.playerMatrix = GameGridFactory.newMatrix($scope.playerGrid);

  // the scopes columns render the visual grid in the UI
  // each column contains target objects with methods and data
  // both a current matrix and grid must be defined (for visual and music to correspond)
    // *TODO: make this a dummy empty board that isn't clickable
  $scope.currentMatrix = $scope.playerMatrix; // (this is a cheat)
  $scope.currentGrid = $scope.opponentGrid;
  // shows or hide play button
  $scope.readyToPlay = true;
 
  $scope.navTitle = 'Match Each Note';
 
  // configure instruments to use in template if desired
  $scope.config = {};
  $scope.config.instrument = $scope.currentGrid.instrumentName;
  $scope.config.BPM = BPM;

  // creates a random matrix with 1 note per column
  var randomizeMatrix = function(matrix) {
  	for (var c = 0; c < matrix.length; c++) {
  		var rowIndex = Math.floor(Math.random()*6);
  		matrix[c][rowIndex].clickToggle();
  	}
  };
  // generate random opponent's matrix (and update that grid)
  randomizeMatrix($scope.opponentMatrix.matrix);

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      // TODO: Stuff on click
      stopPlayingGrid();
    }
  }];

  var startPlayingGrid = function() {
    $scope.currentGrid.playInterval(playcallback);
    playStatus = 'playing';
  }

  var stopPlayingGrid = function() {
    $scope.currentGrid.stopSounds();
    playStatus = 'stopped';
  }

  var playcallback = function(playingCol) { 	
    if(playingCol >= 0){
      $scope.currentMatrix.matrix[prevPlayingCol].activeClass = undefined;
      $scope.currentMatrix.matrix[playingCol].activeClass = 'colActive';
      $scope.$apply();
      prevPlayingCol = playingCol;
    }
    // prevent loop
    if(!loop && playingCol === 8) {
    	$timeout(function() {
	    	$scope.currentMatrix.matrix[playingCol].activeClass = undefined;
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
		$scope.currentMatrix = $scope.opponentMatrix;
  	$scope.playGrid();
  	$scope.readyToPlay = false;
  	$scope.$apply();
  };
  // Show player an empty board
  var playersTurn = function() {
  	$scope.currentGrid = $scope.playerGrid;
  	$scope.currentMatrix = $scope.playerMatrix;
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
