angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory, GridTargetFactory){

  // to minimize delay these should probably display instantly 
  // and fill in data on post response

  // format data for server
  var addNewComment = function(message){ 
    // clean this up a bit
    var timestamp = new Date();
    var author = window.sessionStorage.name;
    var music = GridTargetFactory.soundBoard.exportGrids();
    var fbid = window.sessionStorage.fbid;

    dataToServer = {
      fbid: fbid,
      message: message,
      timestamp: timestamp,
      author: author,
      music: music
    };
    dataToServer = JSON.stringify(dataToServer);

    return dataToServer;
  };

  // post data to existing thread
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

  // create new song/conversation on server
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
