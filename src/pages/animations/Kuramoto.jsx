import P5Canvas from '../../components/P5Canvas.jsx';
import kuramootoSketch from '../../sketches/kuramoto.js';
import './animations.css';

const Kuramoto = () => (
  <section>
    <h2>Kuramoto Synchronization</h2>
    <p>A beautiful demonstration of the Kuramoto model, where coupled oscillators with different natural frequencies spontaneously synchronize. Each colored dot represents an oscillator moving around the circle. Watch as they gradually align their phases based on the coupling strength.</p>
    <P5Canvas sketch={kuramootoSketch} className="sketch" />
  </section>
);

export default Kuramoto;
