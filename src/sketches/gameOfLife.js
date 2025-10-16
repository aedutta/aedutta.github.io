const gameOfLifeSketch = (p) => {
  const rows = 50;
  const cols = 50;
  const cellSize = 10;
  let cells = [];

  const randomGrid = () =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(p.random(2))));

  const countNeighbors = (grid, row, col) => {
    let sum = 0;
    for (let y = -1; y <= 1; y += 1) {
      for (let x = -1; x <= 1; x += 1) {
        const wrappedRow = (row + y + rows) % rows;
        const wrappedCol = (col + x + cols) % cols;
        sum += grid[wrappedRow][wrappedCol];
      }
    }
    sum -= grid[row][col];
    return sum;
  };

  p.setup = () => {
    p.createCanvas(cols * cellSize, rows * cellSize);
    cells = randomGrid();
  };

  p.draw = () => {
    p.background(10, 12, 18);
    p.noStroke();
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (cells[row][col] === 1) {
          p.fill(235);
          p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    p.stroke(70, 72, 90);
    p.strokeWeight(0.35);
    for (let i = 0; i <= rows; i += 1) {
      p.line(0, i * cellSize, cols * cellSize, i * cellSize);
    }
    for (let j = 0; j <= cols; j += 1) {
      p.line(j * cellSize, 0, j * cellSize, rows * cellSize);
    }

    const nextGen = Array.from({ length: rows }, () => Array(cols));
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const neighbors = countNeighbors(cells, row, col);
        if (cells[row][col] === 1) {
          nextGen[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
        } else {
          nextGen[row][col] = neighbors === 3 ? 1 : 0;
        }
      }
    }
    cells = nextGen;
  };
};

export default gameOfLifeSketch;
