angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, $window){

  var addSong = function (data) {
    // return $http({
    //   method: 'POST',
    //   url: '/api/threads',
    //   data: data
    // });
  };

  return {
    addSong: addSong
  }

  });