import { Link } from 'react-router-dom';
import './animations/animations.css';

const animations = [
  { 
    path: 'bertrand', 
    label: "Bertrand's Paradox", 
    thumbClass: 'thumb-bertrand'
  },
  { 
    path: 'double-pendulum', 
    label: 'Double Pendulum', 
    thumbClass: 'thumb-double-pendulum'
  },
  { 
    path: 'balls', 
    label: 'Butterfly Effect: Balls', 
    thumbClass: 'thumb-balls'
  },
  { 
    path: 'butterfly-double', 
    label: 'Butterfly Effect: Pendulums', 
    thumbClass: 'thumb-butterfly-double'
  },
  { 
    path: 'game-of-life', 
    label: "Game of Life", 
    thumbClass: 'thumb-game-of-life'
  },
  { 
    path: 'ising', 
    label: 'Ising Model', 
    thumbClass: 'thumb-ising'
  },
  { 
    path: 'flow-field', 
    label: 'Flow Field', 
    thumbClass: 'thumb-flow-field'
  },
  { 
    path: 'cardioid', 
    label: 'Cardioid Caustics', 
    thumbClass: 'thumb-cardioid'
  },
  { 
    path: 'aurora-veil', 
    label: 'Aurora Veil', 
    thumbClass: 'thumb-aurora-veil'
  },
  { 
    path: 'kuramoto', 
    label: 'Kuramoto Model', 
    thumbClass: 'thumb-kuramoto'
  },
  { 
    path: 'bryan-clark', 
    label: 'Bifurcation', 
    thumbClass: 'thumb-bryan-clark'
  },
];

const AnimationCard = ({ path, label, thumbClass }) => {
  return (
    <Link to={path} className="animation-card">
      <div className="animation-preview-container">
        <div className={`static-preview-placeholder ${thumbClass}`} />
      </div>
      <div className="animation-content">
        <h3>{label}</h3>
      </div>
    </Link>
  );
};

const AnimationsPage = () => (
  <section className="animations-page">
    <div className="animations-header">
      <h2>Generative Art & Physics</h2>
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
