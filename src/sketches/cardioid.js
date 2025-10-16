const cardioidSketch = (p) => {
  let r;
  let factor = 0;
  const total = 300;

  const getVector = (index) => {
    const angle = p.map(index % total, 0, total, 0, p.TWO_PI) + p.PI;
    return p.createVector(Math.cos(angle), Math.sin(angle)).mult(r);
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    r = p.height / 2 - 16;
    p.colorMode(p.HSB, 255);
  };

  p.draw = () => {
    p.background(0);
    factor += 0.02;

    p.translate(p.width / 2, p.height / 2);
    p.strokeWeight(3);
    p.noFill();
    p.ellipse(0, 0, r * 2);

    for (let i = 0; i < total; i += 1) {
      const a = getVector(i);
      const b = getVector(i * factor);
      p.stroke(p.map(i, 0, 360, 128 + 128, 128 - 128), 160, 250, 100);
      p.line(a.x, a.y, b.x, b.y);
    }
  };
};

export default cardioidSketch;
