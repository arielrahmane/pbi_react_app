import {
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

export const acquireToken = (instance: IPublicClientApplication) => {
  instance.acquireTokenSilent({scopes: tokenRequest.scopes, account: instance.getAllAccounts()[0]})
  .then((token) => {
    console.log(token);
  })
  .catch(e => {
    console.error(e);
  });
}