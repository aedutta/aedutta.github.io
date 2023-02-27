//modified from coding train https://thecodingtrain.com/challenges/133-time-tables-cardioid-visualization
let r;
let factor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height / 2 - 16;
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  const total = 300; 
  factor += 0.02;
  
  translate(width / 2, height / 2);
  strokeWeight(3);
  noFill();
  ellipse(0, 0, r * 2);

  strokeWeight(3);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
    stroke(map(i,0,360,128+128,128-128),160,250,100);
  }
}
