import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppThemeWrapper from './AppThemeWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode> // I disabled it beceause of strange double useEffect firing in react 18, will fix that a bit later (with custom hook probably)
    <AppThemeWrapper />
  // </React.StrictMode>
);
