angular.module('gmajor.chatsFactory', [])

.factory('ChatsFactory', function($http, $window){

  var getAllChats = function (){
    url = $window.location.origin + '/api/threads?author=Tyler'
    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp.data;
    });
  };


  var getChatData = function(getChatsFunction, $scope, factory){ 
    getChatsFunction()
    .then(function (data) {
      console.log(data);
      var chats = [];

      for ( var i = 0; i < data.length; i++){
        var users = _.uniq(data[i].authors);
        var gridNumbers = data[i].music.length;
        var last = 'Jan 01, 2014';
        var id = i;
        chats.push({users: users, gridNumbers: gridNumbers, last: last, id: id});

      }
      $scope.userChats = chats;
      factory.data = data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return {
    getAllChats: getAllChats,
    getChatData: getChatData,
    retrieved: false
  }



  });
// $http({
//   method:'POST',
//   url: 'http://localhost:8080/api/threads/53c86c8b09bd9d2bcc491a7b',
//   data: data
// }).success(function(a){
//   console.log(a);
// })

  // var data = [{_id: 'abcddsdfacsd', music: wow, authors:['Bob', 'Will'], messages: ['yo bro', 'So, today Ive been having a crazy awesome time at hack reactor if you know what I mean ']}, {_id: 'sweoifsndlkfsd', music: wow, authors:['Bob', 'Will', 'John'], messages: ['yo bro', 'So, today Ive been having a crazy awesome time at hack reactor if you know what I mean ']}];
  //here is where I would typically start.  I can begin building the array that we'll have.



