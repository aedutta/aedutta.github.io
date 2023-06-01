// create a 2D array to store the state of each cell
let cells = [];
let rows = 50;
let cols = 50;
let cellSize = 10;

function setup() {
  createCanvas(500, 500);
  // create a 2D array of cells with states of 0 or 1
  for (let i = 0; i < rows; i++) {
    cells[i] = [];
    for (let j = 0; j < cols; j++) {
      cells[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background('white');
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      if (cells[i][j] == 1) {
        fill('black');
        rect(x, y, cellSize, cellSize);
      }
    }
    
  for (let i = 0; i < (rows+1)*10; i+=10) {
    stroke('black')
    line(0, i, cols*10, i);
  }
  for (let j = 0; j < (cols+1)*10; j+=10) {
      stroke('black');
      line(j, 0, j, rows*10);
    }
  }

  // compute the next generation
  let nextgen = computeNextGen();

  // update the current cells with the next generation
  cells = nextgen;
}

// function to compute the next generation of cells
function computeNextGen() {
  // create a new 2D array for the next generation
  let nextgen = [];
  // loop through every cell
  for (let i = 0; i < rows; i++) {
    nextgen[i] = [];
    for (let j = 0; j < cols; j++) {
      // count the number of neighbors
      let neighbors = countNeighbors(i, j);
      // apply the rules of the game
      if (cells[i][j] == 1) {
        // Any live cell with two or three live neighbors survives.
        if (neighbors == 2 || neighbors == 3) nextgen[i][j] = 1;
        else nextgen[i][j] = 0; // Any live cell with fewer than two live neighbors dies, as if by underpopulation. Any live cell with more than three live neighbors dies, as if by overpopulation.
      } else {
        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        if (neighbors == 3) nextgen[i][j] = 1;
        else nextgen[i][j] = 0;
      }
    }
  }
  return nextgen;
}

// function to count the number of neighbors of a cell
function countNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += cells[col][row];
    }
  }
  sum -= cells[x][y];
  return sum;
}
