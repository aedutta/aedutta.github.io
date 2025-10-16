import P5Canvas from '../../components/P5Canvas.jsx';
import gameOfLifeSketch from '../../sketches/gameOfLife.js';
import './animations.css';

const GameOfLife = () => (
  <section>
    <h2>John Conway's Game of Life</h2>
    <p>Cells live and die according to simple rules, producing mesmerizing emergent patterns.</p>
    <P5Canvas sketch={gameOfLifeSketch} className="sketch" />
  </section>
);

export default GameOfLife;
