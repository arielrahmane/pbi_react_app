import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";


export interface Route {
  label: string;
  href: string;
  page: JSX.Element;
}

const routes: Route[] = [
  {
    label: "Home",
    href: "/home",
    page: Home(),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    page: Dashboard(),
  },
  {
    label: "Report",
    href: "/report",
    page: Report(),
  },
]

export default routes;