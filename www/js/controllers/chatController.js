angular.module('gmajor.chatController', [])

.controller('ChatController', function ($scope) {
  $scope.navTitle = 'Chat';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];


});
