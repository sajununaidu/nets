import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const loadNormalView = () => {
  if (!window.loaded){
    window.loaded = true;
    window.location.href = "https://sajununaidu.github.io/nets/#/nets";
  }
}

loadNormalView();
root.render(
    <HashRouter basename="/nets">
      <App />
    </HashRouter>
);