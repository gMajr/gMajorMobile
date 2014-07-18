angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'Chats', iconClass: 'icon ion-map', link: 'chats'},
    { text: 'Chat', iconClass: 'icon ion-map', link: 'chat'}
  ];


  return {
    all: function() {
      return menuItems;
    }
  }
});

