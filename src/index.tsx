import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";

const instance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App msalInstance={instance}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
