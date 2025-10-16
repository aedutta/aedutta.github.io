const palettes = {
  Aurora: [
    { h: 180, s: 80, l: 55 },
    { h: 210, s: 70, l: 60 },
    { h: 165, s: 70, l: 55 },
    { h: 280, s: 70, l: 65 },
  ],
  Twilight: [
    { h: 250, s: 70, l: 55 },
    { h: 290, s: 65, l: 60 },
    { h: 330, s: 80, l: 55 },
    { h: 20, s: 80, l: 60 },
  ],
  Lagoon: [
    { h: 200, s: 65, l: 50 },
    { h: 165, s: 70, l: 52 },
    { h: 145, s: 65, l: 55 },
    { h: 120, s: 70, l: 58 },
  ],
  Ember: [
    { h: 30, s: 85, l: 60 },
    { h: 15, s: 90, l: 55 },
    { h: 0, s: 85, l: 50 },
    { h: 45, s: 80, l: 62 },
  ],
};

const auroraVeilSketch = (p, settingsRef) => {
  let t = 0;
  const glowParticles = [];

  const getSettings = () => ({
    palette: settingsRef?.current?.palette ?? 'Aurora',
    flowSpeed: settingsRef?.current?.flowSpeed ?? 0.015,
    waveScale: settingsRef?.current?.waveScale ?? 140,
    fade: settingsRef?.current?.fade ?? 16,
  });

  const createColor = ({ h, s, l }, alpha = 1) => p.color(h, s, l, alpha);

  p.setup = () => {
    p.createCanvas(640, 640);
    p.colorMode(p.HSL, 360, 100, 100, 1);
    p.background(228, 36, 6);

    for (let i = 0; i < 140; i += 1) {
      glowParticles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        radius: p.random(1.2, 2.6),
        drift: p.random(0.3, 0.9),
        hue: p.random(180, 260),
      });
    }
  };

  const drawGlow = (fade) => {
    p.noStroke();
    p.fill(228, 36, 6, fade / 255);
    p.rect(0, 0, p.width, p.height);

    glowParticles.forEach((particle, index) => {
      const wobble = Math.sin(t * 0.8 + index * 0.5) * particle.drift;
      const flicker = 0.5 + 0.5 * Math.sin(t * 1.1 + index);

      p.fill(particle.hue, 70, 65, 0.04 * flicker);
      p.circle(particle.x + wobble, particle.y + wobble, particle.radius * 4);
      p.fill(particle.hue, 60, 70, 0.07 * flicker);
      p.circle(particle.x + wobble, particle.y + wobble, particle.radius * 2);
    });
  };

  const drawRibbon = (layerIndex, palette, waveScale) => {
    const layerFraction = layerIndex / (palette.length + 2);
    const yBase = p.lerp(p.height * 0.2, p.height * 0.85, layerFraction + 0.08);
    const amplitude = waveScale * p.lerp(0.65, 1.15, layerFraction);
    const frequency = p.lerp(0.0009, 0.0018, layerFraction);
    const ribbonHue = palette[layerIndex % palette.length];

    p.beginShape();
    for (let x = -40; x <= p.width + 40; x += 10) {
      const noiseSeed = p.noise(x * frequency, layerIndex * 0.15, t * 0.4 + layerIndex * 0.25);
      const offset = (noiseSeed - 0.5) * amplitude;
      const y = yBase + offset;

      const nextColor = palette[(layerIndex + 1) % palette.length];
      const lerpAmount = p.constrain((x / p.width) + 0.5, 0, 1);
      const blend = p.lerpColor(createColor(ribbonHue, 0.85), createColor(nextColor, 0.55), lerpAmount);

      p.stroke(blend);
      p.strokeWeight(p.lerp(1.1, 2.4, layerFraction));
      p.noFill();
      p.vertex(x, y);
    }
    p.endShape();
  };

  p.draw = () => {
    const { palette: paletteName, flowSpeed, waveScale, fade } = getSettings();
    const palette = palettes[paletteName] ?? palettes.Aurora;

    drawGlow(fade);

    for (let i = 0; i < palette.length + 2; i += 1) {
      drawRibbon(i, palette, waveScale);
    }

    t += flowSpeed;
  };
};

export default auroraVeilSketch;
