angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'Chats', iconClass: 'icon ion-map', link: 'chats'},
    { text: 'Game', iconClass: 'icon ion-map', link: 'game'},
    { text: 'Profile', iconClass: 'icon ion-map', link: 'profile'},
  ];

  return {
    all: function() {
      return menuItems;
    }
  }

});

