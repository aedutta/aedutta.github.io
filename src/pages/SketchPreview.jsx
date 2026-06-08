import { useParams } from 'react-router-dom';
import P5Canvas from '../components/P5Canvas.jsx';
import createBertrandSketch from '../sketches/bertrand.js';
const bertrandSketch = createBertrandSketch();
import doublePendulumSketch from '../sketches/doublePendulum.js';
import ballsSketch from '../sketches/balls.js';
import butterflyDoubleSketch from '../sketches/butterflyDouble.js';
import gameOfLifeSketch from '../sketches/gameOfLife.js';
import isingSketch from '../sketches/ising.js';
import flowFieldSketch from '../sketches/flowField.js';
import cardioidSketch from '../sketches/cardioid.js';
import auroraVeilSketch from '../sketches/auroraVeil.js';
import kuramotoSketch from '../sketches/kuramoto.js';
import bryanClarkSketch from '../sketches/bryanClark.js';

const sketches = {
  bertrand: bertrandSketch,
  'double-pendulum': doublePendulumSketch,
  balls: ballsSketch,
  'butterfly-double': butterflyDoubleSketch,
  'game-of-life': gameOfLifeSketch,
  ising: isingSketch,
  'flow-field': flowFieldSketch,
  cardioid: cardioidSketch,
  'aurora-veil': auroraVeilSketch,
  kuramoto: kuramotoSketch,
  'bryan-clark': bryanClarkSketch,
};

const SketchPreview = () => {
  const { slug } = useParams();
  const sketch = sketches[slug];
  if (!sketch) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0e101a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <P5Canvas sketch={sketch} />
    </div>
  );
};

export default SketchPreview;
