angular.module('gmajor.commentController', [])

.controller('CommentController', function ($scope, ChatsFactory, CommentFactory, $location) {

  $scope.text;
  $scope.navTitle = 'Add Comment';


  $scope.styles = 'button-balanced';
  $scope.icon = 'ion-play';

  $scope.currentlyPlaying = false;

  $scope.togglePlay = function($scope){

    if($scope.currentlyPlaying){
      $scope.styles = 'button-balanced';
      $scope.icon = 'ion-play';
      ChatsFactory.currentBoard.stopSounds();
      $scope.currentlyPlaying = false;
    }else{
      $scope.styles = 'button-assertive';
      $scope.icon = 'ion-stop';
      ChatsFactory.currentBoard.playInterval();
      $scope.currentlyPlaying = true;
    }
  }

  $scope.addNewComment = function(){ 

    message = $scope.text;
    timestamp = new Date();
    author = 'Tyler';
    music = ChatsFactory.currentBoard.exportGrids();

    data = {message: message, timestamp: timestamp, author: author, music: music};
    CommentFactory.addSong(data);


    $location.url('/' + 'chats');
    ChatsFactory.data.push(data)



  }

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
  };

});
