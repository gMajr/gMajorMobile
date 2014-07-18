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
  return {
    getAllChats: getAllChats
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



