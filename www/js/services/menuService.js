angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'New Sound', iconClass: 'icon ion-play', link: 'grid'},
    { text: 'Chats', iconClass: 'icon ion-music-note', link: 'chats'},
    { text: 'Game', iconClass: 'icon ion-game-controller-b', link: 'game'},
    { text: 'Profile', iconClass: 'icon ion-person', link: 'profile'},
  ];

  return {
    all: function() {
      return menuItems;
    }
  }

});

