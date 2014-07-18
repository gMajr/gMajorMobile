angular.module('gmajor.commentController', [])

.controller('CommentController', function ($scope, ChatsFactory, CommentFactory, $location) {

  $scope.text;
  $scope.navTitle = 'Add Comment';


  $scope.styles = 'button-balanced';
  $scope.icon = 'ion-play';

  currentlyPlaying = false;

  $scope.togglePlay = function($scope){

    if(currentlyPlaying){
      $scope.styles = 'button-balanced';
      $scope.icon = 'ion-play';
      ChatsFactory.currentBoard.stopSounds();
      currentlyPlaying = false;
    }else{
      $scope.styles = 'button-assertive';
      $scope.icon = 'ion-stop';
      ChatsFactory.currentBoard.playInterval();
      currentlyPlaying = true;
    }
  }

  $scope.addNewComment = function(){ 
    message = $scope.text;
    CommentFactory.addNewComment(message);
    // $location.url('/' + 'chats');
  }

  $scope.test = CommentFactory.test;

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
