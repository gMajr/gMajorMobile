// builds main grid ( 1st implementation)
var mainGrid = grid( 8, 8 );

// starts grid run
// feels clunky and dumb
var run = function(grid){
  for ( var current = 0; current < grid[0].length; current++ ){
    for (var key = 0; key < grid.length; key++){
      if ( grid[key][current] ){
        playSounds( SoundProfile, Modules, keys[key], 1, 44100, 1, current / grid[0].length );
      }
    }
  }
};

// hard key assignment, lame, but quick;
var keys = [100, 200, 300, 400, 500, 600, 700, 800];

// [[0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0]]
// keysNum  = row.length

// angular should be able to turn these keys on/off on click.
// ng-repeat make toggleable buttons (change 0 to 1)