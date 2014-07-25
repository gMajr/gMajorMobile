angular.module('gmajor.gameController', [])

.controller('GameController', function ($scope, $rootScope, $state, $timeout, $location, $ionicPopup, GameGridFactory) {
	// music playback variables
  var prevPlayingCol = 0;
	var loop = false;
  var playStatus = 'stopped';
  var BPM = '100';
  // game and scoring variables
  var roundStart;
  var roundEnd;
  var levelBonusTime = 10*1000; // in milliseconds
  if (!$rootScope.levelPenaltyTime) {
    $rootScope.levelPenaltyTime = 0;
  }
  if (!$rootScope.gameScore) {
    $rootScope.gameScore = 0;
  }
  $scope.level = $rootScope.gameLevel || 2;
  $scope.score = $rootScope.gameScore;
  var maxLevel = 8;

  // set up player and opponents
  // grids contain musical data
  // matrices contain visual data necessary for the UI to render
  // toggling a target in the matrix, updates it's grid
  // grids also contain a noteMatrix that represents the state of it's matrix in basic on/off (1 or 0) terms
  // the grids' noteMatrix is used for comparing grids and determining whether they match
  $scope.opponentGrid = new Grid('piano', BPM, 329.63, null, $scope.level);
  $scope.playerGrid = new Grid('piano', BPM, 329.63, null, $scope.level);
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
      // toggle silently
  		matrix[c][rowIndex].clickToggle(true);
  	}
  };
  // generate random opponent's matrix (and update that grid)
  randomizeMatrix($scope.opponentMatrix.matrix);

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
    // prevent loop in game mode
    if(!loop && playingCol === ($scope.level-1)) {
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

  ///////////////
  // Game
  ///////////////

  // Animated walkthrough of oppenents randomized matrix
  // player only sees one time
  $scope.playOpponentsSequence = function() {
    roundStart = new Date().getTime(); // timestamp
		$scope.currentMatrix = $scope.opponentMatrix;
  	$scope.playGrid();
  	$scope.readyToPlay = false;
  	//$scope.$apply();
  };

  // Show player an empty board to mirror the oppenents sequence on
  var playersTurn = function() {
  	$scope.currentGrid = $scope.playerGrid;
  	$scope.currentMatrix = $scope.playerMatrix;
  };

  // Player matches the opponent's sequence to beat the level
  $scope.submitPlayersSequence = function() {
    roundEnd = new Date().getTime(); // timestamp
  	var player = JSON.stringify($scope.playerGrid.noteMatrix);
  	var opponent = JSON.stringify($scope.opponentGrid.noteMatrix);
    var win = player === opponent;
    // progress through levels, beat the game, or lose
    if (!win) {
      $scope.showPopup("Almost!", "Try level " + $scope.level + " again?", $scope.restartLevel);
    } else if ($scope.level < maxLevel) {
  		$scope.showPopup("You beat the level!", "Keep going?", $scope.nextLevel);
  	} else if ($scope.level === maxLevel) {
      $scope.showPopup("WINNING!", "You're a gMajor ninja. You beat the game. Play again?", $scope.restartGame);
    }
  };

  // show alert when progressing through levels or starting over
	$scope.showPopup = function(title, msg, cb) {
	  $ionicPopup.alert({
	    title: title,
      template: msg
	  }).then(function(res) {
	  	cb();
    });
  };

  $scope.nextLevel = function() {
    // update penalty time
    $rootScope.levelPenaltyTime = $rootScope.levelPenaltyTime+(roundEnd-roundStart);
    // update level and game scores
    levelBonusTime -= $rootScope.levelPenaltyTime;
    if (levelBonusTime > 0) {
      $rootScope.gameScore += levelBonusTime;
    }
    // reset penalty time
    $rootScope.levelPenaltyTime = null;
    // move to next level
    $rootScope.gameLevel = $scope.level + 1;
    $state.go($state.current, {}, {reload: true});
  };

  $scope.restartLevel = function() {
    // update penalty time
    $rootScope.levelPenaltyTime = $rootScope.levelPenaltyTime+(roundEnd-roundStart);
    $state.go($state.current, {}, {reload: true});
  };

  $scope.restartGame = function() {
    $rootScope.gameScore = null;
    $rootScope.gameLevel = null;
  	$state.go($state.current, {}, {reload: true});
  };

  console.log("Score = ", $rootScope.gameScore);

});
