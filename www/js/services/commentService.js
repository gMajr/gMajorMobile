angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();
    author = 'Tyler';
    music = ChatsFactory.currentBoard.exportGrids();

    dataToServer = {message: message, timestamp: timestamp, author: author, music: music};
    console.log(ChatsFactory);
    addSong(dataToServer)

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