import { useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import isingSketch from '../../sketches/ising.js';
import './animations.css';

const Ising = () => {
  const [sketchKey, setSketchKey] = useState(0);

  return (
    <section>
      <h2>Ising Model</h2>
      <div className="animations-text">
        <p>
          The Ising model is a mathematical model of ferromagnetism in statistical mechanics.
          It consists of discrete 'spins' on a grid that can be in one of two states (+1 or -1).
        </p>
        <p>
          Spins interact with their neighbors, preferring to align.
          Temperature introduces noise (flipping).
          Near the <strong>Critical Temperature</strong>, large clusters (domains) form, representing a phase transition.
        </p>
      </div>
      <button type="button" onClick={() => setSketchKey((value) => value + 1)}>
        Reset spins
      </button>
      <P5Canvas key={sketchKey} sketch={isingSketch} className="sketch" />
    </section>
  );
};

export default Ising;
