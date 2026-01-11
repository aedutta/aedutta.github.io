import P5Canvas from '../../components/P5Canvas.jsx';
import gameOfLifeSketch from '../../sketches/gameOfLife.js';
import './animations.css';

const GameOfLife = () => (
  <section>
    <h2>John Conway's Game of Life</h2>
    <div className="animations-text">
      <p>
        The Game of Life is a cellular automaton devised by mathematician John Conway. It is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input.
      </p>
      <p><strong>The Rules:</strong></p>
      <ul>
        <li>Any live cell with fewer than two live neighbors dies (underpopulation).</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies (overpopulation).</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction).</li>
      </ul>
    </div>
    <P5Canvas sketch={gameOfLifeSketch} className="sketch" />
  </section>
);

export default GameOfLife;
