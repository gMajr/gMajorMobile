angular.module('gmajor.chatsController', [])

.controller('ChatsController', function ($scope, $location, ChatsFactory) {
  
  $scope.navTitle = 'Chats';
  $scope.userChats = ChatsFactory.chats;
 
  $scope.navigateToChatScreen = function(chat){
  	console.log(chat);
  	ChatsFactory.currentID = chat.id;
  	$location.url('/' + 'chat')
  }



});
