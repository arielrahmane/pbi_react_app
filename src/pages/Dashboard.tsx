import { PBIEmbed, PBIEmbedProps } from "../components/common/PBIEmbed"

export default function Dashboard(): JSX.Element {
  const props = {
    visualType: 'dashboard',
    url: 'https://playgroundbe-bck-1.azurewebsites.net/Dashboards/SampleDashboard',
  } as PBIEmbedProps;

  return(
    <PBIEmbed key={props.visualType + props.url} {...props}/>
  )
}