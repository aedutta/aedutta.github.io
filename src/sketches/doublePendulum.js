const doublePendulumSketch = (p) => {
  let r1 = 100;
  let r2 = 100;
  let m1 = 10;
  let m2 = 10;
  let a1 = 0;
  let a2 = 0;
  let a1_v = 0;
  let a2_v = 0;
  const g = 0.5;

  let px2 = -1;
  let py2 = -1;
  let cx;
  let cy;

  let buffer;

  p.setup = () => {
    p.createCanvas(500, 500);
    a1 = p.random(0, p.TWO_PI);
    a2 = p.random(0, p.TWO_PI);
    cx = p.width / 2;
    cy = 200;
    buffer = p.createGraphics(p.width, p.height);
    buffer.background('black');
    buffer.translate(cx, cy);
  };

  p.draw = () => {
    p.imageMode(p.CORNER);
    p.image(buffer, 0, 0, p.width, p.height);

    const num1 = -g * (2 * m1 + m2) * p.sin(a1);
    const num2 = -m2 * g * p.sin(a1 - 2 * a2);
    const num3 = -2 * p.sin(a1 - a2) * m2;
    const num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * p.cos(a1 - a2);
    const den = r1 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    const a1_a = (num1 + num2 + num3 * num4) / den;

    const num1b = 2 * p.sin(a1 - a2);
    const num2b = a1_v * a1_v * r1 * (m1 + m2);
    const num3b = g * (m1 + m2) * p.cos(a1);
    const num4b = a2_v * a2_v * r2 * m2 * p.cos(a1 - a2);
    const denb = r2 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    const a2_a = (num1b * (num2b + num3b + num4b)) / denb;

    p.push();
    p.translate(cx, cy);
    p.stroke('white');
    p.strokeWeight(2);

    const x1 = r1 * p.sin(a1);
    const y1 = r1 * p.cos(a1);
    const x2 = x1 + r2 * p.sin(a2);
    const y2 = y1 + r2 * p.cos(a2);

    p.line(0, 0, x1, y1);
    p.fill('white');
    p.ellipse(x1, y1, m1, m1);

    p.line(x1, y1, x2, y2);
    p.fill('white');
    p.ellipse(x2, y2, m2, m2);
    p.pop();

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    buffer.stroke('darkcyan');
    if (p.frameCount > 1) {
      buffer.line(px2, py2, x2, y2);
    }

    px2 = x2;
    py2 = y2;
  };
};

export default doublePendulumSketch;
