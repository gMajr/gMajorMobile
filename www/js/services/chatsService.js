angular.module('gmajor.chatsFactory', [])

.factory('ChatsFactory', function($http){

	var soundBoard = new SoundBoard();
  var grid = new Grid('piano', 90, 329.63);
  soundBoard.addGrid(grid);
  grid.toggle(3,2);
  grid.toggle(4,3);
  grid.toggle(4,4);
  grid.toggle(1,2);
  cb = function(){console.log('yo')}
  var grid1 = new Grid('piano', 90, 329.63);
  grid1.toggle(4,4);
  grid1.toggle(6,2);
  grid1.toggle(6,1);
  grid1.toggle(6,3);
  soundBoard.addGrid(grid1);


  var soundBoard1 = new SoundBoard();
  var grid2 = new Grid('piano', 90, 329.63);
  soundBoard1.addGrid(grid);
  grid2.toggle(3,2);
  grid2.toggle(4,3);
  grid2.toggle(4,4);
  grid2.toggle(1,2);
  cb = function(){console.log('yo')}
  var grid3 = new Grid('piano', 90, 329.63);
  grid3.toggle(4,4);
  grid3.toggle(6,2);
  grid3.toggle(6,1);
  grid3.toggle(6,3);
  soundBoard1.addGrid(grid1);
  var grid4 = new Grid('piano', 90, 329.63)
  grid4.toggle(3,3);
  grid4.toggle(5,2);
  grid4.toggle(2,6);
  soundBoard.addGrid(grid4);
  var wowz = soundBoard1.exportGrids();
  var wow = soundBoard.exportGrids();
  now = new Date();
  var data = {author: 'Will', music: wow, message: 'Wow this is really really working!!', timestamps: now}
  data = JSON.stringify(data)

  $http({
    method: 'GET',
    url: 'http://localhost:8100/api/threads?author=Tyler'
  }).success(function(data){
    console.log(data);
  })


  // {_id: ObjectId("aklsdkfldjkfs"), "authors" : ['Tyler'], messages: [], music: 'music'}


  // on POST: {'author: .... ', 'message': .... 'music': music}
  // localhost:8080/api/threads/id...



  var chats = [];
  var data = [{music: wow, authors:['Bob', 'Will'], messages: ['yo bro', 'So, today Ive been having a crazy awesome time at hack reactor if you know what I mean ']}, {music: wow, authors:['Bob', 'Will', 'John'], messages: ['yo bro', 'So, today Ive been having a crazy awesome time at hack reactor if you know what I mean ']}];
  //here is where I would typically start.  I can begin building the array that we'll have.

  for ( var i = 0; i < data.length; i++ ){

    var users = _.uniq(data[i].authors);
    var gridNumbers = data[i].music.length;
    var last = 'Jan 01, 2014'
    var id = i;
    chats.push({users: users, gridNumbers: gridNumbers, last: last, id: id});

  }

	return {
    data: data,
		chats: chats
	}



});