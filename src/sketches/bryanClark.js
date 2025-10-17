const bryanClarkSketch = (p) => {
  let reynoldsNumber = 2000;
  let time = 0;
  let reSlider;
  let transitionZone = { min: 2000, max: 4000 };
  
  // Flow simulation
  let flowSpeed = 3;
  let cylinderX, cylinderY, cylinderRadius;
  let streamlines = [];
  let numStreamlines = 14;
  let particles = [];
  let numParticles = 200;
  let vortices = [];
  let vortexShedFrequency = 0;
  
  class Streamline {
    constructor(startY) {
      this.startY = startY;
      this.points = [];
      this.reset();
    }
    
    reset() {
      this.points = [];
      let x = 0;
      let y = this.startY;
      
      // Generate streamline points
      while (x < p.width && this.points.length < 200) {
        this.points.push({ x, y });
        
        // Calculate flow around cylinder
        let dx = x - cylinderX;
        let dy = y - cylinderY;
        let dist = p.sqrt(dx * dx + dy * dy);
        
        let vx = flowSpeed;
        let vy = 0;
        
        if (dist > cylinderRadius + 5) {
          // Potential flow around cylinder (inviscid approximation)
          let r2 = cylinderRadius * cylinderRadius;
          let distSq = dx * dx + dy * dy;
          
          vx = flowSpeed * (1 - r2 * (dx * dx - dy * dy) / (distSq * distSq));
          vy = flowSpeed * (-2 * r2 * dx * dy / (distSq * distSq));
          
          // Add turbulence based on Reynolds number
          if (x > cylinderX && dist < cylinderRadius * 4) {
            let turbulence = getTurbulenceLevel();
            vx += (p.noise(x * 0.02, y * 0.02, time * 0.02) - 0.5) * turbulence * 3;
            vy += (p.noise(x * 0.02, y * 0.02 + 100, time * 0.02) - 0.5) * turbulence * 3;
          }
        } else if (dist <= cylinderRadius + 5) {
          // Inside or very close to cylinder - skip
          break;
        }
        
        x += vx * 0.5;
        y += vy * 0.5;
        
        // Break if out of bounds
        if (y < 0 || y > p.height) break;
      }
    }
    
    display() {
      if (this.points.length < 2) return;
      
      p.push();
      p.noFill();
      p.colorMode(p.HSB, 360, 100, 100);
      
      let regime = getFlowRegime();
      let hue = regime === 'laminar' ? 200 : regime === 'transition' ? 40 : 10;
      
      p.strokeWeight(1.5);
      p.stroke(hue, 60, 85, 0.7);
      
      p.beginShape();
      for (let pt of this.points) {
        p.vertex(pt.x, pt.y);
      }
      p.endShape();
      p.pop();
    }
  }
  
  
  class Vortex {
    constructor(x, y, strength, clockwise) {
      this.x = x;
      this.y = y;
      this.strength = strength; // vortex circulation strength
      this.clockwise = clockwise; // rotation direction
      this.radius = 25;
      this.maxRadius = 60;
      this.age = 0;
      this.maxAge = 180;
      this.vx = flowSpeed * 0.7; // vortices move downstream
    }
    
    update() {
      this.x += this.vx;
      this.age++;
      this.radius = p.min(this.radius + 0.3, this.maxRadius);
      
      // Fade strength over time
      this.strength *= 0.995;
    }
    
    isAlive() {
      return this.age < this.maxAge && this.x < p.width + 100;
    }
    
    // Calculate velocity induced by this vortex at position (px, py)
    getVelocityAt(px, py) {
      let dx = px - this.x;
      let dy = py - this.y;
      let distSq = dx * dx + dy * dy;
      let dist = p.sqrt(distSq);
      
      if (dist < 5) return { vx: 0, vy: 0 };
      
      // Vortex-induced velocity (tangential)
      let magnitude = this.strength / (dist * 2);
      let angle = p.atan2(dy, dx);
      
      if (this.clockwise) {
        return {
          vx: -magnitude * p.sin(angle),
          vy: magnitude * p.cos(angle)
        };
      } else {
        return {
          vx: magnitude * p.sin(angle),
          vy: -magnitude * p.cos(angle)
        };
      }
    }
    
    display() {
      p.push();
      p.colorMode(p.HSB, 360, 100, 100);
      
      // Draw vortex core
      let alpha = p.map(this.age, 0, this.maxAge, 60, 10);
      p.noFill();
      p.strokeWeight(2);
      p.stroke(10, 80, 90, alpha);
      
      // Spiral pattern
      for (let r = 10; r < this.radius; r += 10) {
        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.age * (this.clockwise ? 0.05 : -0.05));
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += 0.2) {
          let rad = r * (1 + 0.1 * p.sin(a * 3 + this.age * 0.1));
          let x = rad * p.cos(a);
          let y = rad * p.sin(a);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
        p.pop();
      }
      
      p.pop();
    }
  }
  
  class FlowParticle {
    constructor(immediate = false) {
      this.reset(immediate);
      this.speed = 0;
    }
    
    reset(immediate = false) {
      if (immediate) {
        // Spread particles across the entire left side initially
        this.x = p.random(-100, 0);
      } else {
        // Continuous inflow from left edge
        this.x = p.random(-30, -10);
      }
      this.y = p.random(cylinderY - cylinderRadius * 3.5, cylinderY + cylinderRadius * 3.5);
      this.vx = flowSpeed;
      this.vy = 0;
      this.size = p.random(3, 6);
      this.speed = 0;
    }
    
    update() {
      // Calculate distance to cylinder
      let dx = this.x - cylinderX;
      let dy = this.y - cylinderY;
      let dist = p.sqrt(dx * dx + dy * dy);
      
      if (dist < cylinderRadius - 2) {
        this.reset(false);
        return;
      }
      
      // Base flow calculation
      this.vx = flowSpeed;
      this.vy = 0;
      
      if (dist < cylinderRadius * 6) {
        // Potential flow modification around cylinder
        let r2 = cylinderRadius * cylinderRadius;
        let distSq = dx * dx + dy * dy;
        
        this.vx = flowSpeed * (1 - r2 * (dx * dx - dy * dy) / (distSq * distSq));
        this.vy = flowSpeed * (-2 * r2 * dx * dy / (distSq * distSq));
        
        // Add vortex-induced velocities
        for (let vortex of vortices) {
          let vortexVel = vortex.getVelocityAt(this.x, this.y);
          this.vx += vortexVel.vx;
          this.vy += vortexVel.vy;
        }
        
        // Add background turbulence
        if (this.x > cylinderX) {
          let turbulence = getTurbulenceLevel();
          this.vx += (p.noise(this.x * 0.03, this.y * 0.03, time * 0.03) - 0.5) * turbulence * 2;
          this.vy += (p.noise(this.x * 0.03, this.y * 0.03 + 100, time * 0.03) - 0.5) * turbulence * 2;
        }
      }
      
      // Calculate speed for color mapping
      this.speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
      
      this.x += this.vx;
      this.y += this.vy;
      
      // Reset if out of bounds
      if (this.x > p.width + 50 || this.y < -50 || this.y > p.height + 50) {
        this.reset(false);
      }
    }
    
    display() {
      p.push();
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();
      
      // Color map based on velocity magnitude
      // Blue (slow) -> Cyan -> Green -> Yellow -> Red (fast)
      let speedRatio = p.constrain(this.speed / (flowSpeed * 2), 0, 1);
      let hue = p.map(speedRatio, 0, 1, 220, 0); // 220 (cyan/blue) to 0 (red)
      let saturation = p.map(speedRatio, 0, 1, 70, 90);
      let brightness = p.map(speedRatio, 0, 1, 70, 95);
      
      // Add glow for high-speed particles
      if (speedRatio > 0.6) {
        let glowSize = this.size + 4;
        p.fill(hue, saturation * 0.6, brightness, 30);
        p.ellipse(this.x, this.y, glowSize, glowSize);
      }
      
      p.fill(hue, saturation, brightness);
      p.ellipse(this.x, this.y, this.size, this.size);
      p.pop();
    }
  }
  
  function getTurbulenceLevel() {
    if (reynoldsNumber < transitionZone.min) {
      return 0.05;
    } else if (reynoldsNumber > transitionZone.max) {
      return p.min(0.5 + (reynoldsNumber - transitionZone.max) / 10000, 1.5);
    } else {
      let mix = (reynoldsNumber - transitionZone.min) / (transitionZone.max - transitionZone.min);
      return p.lerp(0.05, 0.5, mix);
    }
  }
  
  function getFlowRegime() {
    if (reynoldsNumber < transitionZone.min) return 'laminar';
    if (reynoldsNumber > transitionZone.max) return 'turbulent';
    return 'transition';
  }
  
  p.setup = () => {
    p.createCanvas(900, 600);
    p.frameRate(60);
    
    cylinderX = p.width / 3.5;
    cylinderY = p.height / 2;
    cylinderRadius = 60; // Bigger cylinder
    
    // Create Reynolds number slider
    reSlider = p.createSlider(500, 8000, reynoldsNumber, 100);
    reSlider.position(20, p.height + 20);
    reSlider.style('width', '250px');
    reSlider.style('background', 'rgba(14, 16, 26, 0.9)');
    reSlider.style('border-radius', '4px');
    reSlider.style('height', '6px');
    reSlider.style('outline', 'none');
    reSlider.style('cursor', 'pointer');
    
    // Initialize streamlines
    for (let i = 0; i < numStreamlines; i++) {
      let y = p.map(i, 0, numStreamlines - 1, 80, p.height - 80);
      streamlines.push(new Streamline(y));
    }
    
    // Initialize particles - spread them out initially
    for (let i = 0; i < numParticles; i++) {
      particles.push(new FlowParticle(true));
    }
  };
  
  p.draw = () => {
    p.background(12, 14, 20);
    
    let prevRe = reynoldsNumber;
    reynoldsNumber = reSlider.value();
    time += 0.1;
    
    // Calculate vortex shedding frequency based on Reynolds number (Strouhal number ~ 0.2)
    if (reynoldsNumber > transitionZone.min) {
      vortexShedFrequency = 0.2 * flowSpeed / cylinderRadius * (reynoldsNumber / 2000);
    }
    
    // Regenerate streamlines if Re changed significantly
    if (p.abs(reynoldsNumber - prevRe) > 50 || p.frameCount % 30 === 0) {
      for (let streamline of streamlines) {
        streamline.reset();
      }
    }
    
    // Shed vortices in turbulent/transitional regime
    if (reynoldsNumber > transitionZone.min) {
      let shedPeriod = 60 / vortexShedFrequency;
      if (p.frameCount % p.floor(shedPeriod) === 0) {
        let strength = p.map(reynoldsNumber, transitionZone.min, 8000, 20, 100);
        let clockwise = (p.frameCount / p.floor(shedPeriod)) % 2 === 0;
        let offsetY = clockwise ? cylinderRadius * 0.7 : -cylinderRadius * 0.7;
        vortices.push(new Vortex(
          cylinderX + cylinderRadius * 1.2,
          cylinderY + offsetY,
          strength,
          clockwise
        ));
      }
    }
    
    // Update and clean up vortices
    for (let i = vortices.length - 1; i >= 0; i--) {
      vortices[i].update();
      if (!vortices[i].isAlive()) {
        vortices.splice(i, 1);
      }
    }
    
    // Draw color map legend
    drawColorLegend();
    
    // Draw flow direction indicator
    drawFlowIndicator();
    
    // Draw streamlines
    for (let streamline of streamlines) {
      streamline.display();
    }
    
    // Draw vortices
    for (let vortex of vortices) {
      vortex.display();
    }
    
    // Update and draw particles
    for (let particle of particles) {
      particle.update();
      particle.display();
    }
    
    // Continuously add particles to maintain steady flow (one per frame)
    particles.push(new FlowParticle(false));
    
    // Remove excess particles
    if (particles.length > numParticles) {
      particles.shift();
    }
    
    // Draw cylinder
    drawCylinder();
    
    // Display info
    displayInfo();
  };
  
  function drawFlowIndicator() {
    // Draw subtle arrows showing flow direction
    p.push();
    p.stroke(255, 255, 255, 30);
    p.strokeWeight(1);
    p.fill(255, 255, 255, 30);
    
    for (let i = 0; i < 5; i++) {
      let x = 30 + i * 40;
      let y = 30;
      p.line(x, y, x + 20, y);
      p.triangle(x + 20, y, x + 15, y - 3, x + 15, y + 3);
    }
    
    p.noStroke();
    p.fill(219, 225, 255, 100);
    p.textSize(11);
    p.textAlign(p.LEFT);
    p.text('Flow Direction →', 30, 50);
    p.pop();
  }
  
  function drawColorLegend() {
    let legendX = p.width - 180;
    let legendY = p.height - 140;
    let legendW = 160;
    let legendH = 100;
    
    p.push();
    
    // Background
    p.fill(14, 16, 26, 230);
    p.noStroke();
    p.rect(legendX, legendY, legendW, legendH, 6);
    
    // Border
    p.noFill();
    p.stroke(255, 255, 255, 20);
    p.strokeWeight(1);
    p.rect(legendX, legendY, legendW, legendH, 6);
    
    // Title
    p.fill(244, 246, 251);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('Velocity Color Map', legendX + 10, legendY + 20);
    
    // Color gradient bar
    p.colorMode(p.HSB, 360, 100, 100);
    let barX = legendX + 10;
    let barY = legendY + 35;
    let barW = legendW - 20;
    let barH = 25;
    
    for (let i = 0; i < barW; i++) {
      let ratio = i / barW;
      let hue = p.map(ratio, 0, 1, 220, 0);
      let saturation = p.map(ratio, 0, 1, 70, 90);
      let brightness = p.map(ratio, 0, 1, 70, 95);
      p.stroke(hue, saturation, brightness);
      p.line(barX + i, barY, barX + i, barY + barH);
    }
    
    // Labels
    p.noStroke();
    p.fill(219, 225, 255, 191);
    p.textSize(10);
    p.textAlign(p.LEFT);
    p.text('Slow', barX, barY + barH + 15);
    p.textAlign(p.RIGHT);
    p.text('Fast', barX + barW, barY + barH + 15);
    p.textAlign(p.CENTER);
    p.text('(Speed Magnitude)', legendX + legendW / 2, barY + barH + 30);
    
    p.pop();
  }
  
  function drawCylinder() {
    p.push();
    p.colorMode(p.HSB, 360, 100, 100);
    
    // Shadow/glow
    p.noStroke();
    p.fill(0, 0, 0, 40);
    p.ellipse(cylinderX + 3, cylinderY + 3, cylinderRadius * 2, cylinderRadius * 2);
    
    // Main cylinder
    let regime = getFlowRegime();
    let hue = regime === 'laminar' ? 200 : regime === 'transition' ? 40 : 10;
    
    p.fill(hue, 30, 50);
    p.stroke(hue, 40, 70);
    p.strokeWeight(2);
    p.ellipse(cylinderX, cylinderY, cylinderRadius * 2, cylinderRadius * 2);
    
    // Highlight
    p.noStroke();
    p.fill(hue, 20, 80, 60);
    p.ellipse(cylinderX - cylinderRadius * 0.3, cylinderY - cylinderRadius * 0.3, 
              cylinderRadius * 0.6, cylinderRadius * 0.6);
    
    p.pop();
  }
  
  function displayInfo() {
    p.push();
    
    // Info box
    let boxX = p.width - 280;
    let boxY = 20;
    let boxW = 260;
    let boxH = 140;
    
    p.fill(14, 16, 26, 230);
    p.noStroke();
    p.rect(boxX, boxY, boxW, boxH, 6);
    
    p.noFill();
    p.stroke(255, 255, 255, 20);
    p.strokeWeight(1);
    p.rect(boxX, boxY, boxW, boxH, 6);
    
    // Text info
    p.fill(244, 246, 251);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT);
    p.text(`Reynolds Number: ${reynoldsNumber}`, boxX + 15, boxY + 30);
    
    let regime = getFlowRegime();
    let regimeText = '';
    let regimeColor;
    
    if (regime === 'laminar') {
      regimeText = 'Laminar Flow';
      regimeColor = [100, 200, 255];
      p.text('• Smooth streamlines', boxX + 15, boxY + 70);
      p.text('• Predictable behavior', boxX + 15, boxY + 90);
      p.text('• No vortex shedding', boxX + 15, boxY + 110);
    } else if (regime === 'turbulent') {
      regimeText = 'Turbulent Flow';
      regimeColor = [255, 100, 100];
      p.text('• Chaotic streamlines', boxX + 15, boxY + 70);
      p.text('• Vortex shedding', boxX + 15, boxY + 90);
      p.text('• High mixing', boxX + 15, boxY + 110);
    } else {
      regimeText = 'Transitional Flow';
      regimeColor = [255, 200, 100];
      p.text('• Intermittent vortices', boxX + 15, boxY + 70);
      p.text('• Unstable streamlines', boxX + 15, boxY + 90);
      p.text('• Critical regime', boxX + 15, boxY + 110);
    }
    
    p.fill(...regimeColor);
    p.text(`Flow Regime: ${regimeText}`, boxX + 15, boxY + 50);
    
    // Bottom info
    p.fill(244, 246, 251);
    p.textSize(13);
    p.textAlign(p.LEFT);
    p.text('Flow Past a Cylinder', 20, p.height - 60);
    
    p.textSize(11);
    p.fill(219, 225, 255, 150);
    p.text('Adjust Reynolds number to see transition:', 20, p.height - 40);
    p.text('Re < 2000: Laminar  |  2000-4000: Transition  |  Re > 4000: Turbulent', 20, p.height - 25);
    
    // Slider label
    p.textSize(12);
    p.fill(219, 225, 255, 191);
    p.text('Reynolds Number', 280, p.height + 35);
    
    p.pop();
  }
  
  p.keyPressed = () => {
    if (p.key === 'r' || p.key === 'R') {
      for (let streamline of streamlines) {
        streamline.reset();
      }
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new FlowParticle(true));
      }
      vortices = [];
    }
  };
};

export default bryanClarkSketch;
