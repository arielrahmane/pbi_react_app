import { Configuration } from '@azure/msal-browser';

const {
  REACT_APP_AUTHORITY_URI,
  REACT_APP_SCOPE,
  REACT_APP_CLIENT_ID,
  REACT_APP_TENANT_ID,
  REACT_APP_SCOPE_GRAPH,
} = process.env;

export const msalConfig: Configuration = {
  auth: {
    clientId: REACT_APP_CLIENT_ID ?? "",
    authority: `${REACT_APP_AUTHORITY_URI}/${REACT_APP_TENANT_ID}`,
    redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
 scopes: [REACT_APP_SCOPE ?? ""]
};

export const graphConfig = {
    graphMeEndpoint: REACT_APP_SCOPE_GRAPH
};