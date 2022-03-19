import React, { useState } from 'react';
import { models, Report, Embed, service, Page } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import './App.css';

function App (): JSX.Element {

	const [report, setReport] = useState<Report>();

	const sampleReportUrl = 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport';

	const [sampleReportConfig, setReportConfig] = useState<models.IReportEmbedConfiguration>({
		type: 'report',
		embedUrl: undefined,
		tokenType: models.TokenType.Embed,
		accessToken: undefined,
		settings: undefined,
	});

	const eventHandlersMap = new Map([
		['loaded', function () {
			console.log('Report has loaded');
		}],
		['rendered', function () {
			console.log('Report has rendered');

			setMessage('The report is rendered')
		}],
		['error', function (event?: service.ICustomEvent<any>) { 
			if (event) {
				console.error(event.detail);
			}
		}]
	]);
	
	const mockSignIn = async () => {

		const reportConfigResponse = await fetch(sampleReportUrl);
		
		if (!reportConfigResponse.ok) {
			console.error(`Failed to fetch config for report. Status: ${ reportConfigResponse.status } ${ reportConfigResponse.statusText }`);
			return;
		}

		const reportConfig = await reportConfigResponse.json();

		setMessage('The access token is successfully set. Loading the Power BI report')

		setReportConfig({
			...sampleReportConfig,
			embedUrl: reportConfig.EmbedUrl,
			accessToken: reportConfig.EmbedToken.Token
		});
	};

	const changeSettings = () => {

		setReportConfig({
			...sampleReportConfig,
			settings: {
				panes: {
					filters: {
						expanded: false,
						visible: false
					}
				}
			}
		});
	};

	const deleteVisual = async () => {

		if (!report) {
			console.log('Report not available');
			return;
		}

		const activePage = await getActivePage(report);

		if (!activePage) {
			console.log('No active page');
			return;
		}

		const visuals = await activePage.getVisuals();

		if (visuals.length === 0) {
			console.log('No visual left');
			return;
		}

		const visual = visuals.find((v) => {
			return v.layout.displayState?.mode === models.VisualContainerDisplayMode.Visible;
		});

		if (!visual) {
			console.log('No visible visual available to delete');
			return;
		}

		try {
			
			await activePage.deleteVisual(visual.name);

			console.log('Visual was deleted');
		}
		catch (error) {
			console.error(error);
		}
	};

	async function getActivePage(powerbiReport: Report): Promise<Page | undefined> {
		const pages = await powerbiReport.getPages();
	
		const activePage = pages.filter(function (page) {
			return page.isActive
		})[0];

		return activePage;
	}

	const [displayMessage, setMessage] = useState(`The report is bootstrapped. Click the Embed Report button to set the access token`);

	const controlButtons = 
		<div className = "controls">
			<button onClick = { mockSignIn }>
				Embed Report</button>

			<button onClick = { changeSettings }>
				Hide filter pane</button>

			<button onClick = { deleteVisual }>
				Delete a Visual</button>
		</div>;

	const header = 
		<div className = "header">
			<div className = "title">Power BI React component demo</div>
		</div>;

	const footer = 
		<div className = "footer">
			<div className = "footer-text">
				GitHub: &nbsp;
				<a href="https://github.com/microsoft/PowerBI-client-react">https://github.com/microsoft/PowerBI-client-react</a>
			</div>
		</div>;
	
	return (
		<div>
			{ header }
			
			<PowerBIEmbed
				embedConfig = { sampleReportConfig }
				eventHandlers = { eventHandlersMap }
				cssClassName = { "report-style-class" }
				getEmbeddedComponent = { (embedObject:Embed) => {
					console.log(`Embedded object of type "${ embedObject.embedtype }" received`);
					setReport(embedObject as Report);
				} }
			/>

			<div className = "hr"></div>

			<div className = "displayMessage">
				{ displayMessage }
			</div>

			{ controlButtons }

			{ footer }
		</div>
	);
}

export default App;
