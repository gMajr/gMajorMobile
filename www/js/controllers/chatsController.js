angular.module('gmajor.chatsController', [])

.controller('ChatsController', function ($scope, $location, ChatsFactory) {

  $scope.navTitle = 'Chats';

	if(ChatsFactory.retrieved === false){
		ChatsFactory.getChatData(ChatsFactory.getAllChats, $scope, ChatsFactory);
		ChatsFactory.retrieved = true;  
	}
	// }else{

	// 	ChatsFactoryDataLength = ChatsFactory.data.length -1;
	// 	var users = _.uniq(ChatsFactory.data[ChatsFactoryDataLength].authors);
	// 	var gridNumbers = ChatsFactory.data[ChatsFactoryDataLength].music.length;
	// 	var last = 'Jan 01, 2014';
	// 	var id = ChatsFactoryDataLengh;
	// 	chats.push({users: users, gridNumbers: gridNumbers, last: last, id: id});
	// 	}
	// 	$scope.userChats = chats;
	// 	ChatsFactory.data = data;
	// }

	$scope.startNewChat = function(){
		ChatsFactory.newChat = true;
		$location.url('/' + 'grid');
	}

 
  $scope.navigateToChatScreen = function(chat){

  	ChatsFactory.currentID = chat.id;
  	$location.url('/' + 'chat')

  }



});
