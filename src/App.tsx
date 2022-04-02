import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import routes from './api/routes';
import 'powerbi-report-authoring';
import './App.css';
import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

type AppProps = {
  msalInstance: IPublicClientApplication
};


function App({ msalInstance }: AppProps): JSX.Element {
	
	return (
    <MsalProvider instance={msalInstance}>
      <Header/>
        <Routes>
          {routes.map(({ href, page }) => {
            return (
              <Route path={href} element={page} key={page + href}/>
            );
          })}
        </Routes>
      <Footer/>
    </MsalProvider>
	);
}

export default App;
