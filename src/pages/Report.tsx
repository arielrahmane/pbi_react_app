import { PowerBIVisual, VisualProps } from "../components/common/PowerBIVisual"

export default function Report(): JSX.Element {
  const props = {
    visualType: 'report',
    url: 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport',
  } as VisualProps;

  return(
    <PowerBIVisual key={props.visualType + props.url} {...props}/>
  )
}