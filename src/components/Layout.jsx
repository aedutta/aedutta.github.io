import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer.jsx';
import './Layout.css';

const getLinkClass = ({ isActive }) => (isActive ? 'active' : undefined);

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-KDXVPW1MG7', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
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
            <span>/</span>
            <NavLink to="/animations" className={getLinkClass}>
              Art
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
};

export default Layout;
