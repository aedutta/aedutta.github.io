import { useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import flowFieldSketch from '../../sketches/flowField.js';
import './animations.css';

const colorOptions = ['Floral', 'Rainbow', 'Blues', 'Reds', 'Matcha', 'Sunset', 'Forest', 'Ocean', 'Fire'];

const FlowField = () => {
  const [trailLength, setTrailLength] = useState(25);
  const [colorScheme, setColorScheme] = useState('Floral');

  return (
    <section>
      <h2>Flow Field (Perlin Noise)</h2>
      <p>Particles drift through a Perlin noise vector field, painting organic textures with customizable palettes.</p>

      <div className="animations-controls">
        <label>
          Trail length
          <input
            type="range"
            min="0"
            max="255"
            step="5"
            value={trailLength}
            onChange={(event) => setTrailLength(Number(event.target.value))}
          />
        </label>
        <label>
          Color scheme
          <select value={colorScheme} onChange={(event) => setColorScheme(event.target.value)}>
            {colorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <P5Canvas sketch={flowFieldSketch} settings={{ trailLength, colorScheme }} className="sketch" />
    </section>
  );
};

export default FlowField;
