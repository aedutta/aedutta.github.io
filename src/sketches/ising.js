const isingSketch = (p) => {
  const gridSize = 100;
  const temperature = 2.27;
  let cells = [];
  let cellSize;
  let entropy = 0;

  const initializeGrid = () => {
    cells = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => (Math.round(Math.random()) * 2 - 1)),
    );
  };

  const calculateEntropy = (positiveSpins) => {
    const total = gridSize * gridSize;
    const fractionPositive = positiveSpins / total;
    const fractionNegative = 1 - fractionPositive;
    let result = 0;
    if (fractionPositive > 0) {
      result += -fractionPositive * Math.log(fractionPositive);
    }
    if (fractionNegative > 0) {
      result += -fractionNegative * Math.log(fractionNegative);
    }
    return result;
  };

  p.setup = () => {
    p.createCanvas(800, 800);
    cellSize = p.width / gridSize;
    initializeGrid();
  };

  p.draw = () => {
    p.background(12, 14, 20);
    let positiveSpins = 0;

    for (let i = 0; i < gridSize; i += 1) {
      for (let j = 0; j < gridSize; j += 1) {
        let totalEnergy = 0;

        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            const nx = i + x;
            const ny = j + y;
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
              totalEnergy += -cells[i][j] * cells[nx][ny];
            }
          }
        }

        const deltaEnergy = -2 * totalEnergy;
        const probability = Math.exp(-deltaEnergy / temperature);
        if (Math.random() < probability) {
          cells[i][j] *= -1;
        }

        if (cells[i][j] === 1) {
          positiveSpins += 1;
          p.fill(230, 235, 255);
        } else {
          p.fill(32, 36, 52);
        }
        p.rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    entropy = calculateEntropy(positiveSpins);
    p.fill(226);
    p.noStroke();
    p.textSize(20);
    p.text(`Temperature: ${temperature.toFixed(2)}`, 10, 25);
    p.text(`Entropy: ${entropy.toFixed(2)}`, 10, 50);
  };
};

export default isingSketch;
