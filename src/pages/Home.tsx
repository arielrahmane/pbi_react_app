import { getAccessToken } from "../utils/authentication";
import { Button } from '@material-ui/core';

export default function Home(): JSX.Element {

  async function getToken() {
    await getAccessToken();
  }

  return(
    <>
      <h1>Home</h1>
      <Button onClick={getToken}>Get Access Token</Button>
    </>
  )
}