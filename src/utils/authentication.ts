import {
  AuthenticationResult,
  IPublicClientApplication,
} from '@azure/msal-browser';

import { loginRequest, tokenRequest } from "../config/authConfig";


export const handleLogin = (instance: IPublicClientApplication) => {
  instance.loginPopup(loginRequest)
  .then((response) => {
    console.log(response);
  })
  .catch(e => {
    console.error(e);
  });
}

export const handleLogout = (instance: IPublicClientApplication) => {
  instance.logoutPopup()
  .then((response) => {
    console.log(response);
  })
  .catch(e => {
    console.error(e);
  });
}

export const handleAuth = (instance: IPublicClientApplication, isAuthenticated: boolean) => {
  isAuthenticated ? handleLogout(instance) : handleLogin(instance)
}

export const acquireToken = (instance: IPublicClientApplication): Promise<AuthenticationResult> => {
  return instance.acquireTokenSilent({scopes: tokenRequest.scopes, account: instance.getAllAccounts()[0]});
}

export const getRequestHeaders = async (instance: IPublicClientApplication) => {
  await acquireToken(instance)
    .then((token: AuthenticationResult) => {
      return {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token.accessToken}`
      };
    })
    .catch(err => {
      return err;
    })
}