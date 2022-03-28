import React, { useEffect, useState } from 'react';
import { models, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { getVisualConfig } from '../../utils/PBIEmbedActions';

export function PowerBIDashboard(): JSX.Element {

	const sampleDashboardUrl = 'https://playgroundbe-bck-1.azurewebsites.net/Dashboards/SampleDashboard';

  useEffect(() => {
    getConfig()
  }, []);

	const [sampleDashboardConfig, setDashboardConfig] = useState<models.IReportEmbedConfiguration>({
		type: 'dashboard',
		embedUrl: undefined,
		tokenType: models.TokenType.Embed,
		accessToken: undefined,
		settings: undefined,
	});

	const eventHandlersMap = new Map([
		['loaded', function () {
			console.log('Dashboard has loaded');
		}],
		['rendered', function () {
			console.log('Dashboard has rendered');
		}],
		['error', function (event?: service.ICustomEvent<any>) { 
			if (event) {
				console.error(event.detail);
			}
		}]
	]);

  const getConfig = async () => {
    const config = await getVisualConfig(sampleDashboardUrl);

    if (!config) {
      alert("No config");
      return;
    }

    const { response, embedUrl, accessToken } = config;

    setDashboardConfig({
			...response,
			embedUrl,
			accessToken,
		});
  }
	
	return (
    <PowerBIEmbed
      embedConfig = { sampleDashboardConfig }
      eventHandlers = { eventHandlersMap }
      cssClassName = { "dashboard-style-class" }
    />
	);
}
