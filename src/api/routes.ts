export interface Route {
  label: string;
  href: string;
}

const routes: Route[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Report",
    href: "/report",
  },
]

export default routes;