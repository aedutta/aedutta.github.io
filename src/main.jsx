import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/main.css';

const redirectPath = sessionStorage.getItem('spa-redirect');
if (redirectPath) {
  sessionStorage.removeItem('spa-redirect');
  if (redirectPath !== window.location.pathname) {
    window.history.replaceState(null, '', redirectPath);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
