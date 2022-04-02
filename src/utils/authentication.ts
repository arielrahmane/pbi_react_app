import {
  PublicClientApplication,
  Configuration,
  // AuthenticationResult,
} from '@azure/msal-browser';

const {
  REACT_APP_AUTHORITY_URI,
  REACT_APP_AUTHENTICATION_MODE,
  REACT_APP_SCOPE,
  REACT_APP_CLIENT_ID,
  REACT_APP_TENANT_ID,
  REACT_APP_CLIENT_SECRET
} = process.env

export const getAccessToken = async function () {

    if (!REACT_APP_AUTHORITY_URI || !REACT_APP_AUTHENTICATION_MODE || !REACT_APP_CLIENT_ID || !REACT_APP_CLIENT_SECRET || !REACT_APP_TENANT_ID) {
      console.log("Missing config params");
      return
    }

    let authorityUrl = REACT_APP_AUTHORITY_URI;
    authorityUrl = authorityUrl.replace("common", REACT_APP_TENANT_ID);

    const msalConfig: Configuration = {
      auth: {
          clientId: REACT_APP_CLIENT_ID,
          authority: authorityUrl,
          clientSecret: REACT_APP_CLIENT_SECRET,
          knownAuthorities: [],
      },
  } as Configuration;
  
  const msalInstance = new PublicClientApplication(msalConfig);

    if (REACT_APP_AUTHENTICATION_MODE.toLowerCase() === "masteruser") {
      console.log("masteruser");

    } else if (REACT_APP_AUTHENTICATION_MODE.toLowerCase() === "serviceprincipal") {
        if (!REACT_APP_SCOPE) {
          console.log("Missing scope");
          return
        }

        await msalInstance.acquireTokenRedirect({scopes: [REACT_APP_SCOPE]})
          .then((authResult) => console.log(authResult))
          .catch((error) => console.log(error));
    }
}