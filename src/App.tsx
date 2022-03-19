import React from 'react';
import { ReportEmbed } from './components/embedTypes/ReportEmbed';
import 'powerbi-report-authoring';
import './App.css';

function App (): JSX.Element {

	const header = 
		<div className = "header">
			<div className = "title">Power BI React component demo</div>
		</div>;

	const footer = 
		<div className = "footer">
			<div className = "footer-text">
				Power BI React
			</div>
		</div>;
	
	return (
		<div>
			{ header }

      <ReportEmbed />

			{ footer }
		</div>
	);
}

export default App;
