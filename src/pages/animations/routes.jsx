import { Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Bertrand = lazy(() => import('./Bertrand.jsx'));
const Balls = lazy(() => import('./Balls.jsx'));
const ButterflyDouble = lazy(() => import('./ButterflyDouble.jsx'));
const Cardioid = lazy(() => import('./Cardioid.jsx'));
const DoublePendulum = lazy(() => import('./DoublePendulum.jsx'));
const FlowField = lazy(() => import('./FlowField.jsx'));
const GameOfLife = lazy(() => import('./GameOfLife.jsx'));
const Ising = lazy(() => import('./Ising.jsx'));
const AuroraVeil = lazy(() => import('./AuroraVeil.jsx'));
const Kuramoto = lazy(() => import('./Kuramoto.jsx'));
const BryanClark = lazy(() => import('./BryanClark.jsx'));

const wrap = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

const routes = [
  { path: 'bertrand', element: wrap(Bertrand) },
  { path: 'balls', element: wrap(Balls) },
  { path: 'butterfly-double', element: wrap(ButterflyDouble) },
  { path: 'cardioid', element: wrap(Cardioid) },
  { path: 'double-pendulum', element: wrap(DoublePendulum) },
  { path: 'flow-field', element: wrap(FlowField) },
  { path: 'game-of-life', element: wrap(GameOfLife) },
  { path: 'ising', element: wrap(Ising) },
  { path: 'aurora-veil', element: wrap(AuroraVeil) },
  { path: 'kuramoto', element: wrap(Kuramoto) },
  { path: 'bryan-clark', element: wrap(BryanClark) },
];

const animationRouteElements = routes.map(({ path, element }) => (
  <Route key={path} path={path} element={element} />
));

export default animationRouteElements;
