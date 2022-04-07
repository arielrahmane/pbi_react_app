import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import routes from "../../api/routes";
import { handleLogin } from "../../utils/authentication";
import { useMsal } from "@azure/msal-react";

export function Navbar(): JSX.Element {
  const { instance } = useMsal();

  const displayDesktop = () => {
    return (
      <Toolbar>
        {appLogo}
        {getMenuButtons()}
      </Toolbar>
    );
  };

  const appLogo = (
    <Typography variant="h6" component="h1">
      Power BI React App
    </Typography>
  );

  const getMenuButtons = () => {
    const navButtons = routes.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
    return (
      <>
        {navButtons}
        <Button color="inherit" onClick={() => handleLogin(instance)}>Login</Button>
      </>
    )
  };

  return (
    <header className="header">
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}