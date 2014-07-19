angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory, GridTargetFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();

    author = window.sessionStorage.name;
    music = GridTargetFactory.soundBoard.exportGrids();
    fbid = window.sessionStorage.fbid;

    dataToServer = {fbid: fbid, message: message, timestamp: timestamp, author: author, music: music};
    dataToServer = JSON.stringify(dataToServer);

    return dataToServer;

  };
  var addAdditionalComment = function(data){
    url = '/api/threads/' + ChatsFactory.data[ChatsFactory.currentID]._id;
    return $http({
      method: 'POST',
      url: url,
      data: data
    })
    .then(function (resp) {
      return resp.data;
    })
  };


  var addSong = function (data) {
    return $http({
      method: 'POST',
      url: '/api/threads',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    })
  };



  return {

    addSong: addSong,
    addNewComment: addNewComment,
    addAdditionalComment: addAdditionalComment

  }

  });
