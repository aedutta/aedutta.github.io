import { useCallback, useMemo, useState } from 'react';
import P5Canvas from '../../components/P5Canvas.jsx';
import createBertrandSketch from '../../sketches/bertrand.js';
import './animations.css';

const Bertrand = () => {
  const [probability, setProbability] = useState(0);
  const handleProbability = useCallback((value) => setProbability(value), []);

  const sketch = useMemo(() => createBertrandSketch(handleProbability), [handleProbability]);

  return (
    <section>
      <h2>Bertrand's Paradox</h2>
      <p>Approximated probability: {probability.toFixed(3)}</p>
      <P5Canvas sketch={sketch} className="sketch" />
    </section>
  );
};

export default Bertrand;
