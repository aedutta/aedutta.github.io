let balls = [];
let numBalls = 300;
let hemisphereRadius;

function setup() {
    createCanvas(600, 600);
    hemisphereRadius = width * 0.4;
    
    for(let i = 0; i < numBalls; i++) {
        balls.push(new Ball(random(width/2 - 0.01, width/2 + 0.01), height/2 - 10));
    }
}

function draw() {
    background(220);

    strokeWeight(4);
    noFill();
    stroke(200);
    arc(width/2, height/2, hemisphereRadius*2, hemisphereRadius*2, 0, PI);
    
    for(let ball of balls) {
        ball.update();
        ball.show();
    }
}

class Ball {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0,0);
        this.acc = createVector(0, 0.3);
        this.radius = 2;
        this.color = color(random(255), random(255), random(255));
        this.trail = [];
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        let d = dist(this.pos.x, this.pos.y, width/2, height/2);
        if (d >= hemisphereRadius - this.radius) {
    let normal = createVector(this.pos.x - width/2, this.pos.y - height/2);
    normal.normalize();
    this.pos = p5.Vector.add(p5.Vector.mult(normal, hemisphereRadius - this.radius + 2), createVector(width/2, height/2));
    
    let reflect = this.vel.copy().sub(normal.mult(2 * this.vel.dot(normal)));
    this.vel = reflect;
}

        this.trail.push(this.pos.copy());
        if (this.trail.length > 20) {
            this.trail.shift();
        }
    }

    show() {
        stroke(this.color);
        noFill();
        beginShape();
        for (let v of this.trail) {
            vertex(v.x, v.y);
        }
        endShape();
        
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.radius*2);
    }
}
