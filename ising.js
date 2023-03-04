// First, we'll set up some global variables to store the state of our simulation.
let gridSize = 100; // We'll set the size of our grid to be 20x20
let cells = []; // This will be our 2D array of cells
let T = 2.27; // We'll set the temperature of our simulation to 2.27
let cellSize; // We'll use this to store the size of each cell

// Now, we'll create a 2D array of cells to store the state of our simulation
function setup() {
  createCanvas(800, 800);
  cellSize = width / gridSize;
  for (let i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (let j = 0; j < gridSize; j++) {
      // We'll randomly assign each cell a spin of either 1 or -1
      cells[i][j] = Math.round(Math.random()) * 2 - 1;
    }
  }
}

// Now, we'll use the Metropolis algorithm to simulate the Ising model
function draw() {
  background('white');
  // We'll loop through all the cells in our grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // We'll calculate the total energy of the cell
      let totalEnergy = 0;
      // We'll loop through the four adjacent cells
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          // We'll make sure we don't go out of bounds
          if (i+x >= 0 && i+x < gridSize && j+y >= 0 && j+y < gridSize) {
            // We'll add the energy of the adjacent cell to the total energy
            totalEnergy += -cells[i][j] * cells[i+x][j+y];
          }
        }
      }
      // We'll calculate the change in energy if we flip the cell
      let deltaEnergy = -2 * totalEnergy;
      // We'll calculate the probability of flipping the cell
      let p = Math.exp(-deltaEnergy / T);
      // We'll randomly decide whether to flip the cell
      if (Math.random() < p) {
        cells[i][j] *= -1;
      }
      // We'll draw the cell on the canvas
      fill(cells[i][j] == 1 ? 0 : 255);
      rect(i*cellSize, j*cellSize, cellSize, cellSize);
    }
  }
}
