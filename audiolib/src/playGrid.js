

// this function should be the function that actually runs and maintains the current notes.
// it will need to reference the current notes object in the main file.
// it should use context.currentTime to schedule...
// if there is an 8x8 grid, we will just follow this equation:
// time values = 8t + gridNumber
// or schedule time is  Math.floor(context.currentTime/gridNumbers) + gridNumber
// Again, this function should be modular and work fluidly with the class system.
// values below should be grid ( this.x, this.y )
// Should reference tempo, and 44100, 1, etc. should not be hardcoded.
// playSounds ( soundProfile, Modules, keys[key], volume, sampleSize, duration, current/grid[0].length)
// See playLoop code to see how we can simplify play Sounds even more

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