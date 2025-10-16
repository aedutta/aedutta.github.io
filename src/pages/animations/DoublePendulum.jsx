import P5Canvas from '../../components/P5Canvas.jsx';
import doublePendulumSketch from '../../sketches/doublePendulum.js';
import './animations.css';

const DoublePendulum = () => (
  <section>
    <h2>Double Pendulum</h2>
    <p>A classic chaotic system tracing the unpredictable path of a double pendulum.</p>
    <P5Canvas sketch={doublePendulumSketch} className="sketch" />
  </section>
);

export default DoublePendulum;
