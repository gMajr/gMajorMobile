angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'Grid', iconClass: 'icon ion-map', link: 'grid'},
    { text: 'Chats', iconClass: 'icon ion-map', link: 'chats'},
    { text: '1 Page One', iconClass: 'icon ion-map', link: 'one'},
    { text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
    { text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
  ];


  return {
    all: function() {
      return menuItems;
    }
  }
});

