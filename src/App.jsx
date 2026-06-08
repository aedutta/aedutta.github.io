import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout.jsx';
import animationsRoutes from './pages/animations/routes.jsx';
import HomePage from './pages/HomePage.jsx';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'));
const AnimationsPage = lazy(() => import('./pages/AnimationsPage.jsx'));
const PhysicsPage = lazy(() => import('./pages/PhysicsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const SketchPreview = lazy(() => import('./pages/SketchPreview.jsx'));
const SketchRecorder = lazy(() => import('./pages/SketchRecorder.jsx'));

const wrap = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
);

const App = () => (
  <Routes>
    <Route path="preview/:slug" element={wrap(SketchPreview)} />
    <Route path="record/:slug" element={wrap(SketchRecorder)} />
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="work" element={wrap(ProjectsPage)} />
      <Route path="blog" element={wrap(BlogPage)} />
      <Route path="blog/:slug" element={wrap(BlogPostPage)} />
      <Route path="animations">
        <Route index element={wrap(AnimationsPage)} />
        {animationsRoutes}
      </Route>
      <Route path="physics" element={wrap(PhysicsPage)} />
      <Route path="*" element={wrap(NotFoundPage)} />
    </Route>
  </Routes>
);

export default App;
