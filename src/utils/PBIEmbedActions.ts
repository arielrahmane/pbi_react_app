import { IPublicClientApplication } from "@azure/msal-browser";
import { getRequestHeaders } from "./authentication";

export interface PBIEmbedConfig {
  id: string;
  response: Response;
  embedUrl: string;
  accessToken: string;
}

export interface PowerBiReportDetails {
  reportId: string;
  reportName: string;
  embedUrl: string;
}

export interface ReportEmbedConfig {
  type: string;
  reportDetail: PowerBiReportDetails;
  embedToken: EmbedToken;
}

export interface EmbedToken {
  expiration: string;
  token: string;
  tokenId: string;
}

export const getVisualConfig = async (url: string): Promise<PBIEmbedConfig | undefined> => {

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

export const getEmbedParamsForSingleReport = async (instance: IPublicClientApplication, workspaceId: String, reportId: String) => {
  const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;

  const headers = await getRequestHeaders(instance);
  const result = await fetch(reportInGroupApi, {
    method: 'GET',
    headers: headers,
  });

  if (!result.ok) {
    throw result;
  }

  let resultJson= await result.json();

  const reportDetails: PowerBiReportDetails = {
    reportId: resultJson.id,
    reportName: resultJson.name, 
    embedUrl: resultJson.embedUrl
  }
  const datasetIds = [resultJson.datasetId];

  const embedToken: EmbedToken = await getEmbedTokenForSingleReportSingleWorkspace(instance, reportId, datasetIds, workspaceId);

  const reportEmbedConfig: ReportEmbedConfig = {
    type: 'report',
    reportDetail: reportDetails,
    embedToken,
  }

  return reportEmbedConfig;
}

export const getEmbedTokenForSingleReportSingleWorkspace = async (instance: IPublicClientApplication, reportId: String, datasetIds: Array<String>, targetWorkspaceId: String) => {
  
  const embedTokenApi = `https://api.powerbi.com/v1.0/myorg/groups/${targetWorkspaceId}/reports/${reportId}/GenerateToken`;

  const body = {
    accessLevel: "View",
  }

  const headers = await getRequestHeaders(instance);
  const result = await fetch(embedTokenApi, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!result.ok) {
    throw result;
  }

  const resultJson = await result.json();
  
  return resultJson;
}