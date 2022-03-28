import { PowerBIVisual, VisualProps } from "../components/common/PowerBIVisual"

export default function Dashboard(): JSX.Element {
  const props = {
    visualType: 'dashboard',
    url: 'https://playgroundbe-bck-1.azurewebsites.net/Dashboards/SampleDashboard',
  } as VisualProps;

  return(
    <PowerBIVisual key={props.visualType + props.url} {...props}/>
  )
}