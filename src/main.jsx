import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'katex/dist/katex.min.css';
import './styles/main.css';

const redirectPath = sessionStorage.getItem('spa-redirect');
if (redirectPath) {
  sessionStorage.removeItem('spa-redirect');
  if (redirectPath !== window.location.pathname) {
    window.history.replaceState(null, '', redirectPath);
  }
}

const rootEl = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If the server prerendered real app HTML (not the splash), hydrate over it.
// Otherwise (splash or empty), do a normal client-render.
if (rootEl.dataset.prerendered === 'true') {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
