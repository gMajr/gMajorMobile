  angular.module('gmajor.gridController', [])

.controller('GridController', function ($scope, Grid) {
  $scope.navTitle = 'Grid Yo!';

  $scope.columns = [[{name: [0,0], on: false},{name: [0,1], on: false} ,{name: [0,2], on: false} ,{name: [0,3], on: false}],
                    [{name: [1,0], on: false},{name: [1,1], on: false} ,{name: [1,2], on: false} ,{name: [1,3], on: false}],
                    [{name: [2,0], on: false},{name: [2,1], on: false} ,{name: [2,2], on: false} ,{name: [2,3], on: false}],
                    [{name: [3,0], on: false},{name: [3,1], on: false} ,{name: [3,2], on: false} ,{name: [3,3], on: false}]];
//Weird syntax, why we doing an array here, yo?
  $scope.leftButtons = {
    type: 'button-icon icon ion-navicon',
    tap: function(e) {
      console.log(e);
      console.log(context.currentTime);//TEST!!!!
      e['on']= !e['on'];
      Grid.toggle(e.key, Modules, SoundProfile);
    }
  };

  $scope.rightButtons = [];

  $scope.buttonClick = function(){
    console.log('button clicked');
  }
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

    // playSounds(SoundProfile, Modules, 100, 1, 44100, 1, 0 );
    // playSounds(SoundProfile, Modules, 600, 1, 44100, 1, 0 + .5);


});
