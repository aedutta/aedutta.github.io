import { Route } from 'react-router-dom';
import Bertrand from './Bertrand.jsx';
import Balls from './Balls.jsx';
import ButterflyDouble from './ButterflyDouble.jsx';
import Cardioid from './Cardioid.jsx';
import DoublePendulum from './DoublePendulum.jsx';
import FlowField from './FlowField.jsx';
import GameOfLife from './GameOfLife.jsx';
import Ising from './Ising.jsx';

const routes = [
  { path: 'bertrand', element: <Bertrand /> },
  { path: 'balls', element: <Balls /> },
  { path: 'butterfly-double', element: <ButterflyDouble /> },
  { path: 'cardioid', element: <Cardioid /> },
  { path: 'double-pendulum', element: <DoublePendulum /> },
  { path: 'flow-field', element: <FlowField /> },
  { path: 'game-of-life', element: <GameOfLife /> },
  { path: 'ising', element: <Ising /> },
];

const animationRouteElements = routes.map(({ path, element }) => (
  <Route key={path} path={path} element={element} />
));

export default animationRouteElements;
