const ballsSketch = (p) => {
  const numBalls = 300;
  const balls = [];
  let hemisphereRadius;

  class Ball {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0.3);
      this.radius = 2;
      this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.trail = [];
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      const d = p.dist(this.pos.x, this.pos.y, p.width / 2, p.height / 2);
      if (d >= hemisphereRadius - this.radius) {
        const normal = p.createVector(this.pos.x - p.width / 2, this.pos.y - p.height / 2).normalize();
        const constrained = normal
          .copy()
          .mult(hemisphereRadius - this.radius + 2)
          .add(p.width / 2, p.height / 2);
        this.pos.set(constrained.x, constrained.y);
        const reflect = this.vel.copy().sub(normal.copy().mult(2 * this.vel.dot(normal)));
        this.vel = reflect;
      }

      this.trail.push(this.pos.copy());
      if (this.trail.length > 20) {
        this.trail.shift();
      }
    }

    show() {
      p.stroke(this.color);
      p.noFill();
      p.beginShape();
      this.trail.forEach((v) => p.vertex(v.x, v.y));
      p.endShape();

      p.fill(this.color);
      p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }
  }

  p.setup = () => {
    p.createCanvas(600, 600);
    hemisphereRadius = p.width * 0.4;

    for (let i = 0; i < numBalls; i += 1) {
      balls.push(new Ball(p.random(p.width / 2 - 0.01, p.width / 2 + 0.01), p.height / 2 - 10));
    }
  };

  p.draw = () => {
  p.background(12);
  p.strokeWeight(3);
  p.noFill();
  p.stroke(80, 110, 255, 90);
    p.arc(p.width / 2, p.height / 2, hemisphereRadius * 2, hemisphereRadius * 2, 0, p.PI);

    balls.forEach((ball) => {
      ball.update();
      ball.show();
    });
  };
};

export default ballsSketch;
