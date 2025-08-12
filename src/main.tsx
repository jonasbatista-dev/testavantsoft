import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { makeServer } from '../moch/mirage.ts';
import './index.scss';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
