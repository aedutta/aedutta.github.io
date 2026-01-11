import { useCallback, useMemo, useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import createBertrandSketch from '../../sketches/bertrand.js';
import './animations.css';

const Bertrand = () => {
  const [probability, setProbability] = useState(0);
  const [mode, setMode] = useState('endpoints');
  const handleProbability = useCallback((value) => setProbability(value), []);

  const sketch = useMemo(() => createBertrandSketch(handleProbability, mode), [handleProbability, mode]);

  return (
    <section>
      <h2>Bertrand's Paradox</h2>
      <div className="animations-text">
        <p>
          Bertrand's Paradox asks: "What is the probability that a random chord in a circle is longer than the side of the equilateral triangle inscribed in that circle?"
        </p>
        <p>
          The answer depends on how you define "random chord". There are three common interpretations:
        </p>
        <ul>
          <li><strong>Random Endpoints:</strong> Choose two random points on the circumference. (P = 1/3)</li>
          <li><strong>Random Radius:</strong> Choose a random radius, then a random point on it, and construct the chord perpendicular to it. (P = 1/2)</li>
          <li><strong>Random Midpoint:</strong> Choose a random point inside the circle to be the chord's midpoint. (P = 1/4)</li>
        </ul>
      </div>
      <div className="animations-controls">
        <label>
          Method:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="endpoints">Random Endpoints (1/3)</option>
            <option value="radius">Random Radius (1/2)</option>
            <option value="midpoint">Random Midpoint (1/4)</option>
          </select>
        </label>
      </div>
      <p>Approximated probability P(L &gt; side): {probability.toFixed(3)}</p>
      <P5Canvas sketch={sketch} className="sketch" />
    </section>
  );
};

export default Bertrand;
