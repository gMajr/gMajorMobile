
// This function can be built for scaleing.
// I also feel like this function wll be reference in the main.js file when defining a new grid.
// the function below should call this.rows, this.cols

var grid = function(rows, cols){
  var result = [];
  for ( var i = 0; i < rows; i++ ){
    result.push([]);
    for ( var j = 0; j < cols; j++ ){
      result[i][j] = 0;
    }
  }
  return result;
};