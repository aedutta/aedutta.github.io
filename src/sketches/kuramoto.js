const kuramootoSketch = (p) => {
  let oscillators = [];
  let numOscillators = 50;
  let coupling = 0.5; // Coupling strength K
  let radius = 180;
  let centerX, centerY;
  let couplingSlider, oscillatorSlider;
  let trailBuffer;
  let orderHistory = [];
  let maxHistoryLength = 150;
  
  class Oscillator {
    constructor(index) {
      this.index = index;
      // Natural frequency - normally distributed around 1
      this.naturalFreq = p.randomGaussian(1, 0.3);
      // Random initial phase
      this.phase = p.random(p.TWO_PI);
      this.freq = this.naturalFreq;
      // Color based on natural frequency with better range
      this.hue = p.map(this.naturalFreq, 0.4, 1.6, 200, 300);
      this.prevX = 0;
      this.prevY = 0;
    }
    
    update(oscillators) {
      // Kuramoto model: dθ/dt = ω + (K/N) * Σ sin(θ_j - θ_i)
      let sync = 0;
      for (let other of oscillators) {
        sync += p.sin(other.phase - this.phase);
      }
      
      this.freq = this.naturalFreq + (coupling / numOscillators) * sync;
      this.phase += this.freq * 0.01;
    }
    
    display(orderParam) {
      let angle = this.phase;
      let x = centerX + radius * p.cos(angle);
      let y = centerY + radius * p.sin(angle);
      
      p.push();
      p.colorMode(p.HSB, 360, 100, 100);
      
      // Draw trail on buffer
      if (this.prevX !== 0) {
        trailBuffer.push();
        trailBuffer.colorMode(p.HSB, 360, 100, 100);
        trailBuffer.stroke(this.hue, 70, 80, 15);
        trailBuffer.strokeWeight(2);
        trailBuffer.line(this.prevX, this.prevY, x, y);
        trailBuffer.pop();
      }
      
      // Draw line from center with gradient effect
      p.strokeWeight(1.5);
      let lineAlpha = p.map(orderParam, 0, 1, 0.15, 0.4);
      p.stroke(this.hue, 50, 85, lineAlpha * 100);
      p.line(centerX, centerY, x, y);
      
      // Draw oscillator with glow
      let size = p.map(orderParam, 0, 1, 10, 14);
      
      // Outer glow
      p.noStroke();
      p.fill(this.hue, 70, 95, 20);
      p.ellipse(x, y, size + 8, size + 8);
      
      // Main circle
      p.fill(this.hue, 80, 95);
      p.ellipse(x, y, size, size);
      
      // Highlight
      p.fill(this.hue, 30, 100, 60);
      p.ellipse(x - size * 0.15, y - size * 0.15, size * 0.4, size * 0.4);
      
      p.pop();
      
      this.prevX = x;
      this.prevY = y;
    }
  }
  
  p.setup = () => {
    p.createCanvas(600, 600);
    centerX = p.width / 2;
    centerY = p.height / 2;
    
    // Create graphics buffer for trails
    trailBuffer = p.createGraphics(p.width, p.height);
    trailBuffer.clear();
    
    // Create sliders with custom styling
    couplingSlider = p.createSlider(0, 3, coupling, 0.05);
    couplingSlider.position(20, p.height + 20);
    couplingSlider.style('width', '200px');
    couplingSlider.style('background', 'rgba(14, 16, 26, 0.9)');
    couplingSlider.style('border-radius', '4px');
    couplingSlider.style('height', '6px');
    couplingSlider.style('outline', 'none');
    couplingSlider.style('cursor', 'pointer');
    
    oscillatorSlider = p.createSlider(10, 100, numOscillators, 5);
    oscillatorSlider.position(20, p.height + 60);
    oscillatorSlider.style('width', '200px');
    oscillatorSlider.style('background', 'rgba(14, 16, 26, 0.9)');
    oscillatorSlider.style('border-radius', '4px');
    oscillatorSlider.style('height', '6px');
    oscillatorSlider.style('outline', 'none');
    oscillatorSlider.style('cursor', 'pointer');
    
    // Initialize oscillators
    for (let i = 0; i < numOscillators; i++) {
      oscillators.push(new Oscillator(i));
    }
  };
  
  p.draw = () => {
    // Use website theme background color
    p.background(12, 14, 20);
    
    // Update values from sliders
    coupling = couplingSlider.value();
    let newNumOscillators = oscillatorSlider.value();
    if (newNumOscillators !== numOscillators) {
      numOscillators = newNumOscillators;
      resetOscillators();
    }
    
    // Fade trail buffer slightly for motion blur effect
    trailBuffer.push();
    trailBuffer.fill(12, 14, 20, 8);
    trailBuffer.noStroke();
    trailBuffer.rect(0, 0, p.width, p.height);
    trailBuffer.pop();
    
    // Draw trails
    p.image(trailBuffer, 0, 0);
    
    // Calculate order parameter first
    let sumSin = 0;
    let sumCos = 0;
    for (let osc of oscillators) {
      sumSin += p.sin(osc.phase);
      sumCos += p.cos(osc.phase);
    }
    let orderParam = p.sqrt(sumSin * sumSin + sumCos * sumCos) / numOscillators;
    let meanPhase = p.atan2(sumSin, sumCos);
    
    // Store order parameter history
    orderHistory.push(orderParam);
    if (orderHistory.length > maxHistoryLength) {
      orderHistory.shift();
    }
    
    // Draw circle guide with pulsing based on synchronization
    p.noFill();
    let circleAlpha = p.map(orderParam, 0, 1, 0.06, 0.12);
    p.stroke(255, 255, 255, circleAlpha * 255);
    p.strokeWeight(1 + orderParam * 0.5);
    p.ellipse(centerX, centerY, radius * 2, radius * 2);
    
    // Draw mean field vector (collective synchronization direction)
    if (orderParam > 0.1) {
      let meanVecLength = radius * orderParam * 0.7;
      let meanX = centerX + meanVecLength * p.cos(meanPhase);
      let meanY = centerY + meanVecLength * p.sin(meanPhase);
      
      p.push();
      p.colorMode(p.HSB, 360, 100, 100);
      // Glow for vector
      p.stroke(280, 60, 90, 15);
      p.strokeWeight(12);
      p.line(centerX, centerY, meanX, meanY);
      
      // Main vector
      p.stroke(280, 80, 95, 80);
      p.strokeWeight(3);
      p.line(centerX, centerY, meanX, meanY);
      
      // Arrowhead
      let arrowSize = 8;
      let angle = p.atan2(meanY - centerY, meanX - centerX);
      p.fill(280, 80, 95, 80);
      p.noStroke();
      p.push();
      p.translate(meanX, meanY);
      p.rotate(angle);
      p.triangle(-arrowSize, -arrowSize/2, -arrowSize, arrowSize/2, 0, 0);
      p.pop();
      p.pop();
    }
    
    // Draw center point with glow
    p.push();
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
    p.fill(280, 40, 90, 20);
    p.ellipse(centerX, centerY, 16, 16);
    p.fill(244, 10, 96);
    p.ellipse(centerX, centerY, 8, 8);
    p.pop();
    
    // Update and display oscillators
    for (let osc of oscillators) {
      osc.update(oscillators);
    }
    
    for (let osc of oscillators) {
      osc.display(orderParam);
    }
    
    // Draw order parameter graph
    drawOrderGraph(orderHistory, orderParam);
    
    // Display info with theme colors
    p.fill(244, 246, 251); // #f4f6fb from theme
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT);
    p.text(`Coupling (K): ${coupling.toFixed(2)}`, 20, 30);
    p.text(`Synchronization: ${(orderParam * 100).toFixed(1)}%`, 20, 50);
    p.text(`Oscillators: ${numOscillators}`, 20, 70);
    
    // Slider labels with theme color
    p.textSize(12);
    p.fill(219, 225, 255, 191); // rgba(219, 225, 255, 0.75) from theme
    p.text('Coupling Strength (K)', 230, p.height + 35);
    p.text('Number of Oscillators', 230, p.height + 75);
    
    // Instructions
    p.text('Click: Reset phases', 20, p.height - 20);
  };
  
  function drawOrderGraph(history, currentOrder) {
    if (history.length < 2) return;
    
    let graphX = p.width - 170;
    let graphY = 20;
    let graphW = 150;
    let graphH = 80;
    
    // Background
    p.push();
    p.fill(14, 16, 26, 230);
    p.noStroke();
    p.rect(graphX, graphY, graphW, graphH, 4);
    
    // Border
    p.noFill();
    p.stroke(255, 255, 255, 20);
    p.strokeWeight(1);
    p.rect(graphX, graphY, graphW, graphH, 4);
    
    // Grid lines
    p.stroke(255, 255, 255, 10);
    for (let i = 0; i <= 4; i++) {
      let y = graphY + (graphH / 4) * i;
      p.line(graphX, y, graphX + graphW, y);
    }
    
    // Plot line
    p.noFill();
    p.colorMode(p.HSB, 360, 100, 100);
    p.stroke(250, 70, 90);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < history.length; i++) {
      let x = p.map(i, 0, maxHistoryLength - 1, graphX, graphX + graphW);
      let y = p.map(history[i], 0, 1, graphY + graphH, graphY);
      p.vertex(x, y);
    }
    p.endShape();
    
    // Label
    p.noStroke();
    p.fill(219, 225, 255, 191);
    p.textSize(11);
    p.textAlign(p.CENTER);
    p.text('Synchronization Over Time', graphX + graphW / 2, graphY + graphH + 15);
    
    p.pop();
  }
  
  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW) {
      coupling = p.min(coupling + 0.1, 3.0);
      couplingSlider.value(coupling);
    } else if (p.keyCode === p.DOWN_ARROW) {
      coupling = p.max(coupling - 0.1, 0);
      couplingSlider.value(coupling);
    } else if (p.keyCode === p.LEFT_ARROW) {
      numOscillators = p.max(numOscillators - 5, 10);
      oscillatorSlider.value(numOscillators);
      resetOscillators();
    } else if (p.keyCode === p.RIGHT_ARROW) {
      numOscillators = p.min(numOscillators + 5, 100);
      oscillatorSlider.value(numOscillators);
      resetOscillators();
    }
  };
  
  p.mousePressed = () => {
    resetOscillators();
  };
  
  function resetOscillators() {
    oscillators = [];
    for (let i = 0; i < numOscillators; i++) {
      oscillators.push(new Oscillator(i));
    }
    trailBuffer.clear();
    orderHistory = [];
  }
};

export default kuramootoSketch;
