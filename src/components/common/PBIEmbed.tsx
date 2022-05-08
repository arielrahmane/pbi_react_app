import React, { useEffect, useState } from 'react';
import { models, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { getVisualConfig } from '../../utils/PBIEmbedActions';

export interface PBIEmbedProps {
  visualType: string;
  url?: string;
  _id?: string;
  _embedToken?: string;
  _embedUrl?: string;
}

export function PBIEmbed(props: PBIEmbedProps): JSX.Element {

  const {visualType, url, _id, _embedToken, _embedUrl } = props;

  const [visualConfig, setVisualConfig] = useState<models.IReportEmbedConfiguration>({
		type: visualType,
    id: undefined,
		embedUrl: undefined,
		tokenType: models.TokenType.Embed,
		accessToken: undefined,
		settings: undefined,
	});

  useEffect(() => {
    const getConfig = async () => {
      let config;
      url ? 
        config = await getVisualConfig(url) : 
        config = {
          embedUrl: _embedUrl,
          accessToken: _embedToken,
          id: _id,
          response: {}
        };
  
      if (!config) {
        alert("No config");
        return;
      }
  
      const { response, embedUrl, accessToken, id } = config;
  
      setVisualConfig({
        ...response,
        id,
        embedUrl,
        accessToken,
      });
    }
    getConfig();
  }, [_embedToken, _embedUrl, _id, url]);

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
