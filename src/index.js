import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './shared/contexts/User_Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const base_name = process.env.REACT_APP_BASE_NAME || '';

async function initApp() {
  // Enable MSW for local development and Vercel preview
  if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_USE_MSW === 'true') {
    const { worker } = require('./mock_server/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  // Only render App after MSW is fully started
  root.render(
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter basename={base_name}>
          <App />
        </BrowserRouter> 
      </UserProvider>     
    </React.StrictMode>
  );

  reportWebVitals();
}

initApp();
