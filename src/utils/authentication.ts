import {
  PublicClientApplication,
  Configuration,
  // AuthenticationResult,
} from '@azure/msal-browser';

const {
  REACT_APP_AUTHORITY_URI,
  REACT_APP_KNOWN_AUTHORITY,
  REACT_APP_AUTHENTICATION_MODE,
  REACT_APP_SCOPE,
  REACT_APP_CLIENT_ID,
  REACT_APP_TENANT_ID,
  REACT_APP_CLIENT_SECRET
} = process.env

export const getAccessToken = async function () {

    if  (!REACT_APP_AUTHORITY_URI 
          || !REACT_APP_AUTHENTICATION_MODE 
          || !REACT_APP_CLIENT_ID 
          || !REACT_APP_CLIENT_SECRET 
          || !REACT_APP_TENANT_ID
          || !REACT_APP_KNOWN_AUTHORITY
        ) 
    {
      console.log("Missing config params");
      return
    }


    const msalConfig: Configuration = {
      auth: {
          clientId: REACT_APP_CLIENT_ID,
          authority: `${REACT_APP_AUTHORITY_URI}/${REACT_APP_TENANT_ID}`,
          // clientSecret: REACT_APP_CLIENT_SECRET,
          knownAuthorities: [REACT_APP_KNOWN_AUTHORITY],
          redirectUri: "http://localhost:3000",
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
      }
  };
  
  const msalInstance = new PublicClientApplication(msalConfig);
  const account = msalInstance.getAllAccounts()[0];

    if (REACT_APP_AUTHENTICATION_MODE.toLowerCase() === "masteruser") {
      console.log("masteruser");

    } else if (REACT_APP_AUTHENTICATION_MODE.toLowerCase() === "serviceprincipal") {
        if (!REACT_APP_SCOPE) {
          console.log("Missing scope");
          return
        }

        await msalInstance.acquireTokenSilent({scopes: [REACT_APP_SCOPE], account})
          .then((authResult) => console.log("Auth result:", authResult))
          .catch((error) => console.log("Error acquiring token:", error));
    }
}