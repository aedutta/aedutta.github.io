let inc = 0.05;
let start = 0;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;
let trailSlider;
let colorDropdown;

function setup() {
  createCanvas(600, 600);
  colorMode(HSL, 255);
  background(255);

  trailSlider = createSlider(0, 255, 25, 5);
  trailSlider.position(10, height+30);
  createP('Trail Length:').position(10, height);
  
  colorDropdown = createSelect();
  colorDropdown.position(10, height + 75);
  colorDropdown.option('Floral');
  colorDropdown.option('Rainbow');
  colorDropdown.option('Blues');
  colorDropdown.option('Reds');
  colorDropdown.option('Matcha');
  colorDropdown.option('Sunset');
  colorDropdown.option('Forest');
  colorDropdown.option('Ocean');
  colorDropdown.option('Fire');
  colorDropdown.changed(clearCanvas);
  createP('Color Scheme:').position(10, height + 40);

  cols = floor(width / 20);
  rows = floor(height / 20);
  flowfield = new Array(cols * rows);
  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function clearCanvas() {
    background(255);
}

function draw() {
  let trailLength = trailSlider.value();
  fill(255, trailLength);
  rect(0, 0, width, height);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.lastPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.dist(this.lastPos) < 0.01) {
        this.resetPos();
    }
    this.lastPos = this.pos.copy();
  }

  this.resetPos = function() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

    this.show = function() {
      let hue;
      switch (colorDropdown.value()) {
        case 'Floral':
          hue = blendColors.call(this, color(0, 255, 127.5), color(127.5, 255, 127.5), color(212.5, 255, 127.5));
          stroke(hue);
          break;
        case 'Rainbow':
          hue = this.pos.x / width * 255;
          stroke(hue, 255, 127.5);
          break;
        case 'Blues':
          hue = blendColors.call(this, color(200, 255, 127.5), color(210, 255, 127.5), color(220, 255, 127.5));
          stroke(hue);
          break;
        case 'Reds':
          hue = blendColors.call(this, color(0, 255, 127.5), color(10, 255, 127.5), color(20, 255, 127.5));
          stroke(hue);
          break;
        case 'Matcha':
          hue = blendColors.call(this, color(90, 50, 205), color(110, 180, 130), color(120, 255, 90));
          stroke(hue);
          break;
        case 'Sunset':
          hue = blendColors.call(this, color(60, 255, 127.5), color(30, 255, 127.5), color(270, 255, 80));
          stroke(hue);
          break;
        case 'Forest':
          hue = blendColors.call(this, color(90, 255, 100), color(120, 255, 127.5), color(150, 255, 80));
          stroke(hue);
          break;
        case 'Ocean':
          hue = blendColors.call(this, color(160, 255, 127.5), color(200, 255, 127.5), color(240, 255, 50));
          stroke(hue);
          break;
        case 'Fire':
          hue = blendColors.call(this, color(60, 255, 127.5), color(20, 255, 127.5), color(0, 255, 90));
          stroke(hue);
          break;
      }
      strokeWeight(5);
      point(this.pos.x, this.pos.y);
  }
  
  function blendColors(c1, c2, c3) {
      let n = noise(this.pos.x * 0.05, this.pos.y * 0.05); 
      if (n < 0.33) {
          return lerpColor(c1, c2, map(n, 0, 0.33, 0, 1));
      } else if (n < 0.66) {
          return lerpColor(c2, c3, map(n, 0.33, 0.66, 0, 1));
      } else {
          return c3;
      }
  }
  this.follow = function(vectors) {
    let x = floor(this.pos.x / 20);
    let y = floor(this.pos.y / 20);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }
}
