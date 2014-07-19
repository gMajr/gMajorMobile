angular.module('gmajor.chatController', [])

.controller('ChatController', function ($scope, ChatsFactory, $location, GridTargetFactory) {
  $scope.navTitle = 'Chat';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];
  $scope.chatStream = {};

  currentChatStream = ChatsFactory.data[ChatsFactory.currentID];
  var soundBoard = new SoundBoard(currentChatStream.music);
  chatStream = [];



  var currentlyPlaying = undefined;

  var stopAllPlaying = function() {
    if(currentlyPlaying !== undefined){
      if(currentlyPlaying !== 'all') {
        $scope.chatStream[currentlyPlaying].stopThis();
      } else {
        soundBoard.stopSounds();
        $scope.playAllButtonState.style = 'button-balanced';
        $scope.playAllButtonState.icon = 'ion-play';
        $scope.playAllButtonState.text = 'Play All';
      }
    }
  }

  $scope.playAllButtonState = {
    style: 'button-balanced',
    icon: 'ion-play',
    text: 'Play All'
  }

  $scope.playAll = function() {
    if(currentlyPlaying !== 'all') {
      stopAllPlaying();
      currentlyPlaying = 'all';
      soundBoard.playInterval(function(){});
      // Update the button since we're now playing
      $scope.playAllButtonState.style = 'button-assertive';
      $scope.playAllButtonState.icon = 'ion-stop';
      $scope.playAllButtonState.text = 'Stop';
    } else {
      stopAllPlaying();
      currentlyPlaying = undefined;
    }
  }

  var playThis = function(){
    console.log(this)
    stopAllPlaying();
    currentlyPlaying = this.id;
    this.musicGrid.playInterval();
    this.buttonState.style = 'button-assertive';
    this.buttonState.icon = 'ion-stop';
  }

  var stopThis = function(){
    currentlyPlaying = undefined;
    this.musicGrid.stopSounds();
    this.buttonState.style = 'button-balanced';
    this.buttonState.icon = 'ion-play';
  }

    for ( var i = 0; i < currentChatStream.messages.length; i++ ){
    id = i;
    username = currentChatStream.authors[i];
    comment = currentChatStream.messages[i];
    musicGrid = soundBoard.Grids[i];

    togglePlay = function(){
      if(currentlyPlaying === this.id) {
        this.stopThis();
      } else {
        this.playThis();
      }
    };
    playThis = playThis,
    stopThis = stopThis,
    buttonState = { style: 'button-balanced',
                   icon: 'ion-play'}
    chatStream.push({id: id, username: username, comment: comment, musicGrid: musicGrid, togglePlay: togglePlay, playThis: playThis, stopThis: stopThis,
      buttonState: buttonState });
  }
  $scope.chatStream = chatStream;

  $scope.addMusic = function(){

    GridTargetFactory.soundBoard.Grids = soundBoard.Grids;
    console.log(GridTargetFactory.soundBoard);
    $location.url('/' + 'grid')

  }

});
