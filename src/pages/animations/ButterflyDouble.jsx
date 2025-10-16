import P5Canvas from '../../components/P5Canvas.jsx';
import butterflyDoubleSketch from '../../sketches/butterflyDouble.js';
import './animations.css';

const ButterflyDouble = () => (
  <section>
    <h2>Butterfly Effect: Two Double Pendulums</h2>
    <p>Two nearly identical pendulums split apart over time, revealing sensitive dependence on initial conditions.</p>
    <P5Canvas sketch={butterflyDoubleSketch} className="sketch" />
  </section>
);

export default ButterflyDouble;
