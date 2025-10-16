const butterflyDoubleSketch = (p) => {
  let r1 = 100;
  let r2 = 100;
  let r3 = 100;
  let r4 = 100;
  let m1 = 10;
  let m2 = 10;
  let m3 = 10;
  let m4 = 10;
  let a1 = 0;
  let a2 = 0;
  let a3 = 0;
  let a4 = 0;
  let a1_v = 0;
  let a2_v = 0;
  let a3_v = 0;
  let a4_v = 0;
  const g = 0.5;

  let px2 = -1;
  let py2 = -1;
  let px4 = -1;
  let py4 = -1;
  let cx;
  let cy;

  let buffer;

  p.setup = () => {
    p.createCanvas(500, 500);
    a1 = p.random(0, p.TWO_PI);
    a2 = p.random(0, p.TWO_PI);
    a3 = a1 + 0.01;
    a4 = a2 + 0.01;
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

    const num5 = -g * (2 * m3 + m4) * p.sin(a3);
    const num6 = -m4 * g * p.sin(a3 - 2 * a4);
    const num7 = -2 * p.sin(a3 - a4) * m4;
    const num8 = a4_v * a4_v * r4 + a3_v * a3_v * r3 * p.cos(a3 - a4);
    const den1 = r3 * (2 * m3 + m4 - m4 * p.cos(2 * a3 - 2 * a4));
    const a3_a = (num5 + num6 + num7 * num8) / den1;

    const num1b = 2 * p.sin(a1 - a2);
    const num2b = a1_v * a1_v * r1 * (m1 + m2);
    const num3b = g * (m1 + m2) * p.cos(a1);
    const num4b = a2_v * a2_v * r2 * m2 * p.cos(a1 - a2);
    const denb = r2 * (2 * m1 + m2 - m2 * p.cos(2 * a1 - 2 * a2));
    const a2_a = (num1b * (num2b + num3b + num4b)) / denb;

    const num5b = 2 * p.sin(a3 - a4);
    const num6b = a3_v * a3_v * r3 * (m3 + m4);
    const num7b = g * (m3 + m4) * p.cos(a3);
  const num8b = a3_v * a3_v * r4 * m4 * p.cos(a3 - a4);
  const den1b = r3 * (2 * m3 + m4 - m4 * p.cos(2 * a3 - 2 * a4));
    const a4_a = (num5b * (num6b + num7b + num8b)) / den1b;

    p.push();
    p.translate(cx, cy);
    p.stroke('white');
    p.strokeWeight(2);

    const x1 = r1 * p.sin(a1);
    const y1 = r1 * p.cos(a1);
    const x2 = x1 + r2 * p.sin(a2);
    const y2 = y1 + r2 * p.cos(a2);
    const x3 = r3 * p.sin(a3);
    const y3 = r3 * p.cos(a3);
    const x4 = x3 + r4 * p.sin(a4);
    const y4 = y3 + r4 * p.cos(a4);

    p.line(0, 0, x1, y1);
    p.fill('white');
    p.ellipse(x1, y1, m1, m1);
    p.line(x1, y1, x2, y2);
    p.ellipse(x2, y2, m2, m2);

    p.line(0, 0, x3, y3);
    p.ellipse(x3, y3, m3, m3);
    p.line(x3, y3, x4, y4);
    p.ellipse(x4, y4, m4, m4);
    p.pop();

    a1_v += a1_a;
    a2_v += a2_a;
    a3_v += a3_a;
    a4_v += a4_a;
    a1 += a1_v;
    a2 += a2_v;
    a3 += a3_v;
    a4 += a4_v;

    buffer.stroke('coral');
    if (p.frameCount > 1) {
      buffer.line(px2, py2, x2, y2);
    }

    buffer.stroke('blueviolet');
    if (p.frameCount > 1) {
      buffer.line(px4, py4, x4, y4);
    }

    px2 = x2;
    py2 = y2;
    px4 = x4;
    py4 = y4;
  };
};

export default butterflyDoubleSketch;
