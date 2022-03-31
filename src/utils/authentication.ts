import {
  AuthenticationContext,
  TokenResponse,
  ErrorResponse
} from "adal-node"

export const getAccessToken = async function (): Promise<TokenResponse | ErrorResponse | string | undefined> {

    const {
      AUTHORITY_URI,
      AUTHENTICATION_MODE,
      SCOPE,
      PBI_USERNAME,
      PBI_PASSWORD,
      CLIENT_ID,
      TENANT_ID,
      CLIENT_SECRET
    } = process.env

    if (!AUTHORITY_URI || !AUTHENTICATION_MODE)
      return new Promise((resolve, reject) => resolve("Missing autority URI or auth mode"));

    let authorityUrl = AUTHORITY_URI;

    if (AUTHENTICATION_MODE.toLowerCase() === "masteruser") {
      if (
        !PBI_USERNAME
        || !PBI_PASSWORD
        || !CLIENT_ID
        || !SCOPE
      ) return new Promise((resolve, reject) => resolve("Missing masteruser config values"));

      let context = new AuthenticationContext(authorityUrl);

      return new Promise(
          (resolve, reject) => {
              context.acquireTokenWithUsernamePassword(SCOPE, PBI_USERNAME, PBI_PASSWORD, CLIENT_ID, function (err, tokenResponse) {
                  if (err) {
                      reject(tokenResponse == null ? err : tokenResponse);
                  }
                  resolve(tokenResponse);
              })
          }
      );

    } else if (AUTHENTICATION_MODE.toLowerCase() === "serviceprincipal") {
        if (
          !SCOPE
          || !CLIENT_ID
          || !TENANT_ID
          || !CLIENT_SECRET
        ) return new Promise((resolve, reject) => resolve("Missing serviceprincipal config values"));

        authorityUrl = authorityUrl.replace("common", TENANT_ID);
        let context = new AuthenticationContext(authorityUrl);

        return new Promise(
            (resolve, reject) => {
                context.acquireTokenWithClientCredentials(SCOPE, CLIENT_ID, CLIENT_SECRET, function (err, tokenResponse) {
                    if (err) {
                        reject(tokenResponse == null ? err : tokenResponse);
                    }
                    resolve(tokenResponse);
                })
            }
        );
    }
}