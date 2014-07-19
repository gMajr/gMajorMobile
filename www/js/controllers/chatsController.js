angular.module('gmajor.chatsController', [])

.controller('ChatsController', function ($scope, $location, ChatsFactory, GridTargetFactory) {

  $scope.navTitle = 'Chats';

	ChatsFactory.getAllChats()
	.then(function (data) {
		 $scope.userChats = ChatsFactory.processChatData(data);
		 ChatsFactory.data = data;
	});

	$scope.startNewChat = function(){

		ChatsFactory.resetBoard(GridTargetFactory);
		var grid = new Grid('piano', 90, 329.63);
		GridTargetFactory.soundBoard.Grids[0] = grid;
		ChatsFactory.firstTime = true;
		$location.url('/' + 'grid');

	}

 
  $scope.navigateToChatScreen = function(chat){

  	ChatsFactory.currentID = chat.id;
  	$location.url('/' + 'chat')

  }



});
