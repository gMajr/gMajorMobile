angular.module('gmajor.userService', [])

.factory('User', function(){
  var userData = function(){
    openFB.api({
      path: '/me',
      params: {fields: 'id, name'},
      success: function(user) {
        // stores user/id in scope for client access
        window.sessionStorage['fbid'] = user.id;
        window.sessionStorage['name'] = user.name;
      },
      error: function(error) {
        console.log(error);
        console.log('Facebook error: ' + error.error_description);
      }
    });
  };
  return {
    userData: userData
  };

});