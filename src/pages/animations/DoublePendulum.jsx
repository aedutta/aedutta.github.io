import P5Canvas from '../../components/P5Canvas.jsx';
import doublePendulumSketch from '../../sketches/doublePendulum.js';
import './animations.css';

const DoublePendulum = () => (
  <section>
    <h2>Double Pendulum</h2>
    <div className="animations-text">
      <p>
        A double pendulum is a pendulum with another pendulum attached to its end. 
        It is a simple physical system with a strong sensitivity to initial conditions.
      </p>
      <p>
        This sensitivity is known as <strong>chaos</strong>. 
        The motion is governed by a set of coupled ordinary differential equations.
      </p>
    </div>
    <P5Canvas sketch={doublePendulumSketch} className="sketch" />
  </section>
);

export default DoublePendulum;
