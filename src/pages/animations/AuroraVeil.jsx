import { useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import auroraVeilSketch from '../../sketches/auroraVeil.js';
import './animations.css';

const paletteOptions = ['Aurora', 'Twilight', 'Lagoon', 'Ember'];

const AuroraVeil = () => {
  const [palette, setPalette] = useState('Aurora');
  const [flowSpeed, setFlowSpeed] = useState(0.018);
  const [waveScale, setWaveScale] = useState(140);
  const [fade, setFade] = useState(18);

  return (
    <section>
      <h2>Aurora Veil</h2>
      <p>
        Make your own northern lights!
      </p>

      <div className="animations-controls">
        <label>
          Palette
          <select value={palette} onChange={(event) => setPalette(event.target.value)}>
            {paletteOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Flow speed
          <input
            type="range"
            min="5"
            max="40"
            step="1"
            value={Math.round(flowSpeed * 1000)}
            onChange={(event) => setFlowSpeed(Number(event.target.value) / 1000)}
          />
        </label>

        <label>
          Wave scale
          <input
            type="range"
            min="60"
            max="220"
            step="5"
            value={waveScale}
            onChange={(event) => setWaveScale(Number(event.target.value))}
          />
        </label>

        <label>
          Fade
          <input
            type="range"
            min="6"
            max="40"
            step="1"
            value={fade}
            onChange={(event) => setFade(Number(event.target.value))}
          />
        </label>
      </div>

      <P5Canvas
        sketch={auroraVeilSketch}
        settings={{ palette, flowSpeed, waveScale, fade }}
        className="sketch"
      />
    </section>
  );
};

export default AuroraVeil;
