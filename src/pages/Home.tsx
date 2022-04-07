import React from 'react';
import { Button } from '@material-ui/core';
import { useMsal } from "@azure/msal-react";
import { handleLogin, acquireToken } from '../utils/authentication';

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