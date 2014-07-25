angular.module('gmajor.userService', [])

.factory('User', function(){
  // handles user login
  var userData = function(){
    openFB.api({
      path: '/me',
      params: {fields: 'id, name, email'},
      success: function(user) {
        // stores user/id in scope for client access
        window.sessionStorage['photoUrl'] = 'https://graph.facebook.com/' + user.id+ '/picture?type=large';
        console.log('user id', user.id);
        window.sessionStorage['fbid'] = user.id;
        window.sessionStorage['name'] = user.name;
        window.sessionStorage['email'] = user.email;
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