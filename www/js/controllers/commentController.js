angular.module('gmajor.commentController', [])

.controller('CommentController', function ($scope) {
  $scope.navTitle = 'Add Comment';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
  };

});
