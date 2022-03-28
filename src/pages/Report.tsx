import { PBIEmbed, PBIEmbedProps } from "../components/common/PBIEmbed"

export default function Report(): JSX.Element {
  const props = {
    visualType: 'report',
    url: 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport',
  } as PBIEmbedProps;

  return(
    <PBIEmbed key={props.visualType + props.url} {...props}/>
  )
}