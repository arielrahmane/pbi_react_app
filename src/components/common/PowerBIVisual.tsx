import React, { useEffect, useState } from 'react';
import { models, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { getVisualConfig } from '../../utils/visualActions';

export interface VisualProps {
  visualType: string;
  url: string;
}

export function PowerBIVisual(props: VisualProps): JSX.Element {

  const {visualType, url } = props;

  const [visualConfig, setVisualConfig] = useState<models.IReportEmbedConfiguration>({
		type: visualType,
		embedUrl: undefined,
		tokenType: models.TokenType.Embed,
		accessToken: undefined,
		settings: undefined,
	});

  useEffect(() => {
    const getConfig = async () => {
      const config = await getVisualConfig(url);
  
      if (!config) {
        alert("No config");
        return;
      }
  
      const { response, embedUrl, accessToken } = config;
  
      setVisualConfig({
        ...response,
        embedUrl,
        accessToken,
      });
    }
    getConfig();
  }, [url]);

	const eventHandlersMap = new Map([
		['loaded', function () {
			console.log(`${visualType} has been loaded`);
		}],
		['rendered', function () {
			console.log(`${visualType} has rendered`);
		}],
		['error', function (event?: service.ICustomEvent<any>) { 
			if (event) {
				console.error(event.detail);
			}
		}]
	]);
	
	return (
    <PowerBIEmbed
      embedConfig = { visualConfig }
      eventHandlers = { eventHandlersMap }
      cssClassName = { `${visualType}-style-class` }
    />
	);
}
