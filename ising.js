let gridSize = 100;
let cells = [];
let T = 2.27;
let cellSize;
let entropy = 0;

function setup() {
  createCanvas(800, 800);
  cellSize = width / gridSize;
  for (let i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (let j = 0; j < gridSize; j++) {
      cells[i][j] = Math.round(Math.random()) * 2 - 1;
    }
  }
}

function draw() {
  background('white');
  let positiveSpins = 0; 

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let totalEnergy = 0;
      
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (i+x >= 0 && i+x < gridSize && j+y >= 0 && j+y < gridSize) {
            totalEnergy += -cells[i][j] * cells[i+x][j+y];
          }
        }
      }

      let deltaEnergy = -2 * totalEnergy;
      let p = Math.exp(-deltaEnergy / T);
      if (Math.random() < p) {
        cells[i][j] *= -1;
      }

      fill(cells[i][j] == 1 ? 0 : 255);
      rect(i*cellSize, j*cellSize, cellSize, cellSize);

      // Count the number of positive spins
      if (cells[i][j] == 1) {
        positiveSpins++;
      }
    }
  }

  // entropy
  let fractionPositive = positiveSpins / (gridSize * gridSize);
  let fractionNegative = 1 - fractionPositive;
  entropy = -fractionPositive * Math.log(fractionPositive) - fractionNegative * Math.log(fractionNegative);

  fill(50);
  textSize(20);
  text("Temperature: " + T.toFixed(2), 10, 20);
  text("Entropy: " + entropy.toFixed(2), 10, 45);
}
