angular.module('gmajor.chatsFactory', [])

.factory('ChatsFactory', function($http, $window ){
  // gets chat list from server
  var getAllChats = function (){
    url = $window.location.origin + '/api/threads'
    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  // parses chat data
  var processChatData = function(data){ 
    var chats = [];
    for ( var i = 0; i < data.length; i++){
      var users = _.uniq(data[i].authors);
      var gridNumbers = data[i].music.length;
      var last = 'Jan 01, 2014';
      var id = i;
      chats.push({users: users, gridNumbers: gridNumbers, last: last, id: id});
    }
    return chats;
  };

  // resets an individual grid to be blank (won't play tones)
  var resetBoard = function(GridTargetFactory){
    var boardState = GridTargetFactory.columns;

    for ( var i = 0; i < boardState.length; i++ ){
        boardState[i].activeClass = undefined;
      for ( var j = 0; j < boardState[j].length; j++ ){
        if ( boardState[i][j]['toggleState'] === 'on'){
          boardState[i][j].clickToggle();
        }
      }
    }

  };

  return {
    getAllChats: getAllChats,
    processChatData: processChatData,
    resetBoard: resetBoard
  }
});
