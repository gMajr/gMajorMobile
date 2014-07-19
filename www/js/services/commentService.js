angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();
    author = window.sessionStorage.name;
    music = ChatsFactory.currentBoard.exportGrids();
    fbid = window.sessionStorage.fbid;
    console.log(music);

    dataToServer = {fbid: fbid, message: message, timestamp: timestamp, author: author, music: music};
    console.log(dataToServer);
    throw Error('contrivedError');


    dataToServer = JSON.stringify(dataToServer);
    addSong(dataToServer)
    ChatsFactory.newChat = false;

  };
  var addAdditionalComment = function(data, threadID){
    return $http({
      method: 'POST',
      url: '/api/threads/',
      data: data
    });
  };

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
