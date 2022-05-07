import React from 'react';
import { Button } from '@material-ui/core';
import { useMsal } from "@azure/msal-react";
import { acquireToken, getRequestHeaders } from '../utils/authentication';
import { getReportEmbedInfo } from '../utils/PBIEmbedActions';
import { IPublicClientApplication } from '@azure/msal-browser';

const {
  REACT_APP_WORKSPACE_ID,
  REACT_APP_ACADEMIC_REPORT_ID
} = process.env

const ProtectedContent = () => {
  const { instance } = useMsal();
  const retrieveHeaders = async () => {
    const headers = await getRequestHeaders(instance);
    console.log("headers: ", headers);
  }

  const callGetEmbedInfo = async (instance: IPublicClientApplication) => {
    if (!REACT_APP_WORKSPACE_ID || !REACT_APP_ACADEMIC_REPORT_ID)
      return;
    const embedInfo = await getReportEmbedInfo(instance, REACT_APP_WORKSPACE_ID, REACT_APP_ACADEMIC_REPORT_ID );
    console.log("EMBED INFO: ", embedInfo);
  }
  
  return (
    <>
      <Button onClick={() => acquireToken(instance).then(token => console.log(token))}>Acquire Token</Button>
      <Button onClick={() => retrieveHeaders()}>Get Headers</Button>
      <Button onClick={() => callGetEmbedInfo(instance)}>Get Report Embed Info</Button>
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