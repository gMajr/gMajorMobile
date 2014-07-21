angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'Chats', iconClass: 'icon ion-map', link: 'chats'},
  ];

  // this is a bad implementation of dynamically changing login/logout buttons,
  // it should be fixed, right now the effects only occur on reload, which feels dumb.
  return {
    all: function() {
      var temp = menuItems;
      temp.push({ text: 'Login', iconClass: 'icon ion-map', link: 'login'  });
      return temp;
    },
    other: function(){
      var temp = menuItems;
      temp.push({ text: 'Log out', iconClass: 'icon ion-map', link: 'logout' });
      return temp;
    }
  }

});

