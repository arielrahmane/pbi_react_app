import React, { useEffect, useState } from 'react';
import { models, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { getEmbedConfig } from '../../utils/embedActions';

export function PowerBIReport(): JSX.Element {

	const sampleReportUrl = 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport';

  useEffect(() => {
    getConfig()
  }, []);

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
		}],
		['error', function (event?: service.ICustomEvent<any>) { 
			if (event) {
				console.error(event.detail);
			}
		}]
	]);

  const getConfig = async () => {
    const config = await getEmbedConfig(sampleReportUrl);

    if (!config) {
      alert("No config");
      return;
    }

    const { response, embedUrl, accessToken } = config;

    setReportConfig({
			...response,
			embedUrl,
			accessToken,
		});
  }
	
	return (
		<div>
			<PowerBIEmbed
				embedConfig = { sampleReportConfig }
				eventHandlers = { eventHandlersMap }
				cssClassName = { "report-style-class" }
			/>
		</div>
	);
}
