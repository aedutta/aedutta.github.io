const createBertrandSketch = (onProbabilityChange = () => {}, mode = 'endpoints') => (p) => {
  let countInside = 0;
  let countOutside = 0;
  const R = 200;
  const sideLen = R * Math.sqrt(3); // Side of equilateral triangle inscribed

  p.setup = () => {
    p.createCanvas(420, 420);
    p.background(0);
    p.stroke(255);
    p.noFill();
    p.push();
    p.translate(p.width / 2, p.height / 2);
    // Draw Circle
    p.stroke(255);
    p.ellipse(0, 0, R * 2, R * 2);
    
    // Draw Inscribed Triangle (Reference)
    p.stroke('red');
    p.strokeWeight(1);
    // Triangle vertices:
    // Top: (0, -R)? No, let's align so flat side is bottom or something.
    // Standard eq triangle:
    // V1 at angle -PI/2 (top) -> (0, -R)
    // V2 at angle -PI/2 + 2PI/3 -> (R cos(30), R sin(30)) -> (R*sqrt(3)/2, R/2)
    // V3 at angle -PI/2 + 4PI/3 -> ...
    
    // actually, let's just draw the chord length threshold reference?
    // The previous code drew a predefined triangle. Let's keep a simple triangle.
    // Points for triangle with top vertex at (0, -R)
    // V1: (0, -200)
    // V2: (173.2, 100)
    // V3: (-173.2, 100)
    p.line(0, -200, 100 * Math.sqrt(3), 100);
    p.line(0, -200, -100 * Math.sqrt(3), 100);
    p.line(-100 * Math.sqrt(3), 100, 100 * Math.sqrt(3), 100);
    p.pop();
  };

  p.draw = () => {
    p.push();
    p.translate(p.width / 2, p.height / 2);

    let x1, y1, x2, y2;
    let valid = true;

    if (mode === 'endpoints') {
      // Method 1: Random Endpoints
      const a1 = p.random(0, p.TWO_PI);
      const a2 = p.random(0, p.TWO_PI);
      x1 = R * Math.cos(a1);
      y1 = R * Math.sin(a1);
      x2 = R * Math.cos(a2);
      y2 = R * Math.sin(a2);

    } else if (mode === 'radius') {
      // Method 2: Random Radius
      const theta = p.random(0, p.TWO_PI); // Angle of radius
      const r_dist = p.random(0, R); // Random point on radius
      
      // The chord is perpendicular to this radius at distance r_dist
      // Midpoint M
      const mx = r_dist * Math.cos(theta);
      const my = r_dist * Math.sin(theta);
      
      // Half-length of chord
      const h = Math.sqrt(R*R - r_dist*r_dist);
      
      // Perpendicular angle
      const perp = theta + p.PI / 2;
      
      x1 = mx + h * Math.cos(perp);
      y1 = my + h * Math.sin(perp);
      x2 = mx - h * Math.cos(perp);
      y2 = my - h * Math.sin(perp);

    } else if (mode === 'midpoint') {
      // Method 3: Random Midpoint
      // Choose random point inside circle uniformally
      // To pick uniformly in a circle: r = R * sqrt(random())
      // But Method 3 specifically often refers to picking a point (x,y) uniformly in the bounding box/area
      // Let's use uniform area sampling:
      const r_dist = R * Math.sqrt(p.random(0, 1));
      const theta = p.random(0, p.TWO_PI);
      
      const mx = r_dist * Math.cos(theta);
      const my = r_dist * Math.sin(theta);
      
      const h = Math.sqrt(R*R - r_dist*r_dist);
      const perp = theta + p.PI / 2;
      
      x1 = mx + h * Math.cos(perp);
      y1 = my + h * Math.sin(perp);
      x2 = mx - h * Math.cos(perp);
      y2 = my - h * Math.sin(perp);
    }

    // Measure length
    const dx = x1 - x2;
    const dy = y1 - y2;
    const len = Math.sqrt(dx * dx + dy * dy);

    // Threshold: side of eq triangle = R * sqrt(3)
    // 200 * 1.732 = 346.4
    const threshold = R * Math.sqrt(3);

    if (len > threshold) {
      p.stroke('darkcyan'); // Longer than side
      countInside++; // "Success" usually implies longer
    } else {
      p.stroke('rgba(255, 255, 255, 0.1)'); // Shorter
      countOutside++;
    }
    
    p.strokeWeight(1);
    p.line(x1, y1, x2, y2);
    p.pop();

    const total = countInside + countOutside;
    if (total > 0) {
      onProbabilityChange(countInside / total); // Usually P(L > side)
    }
  };
};

export default createBertrandSketch;
