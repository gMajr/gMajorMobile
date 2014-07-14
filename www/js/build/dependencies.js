// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gmajor' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gmajor.services' is found in services.js
// 'gmajor.controllers' is found in controllers.js
angular.module('gmajor', ['ionic',
                          'gmajor.controllers',
                          'gmajor.gridController',
                          'gmajor.gridService',
                          'gmajor.menuController',
                          'gmajor.menuService',
                          'gmajor.main',
                          'gmajor.gridTargetFactory',
                          'gmajor.directives'
                          ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('grid', {
          url: '/grid',
          controller: 'GridController',
          templateUrl: 'templates/grid.html'
      })
      .state('one', {
          url: '/one',
          controller: 'OneController',
          templateUrl: 'templates/one.html'
      })
      .state('two', {
          url: '/two',
          controller: 'TwoController',
          templateUrl: 'templates/two.html'
      })
      .state('three', {
          url: '/three',
          controller: 'ThreeController',
          templateUrl: 'templates/three.html'
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/grid');

});


angular.module('gmajor.gridService', [])

.factory('Grid', function(){

  var toggle = function(key, module, profile){
    // add note to grid
    // makes any noise
    playSounds('piano', 300, 1, 1, 0);

  };

  // var playTrack = function(){};
  // var loopGrid = function(){};
  // var setTempo = function(){};
  // var playGroup = function(){};
  return {
    toggle: toggle
  }

});

angular.module('gmajor.gridTargetFactory', [])

.factory('GridTargetFactory', function(){
  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 8;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));

  var columns = [];
  var soundBoard = new SoundBoard()
  var play = function(){
    // add note to grid
    // makes any noise
    soundBoard.playSounds('piano', 400, 1, 1, 0);
  };
  // generate an m x n collection of target objects
    // Associate a row and column with each object
    // Generate the svg pixel offset for placing the target on the screen
    // Add a clickToggle function
  for(var n = 0; n < nMax; n++) {
    var currColumn = [];
    for(var m = 0; m < mMax; m++) {
      var newTarget = {
        col: n,
        row: m,
        x: (n + 1) * nSpacingOffset,
        y: (m + 1) * mSpacingOffset,
        clickToggle: function() {
          // alert("Click button: " + this.col + " x " + this.row);
          play();

        }
      };
      currColumn.push(newTarget);
    }
    columns.push(currColumn);
  }



  // return as array of arrays in column, row order.

  return {
    'columns': columns,
    'play': play
  };
});

angular.module('gmajor.main', [])

.factory('Main', function(){


  // var playTrack = function(){};
  // var loopGrid = function(){};
  // var setTempo = function(){};
  // var playGroup = function(){};

  return {
    tempo: 95
  };

});

angular.module('gmajor.menuService', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
    { text: 'Grid', iconClass: 'icon ion-map', link: 'grid'},
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


angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, Grid, GridTargetFactory) {
  $scope.navTitle = 'Grid Yo!';

  $scope.columns = GridTargetFactory.columns;

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
}

})
.controller('OneController', function ($scope) {
    $scope.navTitle = "Page One Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('TwoController', function ($scope) {
    $scope.navTitle = "Page Two Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
})

.controller('ThreeController', function ($scope) {
    $scope.navTitle = "Page Three Title";

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            // TODO: Stuff on click
        }
    }];

    $scope.rightButtons = [];
});

angular.module('gmajor.menuController', [])

.controller('MenuController', function ($scope, $location, MenuService) {
  // "MenuService" is a service returning mock data (services.js)
  $scope.list = MenuService.all();

  $scope.goTo = function(page) {
    console.log('Going to ' + page);
    $location.url('/' + page);
  };
});
