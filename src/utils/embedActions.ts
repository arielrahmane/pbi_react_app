export interface EmbedConfig {
  response: Response;
  embedUrl: string;
  accessToken: string;
}

export const getEmbedConfig = async (url: string): Promise<EmbedConfig | undefined> => {

  const configResponse = await fetch(url);
  
  if (!configResponse.ok) {
    console.error(`Failed to fetch config for report. Status: ${ configResponse.status } ${ configResponse.statusText }`);
    return;
  }

  const reportConfig = await configResponse.json();

  return {
    response: {...configResponse},
    embedUrl: reportConfig.EmbedUrl,
    accessToken: reportConfig.EmbedToken.Token
  }
};