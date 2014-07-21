angular.module('gmajor.commentController', [])

.controller('CommentController', function ($scope, ChatsFactory, CommentFactory, $location, GridTargetFactory, $http) {

  $scope.text;
  $scope.navTitle = 'Add Comment';


  $scope.styles = 'button-balanced';
  $scope.icon = 'ion-play';

  currentlyPlaying = false;

  $scope.togglePlay = function($scope){

    if(currentlyPlaying){
      $scope.styles = 'button-balanced';
      $scope.icon = 'ion-play';
      GridTargetFactory.stop();
      currentlyPlaying = false;
    }else{
      $scope.styles = 'button-assertive';
      $scope.icon = 'ion-stop';
      GridTargetFactory.play();
      currentlyPlaying = true;
    }
  }


//store in local storage... 
  $scope.addNewComment = function(){ 
    message = $scope.text;
    if (ChatsFactory.firstTime === true){
      var serverData = CommentFactory.addNewComment(message);
      CommentFactory.addSong(serverData)
      .then(function(data){
        ChatsFactory.firstTime = false;
        $location.url('/' + 'chats');
        GridTargetFactory.stop()
        //add local storage logic here :):):)
      })
    }else{
      var serverData = CommentFactory.addNewComment(message);
      CommentFactory.addAdditionalComment(serverData)
      .then(function(data){
        $location.url('/' + 'chats');
        GridTargetFactory.stop()
      })
    }
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
