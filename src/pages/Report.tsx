import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { PBIEmbed, PBIEmbedProps } from "../components/common/PBIEmbed";
import { getReportEmbedInfo } from "../utils/PBIEmbedActions";

const {
  REACT_APP_WORKSPACE_ID,
  REACT_APP_ACADEMIC_REPORT_ID
} = process.env;

export default function Report(): JSX.Element {
  const { instance } = useMsal();
  const sampleConfig = {
    visualType: 'report',
    url: 'https://playgroundbe-bck-1.azurewebsites.net/Reports/SampleReport',
  };
  const [config, setConfig] = useState<PBIEmbedProps>(sampleConfig);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getConfig = async () => {
      if (!REACT_APP_WORKSPACE_ID || !REACT_APP_ACADEMIC_REPORT_ID)
        return;
      const embedInfo = await getReportEmbedInfo(instance, REACT_APP_WORKSPACE_ID, REACT_APP_ACADEMIC_REPORT_ID);
      const _config: PBIEmbedProps = {
        visualType: 'report',
        _embedToken: embedInfo.embedToken.token,
        _id: embedInfo.reportDetail.reportId,
        _embedUrl: embedInfo.reportDetail.embedUrl,
      }
      console.log("config rendered: ", _config);
      setConfig(_config);
      setLoaded(true);
    };
    getConfig();
  }, [instance]);

  return (
    <>
      {!loaded && <PBIEmbed key={config.visualType + config.url} {...config}/>}
      {loaded && <PBIEmbed key={config.visualType + config._embedUrl} {...config}/>}
    </>
  )
}