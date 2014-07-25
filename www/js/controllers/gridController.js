angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, GridTargetFactory, ChatsFactory, $location, $ionicModal) {
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
    {name: 'EDM', value: 'edm'}
  ];
  $scope.config.BPMOptions = [
    {name: 40, value: 40},
    {name: 80, value: 80},
    {name: 100, value: 100},
    {name: 160, value: 160},
    {name: 200, value: 200}
  ];

  var currentBoard = GridTargetFactory.soundBoard.Grids[GridTargetFactory.soundBoard.Grids.length - 1];
  $scope.config.instrument = currentBoard.instrumentName;
  $scope.config.BPM = GridTargetFactory.BPM;

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
  };

  //Stop playing when the user navigates away via the side menu.
  $scope.$on('SideMenuNavigate', function(){
    stopPlayingGrid();
  });

  // Modal controls.
  $ionicModal.fromTemplateUrl('modal-audio-viz.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.removeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
