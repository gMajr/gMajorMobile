angular.module('gmajor.chatsController', [])

.controller('ChatsController', function ($scope) {
  $scope.navTitle = 'Chats';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];


});
