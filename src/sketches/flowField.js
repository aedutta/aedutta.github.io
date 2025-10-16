const flowFieldSketch = (p, settingsRef) => {
  const inc = 0.05;
  const step = 20;
  let cols;
  let rows;
  let zoff = 0;
  let particles = [];
  let flowfield = [];

  const getSettings = () => ({
    trailLength: settingsRef?.current?.trailLength ?? 25,
    colorScheme: settingsRef?.current?.colorScheme ?? 'Floral',
  });

  class Particle {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxspeed = 4;
      this.lastPos = this.pos.copy();
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);

      if (this.pos.dist(this.lastPos) < 0.01) {
        this.resetPos();
      }
      this.lastPos = this.pos.copy();
    }

    resetPos() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
    }

    edges() {
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;
    }

    show() {
      const { colorScheme } = getSettings();
      const noiseVal = p.noise(this.pos.x * 0.05, this.pos.y * 0.05);

      const blendColors = (c1, c2, c3) => {
        if (noiseVal < 0.33) {
          return p.lerpColor(c1, c2, p.map(noiseVal, 0, 0.33, 0, 1));
        }
        if (noiseVal < 0.66) {
          return p.lerpColor(c2, c3, p.map(noiseVal, 0.33, 0.66, 0, 1));
        }
        return c3;
      };

      let strokeColor;
      switch (colorScheme) {
        case 'Rainbow':
          strokeColor = p.color((this.pos.x / p.width) * 255, 255, 127.5);
          break;
        case 'Blues':
          strokeColor = blendColors(
            p.color(200, 255, 127.5),
            p.color(210, 255, 127.5),
            p.color(220, 255, 127.5),
          );
          break;
        case 'Reds':
          strokeColor = blendColors(
            p.color(0, 255, 127.5),
            p.color(10, 255, 127.5),
            p.color(20, 255, 127.5),
          );
          break;
        case 'Matcha':
          strokeColor = blendColors(
            p.color(90, 50, 205),
            p.color(110, 180, 130),
            p.color(120, 255, 90),
          );
          break;
        case 'Sunset':
          strokeColor = blendColors(
            p.color(60, 255, 127.5),
            p.color(30, 255, 127.5),
            p.color(270, 255, 80),
          );
          break;
        case 'Forest':
          strokeColor = blendColors(
            p.color(90, 255, 100),
            p.color(120, 255, 127.5),
            p.color(150, 255, 80),
          );
          break;
        case 'Ocean':
          strokeColor = blendColors(
            p.color(160, 255, 127.5),
            p.color(200, 255, 127.5),
            p.color(240, 255, 50),
          );
          break;
        case 'Fire':
          strokeColor = blendColors(
            p.color(60, 255, 127.5),
            p.color(20, 255, 127.5),
            p.color(0, 255, 90),
          );
          break;
        case 'Floral':
        default:
          strokeColor = blendColors(
            p.color(0, 255, 127.5),
            p.color(127.5, 255, 127.5),
            p.color(212.5, 255, 127.5),
          );
          break;
      }

      p.stroke(strokeColor);
      p.strokeWeight(5);
      p.point(this.pos.x, this.pos.y);
    }

    follow(vectors) {
      const x = Math.floor(this.pos.x / step);
      const y = Math.floor(this.pos.y / step);
      const index = x + y * cols;
      const force = vectors[index];
      if (force) {
        this.applyForce(force);
      }
    }

    applyForce(force) {
      this.acc.add(force);
    }
  }

  p.setup = () => {
    p.createCanvas(600, 600);
    p.colorMode(p.RGB, 255);
    p.background(6, 7, 12);
    cols = Math.floor(p.width / step);
    rows = Math.floor(p.height / step);
    flowfield = new Array(cols * rows);
    particles = Array.from({ length: 1000 }, () => new Particle());
  };

  p.draw = () => {
    const { trailLength } = getSettings();

  p.push();
  p.colorMode(p.RGB, 255);
  p.noStroke();
  p.fill(6, 7, 12, trailLength);
  p.rect(0, 0, p.width, p.height);
  p.pop();

  p.colorMode(p.HSL, 255);

    let yoff = 0;
    for (let y = 0; y < rows; y += 1) {
      let xoff = 0;
      for (let x = 0; x < cols; x += 1) {
        const index = x + y * cols;
        const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
  const v = p.createVector(Math.cos(angle), Math.sin(angle)).setMag(1);
  flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;
      zoff += 0.0003;
    }

    particles.forEach((particle) => {
      particle.follow(flowfield);
      particle.update();
      particle.edges();
      particle.show();
    });
  };
};

export default flowFieldSketch;
