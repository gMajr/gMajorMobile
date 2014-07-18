angular.module('gmajor.userService', [])

.factory('User', function(){

  var getUserName = function(){
    openFB.api({
      path: '/me',
      params: {fields: 'id, name'},
      success: function(user) {
        console.log(user);
        //this seems wrong right now
        //async, this will be/is broken
        return user;
      },
      error: function(error) {
        console.log(error);
        alert('Facebook error: ' + error.error_description);
      }
    });
  };

  return {
    getUserName: getUserName
  }

});