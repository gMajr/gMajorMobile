angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, GridTargetFactory, ChatsFactory, $location) {
  var prevPlayingCol = 0;
  var playStatus = 'stopped';

  $scope.navTitle = window.sessionStorage.name || 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.config = {};

  // Select options for grid configuration.
  $scope.config.instrumentOptions = [
    {name: 'Piano', value: 'piano'},
    {name: 'Drums', value: 'drums'},
    {name: 'Organ', value: 'organ'},
    {name: 'Acoustic', value: 'acoustic'},
    {name: 'Edm', value: 'edm'}
  ];
  $scope.config.BPMOptions = [
    {name: 25, value: 25},
    {name: 50, value: 50},
    {name: 100, value: 100},
    {name: 200, value: 200},
    {name: 400, value: 400}
  ];

  $scope.config.instrument = 'piano';
  $scope.config.BPM = 100;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      // TODO: Stuff on click
      stopPlayingGrid();
    }
  }];

  $scope.addSongToChat = function(){
    GridTargetFactory.stop();
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

  // Change the instrument and BPM based on the input selection.
  $scope.changeGrid = function() {
    GridTargetFactory.configGrid($scope.config.instrument, $scope.config.BPM);
  }

  //Stop playing when the user navigates away via the side menu.
  $scope.$on('SideMenuNavigate', function(){
    stopPlayingGrid();
  })
});
