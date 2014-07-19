angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory, GridTargetFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();
<<<<<<< HEAD
    author = window.sessionStorage.name;
    music = ChatsFactory.currentBoard.exportGrids();
    fbid = window.sessionStorage.fbid;
    console.log(music);
=======
    author = 'Tyler';
    music = GridTargetFactory.soundBoard.exportGrids();
>>>>>>> Began implementing a promise system to store data locally, so data appears immediately.

    dataToServer = {fbid: fbid, message: message, timestamp: timestamp, author: author, music: music};
    console.log(dataToServer);
    throw Error('contrivedError');

    console.log(dataToServer);
    dataToServer = JSON.stringify(dataToServer);
    return dataToServer;

  };
  var addAdditionalComment = function(data, threadID){
    return $http({
      method: 'POST',
      url: '/api/threads/',
      data: data
    });
  };

  // var addAdditionalComment = function(data) {

  // }

  //     return $http({
  //     method: 'GET',
  //     url: url
  //   })
  //   .then(function (resp) {
  //     return resp.data;
  //   });

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
    addNewComment: addNewComment

  }

  });
