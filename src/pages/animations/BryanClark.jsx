import P5Canvas from '../../components/P5Canvas.jsx';
import bryanClarkSketch from '../../sketches/bryanClark.js';
import './animations.css';

const BryanClark = () => (
  <section>
    <h2>Flow Past a Cylinder: Laminar to Turbulent Transition</h2>
    <p>
      Watch fluid flow around a cylinder as Reynolds number changes. At low Re (&lt;2000), 
      flow is laminar with smooth, parallel streamlines. As Re increases into the transition 
      zone (2000-4000), instabilities appear. Above Re 4000, turbulent flow dominates with 
      chaotic vortex shedding (Von Kármán vortex street). Move the slider to explore each regime!
    </p>
    <P5Canvas sketch={bryanClarkSketch} className="sketch" />
  </section>
);

export default BryanClark;
