import { Link } from 'react-router-dom';
import './animations/animations.css';

const animations = [
  { path: 'flow-field', label: 'Flow Field' },
  { path: 'cardioid', label: 'Cardioid Caustics' },
  { path: 'aurora-veil', label: 'Aurora Veil' },
  { path: 'kuramoto', label: 'Kuramoto Model' },
  { path: 'game-of-life', label: 'Game of Life' },
  { path: 'ising', label: 'Ising Model' },
  { path: 'bryan-clark', label: 'Bifurcation' },
  { path: 'double-pendulum', label: 'Double Pendulum' },
  { path: 'butterfly-double', label: 'Butterfly Effect: Pendulums' },
  { path: 'balls', label: 'Butterfly Effect: Balls' },
  { path: 'bertrand', label: "Bertrand's Paradox" },
];

const AnimationCard = ({ path, label }) => (
  <Link to={path} className="animation-card">
    <div
      className="animation-preview-container"
      style={{ backgroundImage: `url(/assets/images/sketches/${path}.png)` }}
    />
    <div className="animation-content">
      <h3>{label}</h3>
    </div>
  </Link>
);

const AnimationsPage = () => (
  <section className="animations-page">
    <div className="animations-header">
      <h2>Generative Art &amp; Physics</h2>
      <p>Interactive sketches exploring phenomena in mathematics, physics, and complexity theory.</p>
    </div>

    <div className="animations-grid">
      {animations.map((anim) => (
        <AnimationCard key={anim.path} {...anim} />
      ))}
    </div>
  </section>
);

export default AnimationsPage;
