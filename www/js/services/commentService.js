angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();
    author = 'Tyler';
    music = ChatsFactory.currentBoard.exportGrids();
    console.log(music);

    dataToServer = {message: message, timestamp: timestamp, author: author, music: music};


    dataToServer = JSON.stringify(dataToServer);
    addSong(dataToServer)
    ChatsFactory.newChat = false;

  }

  var addSong = function (data) {
    return $http({
      method: 'POST',
      url: '/api/threads',
      data: data
    });
  };

  return {

    addSong: addSong,
    addNewComment: addNewComment

  }

  });