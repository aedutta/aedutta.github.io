const createBertrandSketch = (onProbabilityChange = () => {}) => (p) => {
  let countInside = 0;
  let countOutside = 0;

  p.setup = () => {
    p.createCanvas(420, 420);
    p.background(0);
    p.stroke(255);
    p.noFill();
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.ellipse(0, 0, 400, 400);
    p.stroke('red');
    p.line(0, -200, 100 * Math.sqrt(3), 100);
    p.line(0, -200, -100 * Math.sqrt(3), 100);
    p.line(-100 * Math.sqrt(3), 100, 100 * Math.sqrt(3), 100);
    p.pop();
  };

  p.draw = () => {
    p.push();
    p.translate(p.width / 2, p.height / 2);

    const a1 = p.random(0, p.TWO_PI);
    const a2 = p.random(0, p.TWO_PI);

    const x1 = 200 * Math.cos(a1);
    const y1 = 200 * Math.sin(a1);
    const x2 = 200 * Math.cos(a2);
    const y2 = 200 * Math.sin(a2);

    const dx = x1 - x2;
    const dy = y1 - y2;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len < 200 * Math.sqrt(3)) {
      p.strokeWeight(0.5);
      p.stroke('darkcyan');
      countInside += 1;
    } else {
      p.strokeWeight(0.5);
      p.stroke('azure');
      countOutside += 1;
    }
    p.line(x1, y1, x2, y2);
    p.pop();

    const total = countInside + countOutside;
    if (total > 0) {
      onProbabilityChange(countOutside / total);
    }
  };
};

export default createBertrandSketch;
