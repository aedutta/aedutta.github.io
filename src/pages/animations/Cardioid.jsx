import P5Canvas from '../../components/P5Canvas.jsx';
import cardioidSketch from '../../sketches/cardioid.js';
import './animations.css';

const Cardioid = () => (
  <section>
    <h2>Cardioid Caustics</h2>
    <p>Multiplication tables around a circle generate hypnotic cardioid-like patterns.</p>
    <P5Canvas sketch={cardioidSketch} className="sketch" />
  </section>
);

export default Cardioid;
