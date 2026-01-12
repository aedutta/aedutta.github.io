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
  let trailMode = 0;
  const trailLabels = ['Cyan', 'Rainbow', 'Velocity', 'Gold'];

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

  p.keyPressed = () => {
    if (p.key === 'c' || p.key === 'C') {
      trailMode = (trailMode + 1) % trailLabels.length;
    }
    if (p.key === 'r' || p.key === 'R') {
      buffer.background('black');
    }
  };

  p.draw = () => {
    p.imageMode(p.CORNER);
    p.image(buffer, 0, 0, p.width, p.height);

    if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      a1_v = 0;
      a2_v = 0;

      let mx = p.mouseX - cx;
      let my = p.mouseY - cy;

      // Inverse Kinematics to pull the pendulum
      // 1. Clamp distance to total length
      let d = p.dist(0, 0, mx, my);
      if (d > r1 + r2) {
        d = r1 + r2;
        const angle = p.atan2(mx, my);
        mx = d * p.sin(angle);
        my = d * p.cos(angle);
      }
      // Ensure non-zero checks
      if (d < 0.1) d = 0.1;

      // 2. Law of Cosines to find angle between r1 and d
      let cosAlpha = (r1 * r1 + d * d - r2 * r2) / (2 * r1 * d);
      cosAlpha = p.constrain(cosAlpha, -1, 1);
      const alpha = p.acos(cosAlpha);

      // 3. Set angles
      const theta = p.atan2(mx, my);
      a1 = theta - alpha;

      const x1_target = r1 * p.sin(a1);
      const y1_target = r1 * p.cos(a1);
      a2 = p.atan2(mx - x1_target, my - y1_target);

      // Reset trail buffer
      buffer.background('black');
      
      // Update previous pos to current so we don't draw a line from old pos
      const x2_reset = x1_target + r2 * p.sin(a2);
      const y2_reset = y1_target + r2 * p.cos(a2);
      px2 = x2_reset;
      py2 = y2_reset;
    } else {
      // Sub-stepping for stability:
      // Break the physics update into smaller time steps to prevent numerical errors
      // from exploding when velocities are high.
      const steps = 10;
      const dt = 1 / steps;

      for (let i = 0; i < steps; i++) {
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

        a1_v += a1_a * dt;
        a2_v += a2_a * dt;
        a1 += a1_v * dt;
        a2 += a2_v * dt;
      }
    }

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

    if (p.frameCount > 1) {
      if (trailMode === 0) {
        buffer.stroke('darkcyan');
      } else if (trailMode === 1) {
        buffer.colorMode(p.HSB, 360, 100, 100);
        buffer.stroke(p.frameCount % 360, 80, 100);
        buffer.colorMode(p.RGB);
      } else if (trailMode === 2) {
        let speed = p.dist(px2, py2, x2, y2);
        buffer.colorMode(p.HSB, 360, 100, 100);
        // Map speed: 0->Blue(240), High->Red(0)
        let hue = p.map(speed, 0, 5, 240, 0); 
        hue = p.constrain(hue, 0, 360);
        buffer.stroke(hue, 100, 100);
        buffer.colorMode(p.RGB);
      } else {
        buffer.stroke(255, 215, 0); // Gold
      }
      buffer.line(px2, py2, x2, y2);
    }

    px2 = x2;
    py2 = y2;

    // UI Overlay
    p.resetMatrix(); // Ensure text is drawn in screen coordinates
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Trail: ${trailLabels[trailMode]} (Press 'c' to cycle)`, 10, 10);
    p.text(`Clear: (Press 'r')`, 10, 30);
    p.text('Click & Drag to grab', 10, 50);
  };
};

export default doublePendulumSketch;
