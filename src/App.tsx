import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import 'powerbi-report-authoring';
import './App.css';
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import Home from './pages/Home';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';

type AppProps = {
  msalInstance: IPublicClientApplication
};


function App({ msalInstance }: AppProps): JSX.Element {
	
	return (
    <MsalProvider instance={msalInstance}>
      <Navbar/>
      <Routes>
        <Route element={Home()} path="/home" />
        <Route element={Report()} path="/report" />
        <Route element={Dashboard()} path="/dashboard" />
      </Routes>
      <Footer/>
    </MsalProvider>
	);
}

export default App;
