import { Configuration } from '@azure/msal-browser';

const {
  REACT_APP_AUTHORITY_URI,
  REACT_APP_CLIENT_ID,
  REACT_APP_TENANT_ID,
  REACT_APP_SCOPE_GRAPH,
  REACT_APP_REDIRECT_URI,
} = process.env;

export const msalConfig: Configuration = {
  auth: {
    clientId: REACT_APP_CLIENT_ID ?? "",
    authority: `${REACT_APP_AUTHORITY_URI}/${REACT_APP_TENANT_ID}`,
    redirectUri: REACT_APP_REDIRECT_URI,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: REACT_APP_SCOPE_GRAPH ?? ""
};

export const tokenRequest = {
  scopes: ["User.Read"]
}