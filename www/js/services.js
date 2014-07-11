angular.module('gmajor.services', [])

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
})

.factory('GridTargetFactory', function(){
  var iPhoneSVGWidth = 298;
  var nMax = 4;
  var mMax = 4;
  var nSpacingOffset = Math.floor(298/(nMax+1));
  var mSpacingOffset = Math.floor(298/(mMax+1));

  var columns = [];
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
          alert("Click button: " + this.col + " x " + this.row);
        }
      };
      currColumn.push(newTarget);
    }
    columns.push(currColumn);
  }

  // return as array of arrays in column, row order.

  return { 'columns': columns };
});
