angular.module('gmajor.controllers', [])

.controller('MenuController', function ($scope, $location, MenuService) {
  // "MenuService" is a service returning mock data (services.js)
  $scope.list = MenuService.all();

  $scope.goTo = function(page) {
    console.log('Going to ' + page);
    $location.url('/' + page);
  };
})

.controller('GridController', function ($scope) {
  $scope.navTitle = 'Grid Yo!';

  $scope.leftButtons = [{
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
        // TODO: Stuff on click
    }
  }];

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    alert('button clicked');
    
    var SoundProfile = {
    name: 'piano',
    attack: function() { return 0.002; },
    dampen: function(sampleRate, frequency, volume) {
      return Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
    },
    wave: function(i, sampleRate, frequency, volume) {
      var base = Modules[0];
      return Modules[1](
        i,
        sampleRate,
        frequency,
        Math.pow(base(i, sampleRate, frequency, 0), 2) +
          (0.75 * base(i, sampleRate, frequency, 0.25)) +
          (0.1 * base(i, sampleRate, frequency, 0.5))
        );  
      }
    };

    // I have no idea what these do
    Modules = [
      function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
      },
      function(i, sampleRate, frequency, x) {
        return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
      }
    ];

    playSounds(SoundProfile, Modules, 100, 1, 44100, 1, 0 );
    playSounds(SoundProfile, Modules, 600, 1, 44100, 1, 0 + .5);
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
