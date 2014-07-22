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
    // hardcoded instrument for now, should be able to choose this later
		var grid = new Grid('piano', GridTargetFactory.BPM, 329.63);
		GridTargetFactory.soundBoard.Grids.splice(0, GridTargetFactory.soundBoard.Grids.length)
		//Because of closure scope, I cannot set a new Board, but need to alter the original array.
		GridTargetFactory.soundBoard.addGrid(grid);
		ChatsFactory.firstTime = true;
		$location.url('/' + 'grid');
	};

  $scope.navigateToChatScreen = function(chat){
  	ChatsFactory.currentID = chat.id;
  	$location.url('/' + 'chat');
  };

});
