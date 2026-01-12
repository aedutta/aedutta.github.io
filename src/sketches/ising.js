const isingSketch = (p) => {
  const gridSize = 120;
  let cells;
  let pixelBuffer;
  let temperature = 2.27;

  const index = (x, y) => x + y * gridSize;

  const initializeGrid = () => {
    cells = new Int8Array(gridSize * gridSize);
    for (let i = 0; i < cells.length; i += 1) {
      cells[i] = Math.random() > 0.5 ? 1 : -1;
    }
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    p.pixelDensity(1);
    
    initializeGrid();
    pixelBuffer = p.createImage(gridSize, gridSize);
  };

  const step = () => {
    for (let k = 0; k < gridSize * gridSize; k += 1) {
      const i = Math.floor(Math.random() * gridSize);
      const j = Math.floor(Math.random() * gridSize);
      const idx = index(i, j);
      const s = cells[idx];

      const right = cells[index((i + 1) % gridSize, j)];
      const left = cells[index((i - 1 + gridSize) % gridSize, j)];
      const down = cells[index(i, (j + 1) % gridSize)];
      const up = cells[index(i, (j - 1 + gridSize) % gridSize)];

      const sumNeighbors = right + left + down + up;
      
      // Delta E = 2 * s * sum(neighbors)
      const deltaE = 2 * s * sumNeighbors;

      if (deltaE <= 0 || Math.random() < Math.exp(-deltaE / temperature)) {
        cells[idx] *= -1;
      }
    }
  };

  p.draw = () => {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      temperature = p.map(p.mouseX, 0, p.width, 0.5, 5.0);
    }

    for (let s = 0; s < 5; s += 1) {
      step();
    }

    pixelBuffer.loadPixels();
    for (let i = 0; i < cells.length; i += 1) {
      const val = cells[i];
      const idx = i * 4;
      
      if (val === 1) {
        pixelBuffer.pixels[idx] = 230;
        pixelBuffer.pixels[idx + 1] = 235;
        pixelBuffer.pixels[idx + 2] = 255;
      } else {
        pixelBuffer.pixels[idx] = 32;
        pixelBuffer.pixels[idx + 1] = 36;
        pixelBuffer.pixels[idx + 2] = 52;
      }
      pixelBuffer.pixels[idx + 3] = 255;
    }
    pixelBuffer.updatePixels();

    p.noSmooth();
    p.image(pixelBuffer, 0, 0, p.width, p.height);

    p.fill(255);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    
    p.fill(0, 0, 0, 150);
    p.rect(10, 10, 220, 60, 8);
    
    p.fill(255);
    p.text(`Temperature: ${temperature.toFixed(2)}`, 25, 25);
    
    p.textSize(12);
    p.fill(200);
    p.text(`Move mouse horizontally to change`, 25, 50);
    
    if (Math.abs(temperature - 2.27) < 0.1) {
        p.fill(100, 255, 100);
        p.text("Near Critical Point (Tc ≈ 2.27)", 25, 80);
    }
  };
};

export default isingSketch;
