import React from 'react';
import { Button } from '@material-ui/core';
import { useMsal } from "@azure/msal-react";
import { acquireToken, getRequestHeaders } from '../utils/authentication';

const ProtectedContent = () => {
  const { instance } = useMsal();

  return (
    <>
      <Button onClick={() => acquireToken(instance).then(token => console.log(token))}>Acquire Token</Button>
      <Button onClick={() => getRequestHeaders(instance).then(res => console.log(res))}>Get Headers</Button>
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