angular.module('gmajor.userService', [])

.factory('User', function(){
  var userData = function(){
    openFB.api({
          path: '/me',
          params: {fields: 'id, name'},
          success: function(user) {
              // stores username in scope for client access
              // stores id in token for fbdata access (I hope this isn't a security issue)
              // feels janky
              window.sessionStorage['fbid'] = user.id;
              //also super janky 
              console.log(user.name);
          },
          error: function(error) {
              console.log(error);
              console.log('Facebook error: ' + error.error_description);
          }
      });
  }
  return {
    userData: userData
  }

});