import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './Footer.jsx';
import './Layout.css';

const getLinkClass = ({ isActive }) => (isActive ? 'active' : undefined);

const getInitialTheme = () => {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.getAttribute('data-theme');
    if (current) return current;
  }
  return 'light';
};

const Layout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
          <NavLink to="/" className="layout__brand" aria-label="Ashmit Dutta — home">
            ÆD
          </NavLink>
          <div className="layout__links">
            <NavLink to="/research" className={getLinkClass}>
              Research
            </NavLink>
            <span aria-hidden="true">·</span>
            <NavLink to="/work" className={getLinkClass}>
              Work
            </NavLink>
            <span aria-hidden="true">·</span>
            <NavLink to="/blog" className={getLinkClass}>
              Blog
            </NavLink>
            <span aria-hidden="true">·</span>
            <NavLink to="/animations" className={getLinkClass}>
              Art
            </NavLink>
            <span aria-hidden="true">·</span>
            <NavLink to="/physics" className={getLinkClass}>
              Physics
            </NavLink>
            <button
              type="button"
              className="layout__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
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
