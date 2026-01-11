import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import './Layout.css';

const getLinkClass = ({ isActive }) => (isActive ? 'active' : undefined);

const Layout = () => (
  <div className="layout">
    <header className="layout__header">
      <nav className="layout__nav">
        <NavLink to="/" className="layout__brand">
          Ashmit Dutta
        </NavLink>
        <div className="layout__links">
          <NavLink to="/blog" className={getLinkClass}>
            Blog
          </NavLink>
          <span>/</span>
          <NavLink to="/work" className={getLinkClass}>
            Work
          </NavLink>
        </div>
      </nav>
    </header>
    <main className="layout__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
