let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let x3 = 0;
let y3 = 0;
let x4 = 0;
let y4 = 0;
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
let g = 0.5;

let px2 = -1;
let py2 = -1;
let px3 = -1;
let py3 = -1;
let cx, cy;

let buffer;
function setup() {
  createCanvas(500, 500);
  a1 = random(0, TWO_PI);
  a2 = random(0, TWO_PI);
  a3 = a1 + 0.01;
  a4 = a2 + 0.01;
  cx = width / 2;
  cy = 200;
  buffer = createGraphics(width, height);
  buffer.background('black');
  buffer.translate(cx, cy);
}

function draw() {
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  
  let num5 = -g * (2 * m3 + m4) * sin(a3);
  let num6 = -m4 * g * sin(a3 - 2 * a4);
  let num7 = -2 * sin(a3 - a4) * m4;
  let num8 = a4_v * a4_v * r4 + a3_v * a3_v * r3 * cos(a3 - a4);
  
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let den1 = r3 * (2 * m3 + m4 - m4 * cos(2 * a3 - 2 * a4));
  
  let a1_a = (num1 + num2 + num3 * num4) / den;
  let a3_a = (num5 + num6 + num7 * num8) / den1;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;
  
  num5 = 2 * sin(a3 - a4);
  num6 = a3_v * a3_v * r3 * (m3 + m4);
  num7 = g * (m3 + m4) * cos(a3);
  num8 = a3_v * a3_v * r4 * m4 * cos(a3 - a4);
  den1 = r3 * (2 * m3 + m4 - m4 * cos(2 * a3 - 2 * a4));
  let a4_a = (num5 * (num6 + num7 + num8)) / den1;


  translate(cx, cy);
  stroke('white');
  strokeWeight(2);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);
  
  let x3 = r3 * sin(a3);
  let y3 = r3 * cos(a3);
  
  let x4 = x3 + r4 * sin(a4);
  let y4 = y3 + r4 * cos(a4)

  line(0, 0, x1, y1);
  fill('white');
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill('white');
  ellipse(x2, y2, m2, m2);
  
  line(0,0, x3, y3)
  fill('white');
  ellipse(x3, y3, m3, m3);
  
  line(x3, y3, x4, y4);
  fill('white');
  ellipse(x4, y4, m4, m4);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  a3_v += a3_a;
  a4_v += a4_a;
  a3 += a3_v;
  a4 += a4_v;

  buffer.stroke('coral');
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }
  
  buffer.stroke('blueviolet');
  if (frameCount > 1) {
    buffer.line(px4, py4, x4, y4);
  }
  
  px4 = x4;
  py4 = y4;

  px2 = x2;
  py2 = y2;
}
