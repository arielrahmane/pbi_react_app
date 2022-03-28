export interface EmbedConfig {
  id: string;
  response: Response;
  embedUrl: string;
  accessToken: string;
}

export const getVisualConfig = async (url: string): Promise<EmbedConfig | undefined> => {

  const configResponse = await fetch(url);
  
  if (!configResponse.ok) {
    console.error(`Failed to fetch config for report. Status: ${ configResponse.status } ${ configResponse.statusText }`);
    return;
  }

  const reportConfig = await configResponse.json();

  return {
    response: {...configResponse},
    id: reportConfig.Id,
    embedUrl: reportConfig.EmbedUrl,
    accessToken: reportConfig.EmbedToken.Token
  }
};