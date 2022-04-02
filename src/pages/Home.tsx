// import { getAccessToken } from "../utils/authentication";
import React from 'react';
import { Button } from '@material-ui/core';
import { useMsal } from "@azure/msal-react";
import { IPublicClientApplication} from  "@azure/msal-browser";
import { loginRequest, tokenRequest } from "../config/authConfig";

function handleLogin(instance: IPublicClientApplication) {
  instance.loginPopup(loginRequest).catch(e => {
    console.error(e);
  });
}

function acquireToken(instance: IPublicClientApplication) {
  instance.acquireTokenSilent(tokenRequest).catch(e => {
    console.error(e);
  });
}

const ProtectedContent = () => {
  const { instance } = useMsal();

  return (
    <>
      <Button onClick={() => handleLogin(instance)}>Login</Button>
      <Button onClick={() => acquireToken(instance)}>Acquire Token</Button>
    </>
  )
}

const Home = (): JSX.Element => {
  return(
    <>
      <h1>Home</h1>
      <ProtectedContent />
    </>
  )
}

export default Home;