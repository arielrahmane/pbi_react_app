import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import routes from './api/routes';
import 'powerbi-report-authoring';
import './App.css';

function App (): JSX.Element {
	
	return (
    <div>
      <Header/>
      <Routes>
        {routes.map(({ href, page }) => {
          return (
            <Route path={href} element={page}/>
          );
        })}
      </Routes>
      <Footer/>
    </div>
	);
}

export default App;
