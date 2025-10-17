import { Link } from 'react-router-dom';

const animations = [
  { path: 'bertrand', label: "Bertrand's Paradox" },
  { path: 'double-pendulum', label: 'Double Pendulum' },
  { path: 'balls', label: 'Butterfly Effect: Bouncing Balls' },
  { path: 'butterfly-double', label: 'Butterfly Effect: Two Double Pendulums' },
  { path: 'game-of-life', label: "John Conway's Game of Life" },
  { path: 'ising', label: 'Ising Model' },
  { path: 'flow-field', label: 'Flow Field (Perlin Noise)' },
  { path: 'cardioid', label: 'Cardioid Caustics' },
  { path: 'aurora-veil', label: 'Aurora Veil' },
  { path: 'kuramoto', label: 'Kuramoto Synchronization' },
  { path: 'bryan-clark', label: 'Bifurcation: Laminar to Turbulent Flow' },
];

const AnimationsPage = () => (
  <section>
    <h2>Generative Art</h2>
    <p>Here are a few interactive sketches exploring phenomena in mathematics and physics.</p>
    <ul>
      {animations.map(({ path, label }) => (
        <li key={path}>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default AnimationsPage;
