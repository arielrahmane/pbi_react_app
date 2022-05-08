import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { MsalProvider } from '@azure/msal-react';

const instance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={instance}>
      <Router>
        <App />
      </Router>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
