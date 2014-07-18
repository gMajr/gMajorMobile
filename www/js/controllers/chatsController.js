angular.module('gmajor.chatsController', [])

.controller('ChatsController', function ($scope, $location, ChatsFactory) {

  $scope.getChatData = function(){ 
		ChatsFactory.getAllChats()
		.then(function (data) {
			var chats = [];

			for ( var i = 0; i < data.length; i++){
				var users = _.uniq(data[i].authors);
				var gridNumbers = data[i].music.length;
				var last = 'Jan 01, 2014';
				var id = i;
				chats.push({users: users, gridNumbers: gridNumbers, last: last, id: id});

			}
			$scope.userChats = chats;
			ChatsFactory.data = data;
		  })
		  .catch(function (error) {
		    console.error(error);
		  });
	}

	$scope.startNewChat = function(){

		$location.url('/' + 'grid');

	}

	$scope.getChatData();


  $scope.navTitle = 'Chats';
 
  $scope.navigateToChatScreen = function(chat){

  	ChatsFactory.currentID = chat.id;
  	$location.url('/' + 'chat')

  }



});
