import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import routes from "../../api/routes";

export function Header(): JSX.Element {
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
    return routes.map(({ label, href }) => {
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
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}