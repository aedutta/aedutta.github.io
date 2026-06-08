import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AnimationsPage from './pages/AnimationsPage.jsx';
import PhysicsPage from './pages/PhysicsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SketchPreview from './pages/SketchPreview.jsx';
import animationsRoutes from './pages/animations/routes.jsx';

const App = () => (
  <Routes>
    <Route path="preview/:slug" element={<SketchPreview />} />
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="work" element={<ProjectsPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:slug" element={<BlogPostPage />} />
      <Route path="animations">
        <Route index element={<AnimationsPage />} />
        {animationsRoutes}
      </Route>
      <Route path="physics" element={<PhysicsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
