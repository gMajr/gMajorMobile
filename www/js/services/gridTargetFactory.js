angular.module('gmajor.gridTargetFactory', ['gmajor.chatsFactory'])

.factory('GridTargetFactory', function(ChatsFactory){

  var iPhoneSVGWidth = 298;
  var nMax = 8;
  var mMax = 6;
  var targetSize = 16; // Size of touch target in SVG pixels
  var initCirR = 4;
  var selectedCirR = 12;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));
  // ideally, this would be made dynamic down the line.
  var BPM = '100';

  var columns = [];
  var soundBoardToggleCopy = [];

  var soundBoard = new SoundBoard();
  var startGrid = new Grid('piano', BPM, 329.63);
  soundBoard.addGrid(startGrid);

  // generate an m x n collection of target objects
    // Associate a row and column with each object
    // Generate the svg pixel offset for placing the target on the screen
    // Add a clickToggle function
    // There are two targets:
    // 1. a cicle with properites x, y, & circleR that indicates the target state
    // 2. an invisible rectangle overlayed onto them that recieves the click / touch events
    //    and acts as a bigger touch target. (rectY, rectY, rectHeight, & rectWidth)
  var clickToggle = function() {
    var currentBoard = soundBoard.Grids[soundBoard.Grids.length -1];
    var col = this.col;
    var row = this.row;
    soundBoard.toggle(col, row);
    // Copy soundBoard toggled positions for re-adding of positions if soundBoard changes.
    soundBoardToggleCopy.push({col: col, row: row});
    if (this.toggleState === 'off') {
      soundBoard.playSounds(currentBoard.keys[this.row], 1, 0);
      this.circleR = selectedCirR;
      this.toggleState = 'on';
    } else {
      this.circleR = initCirR;
      this.toggleState = 'off';
    }
  };

  for(var n = 0; n < nMax; n++) {
    var currColumn = [];
    currColumn.activeClass = undefined;
    for(var m = 0; m < mMax; m++) {
      var newTarget = {
        col: n,
        row: m,
        x: (n + 1) * nSpacingOffset,
        y: (m + 1) * mSpacingOffset,
        rectX: ((n + 1) * nSpacingOffset) - targetSize,
        rectY: ((m + 1) * mSpacingOffset) - targetSize,
        rectWidth: targetSize * 2,
        rectHeight: targetSize * 2,
        circleR: initCirR,
        toggleState: 'off',
        column: currColumn,
        clickToggle: clickToggle
      };
      currColumn.push(newTarget);
    }
    columns.push(currColumn);
  }

  // Changes the current grid to the configuration options.
  var configGrid = function(instrument, BPM) {
    var newGrid = new Grid(instrument, BPM, 329.63);
    soundBoard.removeGrid();
    soundBoard.addGrid(newGrid);

    // Re-add positions of toggled sounds on new soundBoard.
    for (var i=0; i<soundBoardToggleCopy.length; i++) {
      var pos = soundBoardToggleCopy[i];
      soundBoard.toggle(pos.col, pos.row);
    }
  }


  // return as array of arrays in column, row order.

  return {
    'BPM': BPM,
    'columns': columns,
    'play': soundBoard.playInterval.bind(soundBoard),
    'stop': soundBoard.stopSounds.bind(soundBoard),
    'soundBoard': soundBoard,
    'configGrid': configGrid
  };
});
