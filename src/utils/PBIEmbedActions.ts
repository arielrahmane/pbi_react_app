import { IPublicClientApplication } from "@azure/msal-browser";
import { getRequestHeaders } from "./authentication";

export interface PBIEmbedConfig {
  id: string;
  response: Response;
  embedUrl: string;
  accessToken: string;
}

export interface PowerBiReportDetails {
  reportId: String;
  reportName: String;
  embedUrl: String;
}

export interface ReportEmbedConfig {
  type: String;
  reportDetail: PowerBiReportDetails;
  embedToken: EmbedToken;
}

export interface EmbedToken {
  expiration: String;
  token: String;
  tokenId: String;
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

export const getEmbedInfo = async (instance: IPublicClientApplication, workspaceId: String, reportId: String) => {
  try {
    const embedParams = await getEmbedParamsForSingleReport(instance, workspaceId, reportId);

    return {
        accessToken: embedParams.embedToken.token,
        embedUrl:embedParams.reportDetail,
        expiry: embedParams.embedToken.expiration,
        status: 200
    };
  } catch (err: any) {
      return {
          status: err.status,
          error: err
      }
  }
}

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
    embedToken
  }

  return reportEmbedConfig;
}

export const getEmbedTokenForSingleReportSingleWorkspace = async (instance: IPublicClientApplication, reportId: String, datasetIds: Array<String>, targetWorkspaceId: String) => {
  
  let formData = {
    reports: [{
      id: reportId
    }],
    datasets: [] as Array<any>,
    targetWorkspaces: [] as Array<any>,
  };

  datasetIds.forEach(datasetId => {
    formData.datasets.push({id: datasetId})
  })

  if (targetWorkspaceId) 
    formData.targetWorkspaces.push({id: targetWorkspaceId});

  const embedTokenApi = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
  const headers = await getRequestHeaders(instance);
  const result = await fetch(embedTokenApi, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formData)
  });
  
  if (!result.ok) {
    throw result;
  }
    
  
  return result.json();
}