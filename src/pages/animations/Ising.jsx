import { useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import isingSketch from '../../sketches/ising.js';
import './animations.css';

const Ising = () => {
  const [sketchKey, setSketchKey] = useState(0);

  return (
    <section>
      <h2>Ising Model</h2>
      <p>The Ising model simulates ferromagnetism, revealing domain formation near its critical temperature.</p>
      <button type="button" onClick={() => setSketchKey((value) => value + 1)}>
        Reset spins
      </button>
      <P5Canvas key={sketchKey} sketch={isingSketch} className="sketch" />
    </section>
  );
};

export default Ising;
