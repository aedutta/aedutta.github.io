import P5Canvas from '../../components/P5Canvas.jsx';
import ballsSketch from '../../sketches/balls.js';
import './animations.css';

const Balls = () => (
  <section>
    <h2>Butterfly Effect: Bouncing Balls</h2>
    <p>A hemisphere filled with bouncing particles demonstrates how tiny perturbations evolve chaotically.</p>
    <P5Canvas sketch={ballsSketch} className="sketch" />
  </section>
);

export default Balls;
