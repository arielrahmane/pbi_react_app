import React from 'react';
import { Header } from './components/common/Header';
import { ReportEmbed } from './components/embedTypes/ReportEmbed';
import { Footer } from './components/common/Footer';
import 'powerbi-report-authoring';
import './App.css';

function App (): JSX.Element {
	
	return (
		<div>
      <Header/>
      <ReportEmbed/>
      <Footer/>
		</div>
	);
}

export default App;
