import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import 'powerbi-report-authoring';
import './App.css';
import Home from './pages/Home';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';


function App(): JSX.Element {
	
	return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route element={ Home() } path="/home" />
          <Route element={ Report() } path="/report" />
          <Route element={ Dashboard() } path="/dashboard" />
        </Routes>
      </div>
      <Footer />
    </>
	);
}

export default App;
