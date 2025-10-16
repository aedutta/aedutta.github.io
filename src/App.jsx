import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import CourseworkPage from './pages/CourseworkPage.jsx';
import AnimationsPage from './pages/AnimationsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import animationsRoutes from './pages/animations/routes.jsx';

const App = () => (
  <Routes>
    <Route element={<Layout />}> 
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="coursework" element={<CourseworkPage />} />
      <Route path="animations">
        <Route index element={<AnimationsPage />} />
        {animationsRoutes}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
