import React from "react";
import { AppBar, Button, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import routes from "../../api/routes";
import { handleLogin } from "../../utils/authentication";
import { useMsal } from "@azure/msal-react";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  toolbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toolbarInnerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  menuButtons: {
    marginLeft: theme.spacing(10),
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
}));

export function Navbar(): JSX.Element {
  const { instance } = useMsal();
  const classes = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbarContainer}>
        <div className={classes.toolbarInnerContainer}>
          { iconButton }
          { appLogo }
          { getMenuButtons() }
        </div>
        <Button color="inherit" onClick={() => handleLogin(instance)}>Login</Button>
      </Toolbar>
    );
  };

  const iconButton = (
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
  )

  const appLogo = (
    <Typography variant="h6">
      Power BI React App
    </Typography>
  );

  const getMenuButtons = () => {
    const navButtons = routes.map(({ label, href }) => {
      return (
        <Button
          className={classes.menuButton}
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
      <div className={classes.menuButtons}>
        {navButtons}
      </div>
    )
  };

  return (
    <AppBar>{displayDesktop()}</AppBar>
  );
}