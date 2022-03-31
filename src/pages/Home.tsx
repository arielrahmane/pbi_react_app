import { getAccessToken } from "../utils/authentication"

export default function Home(): JSX.Element {

  async function getToken() {
    const token = await getAccessToken();
    console.log(token);
  }

  return(
    <>
      <h1>Home</h1>
      <button onClick={getToken}>Get Access Token</button>
    </>
  )
}