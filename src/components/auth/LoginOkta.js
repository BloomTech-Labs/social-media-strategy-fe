import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import SignInWidget from "./SignInWidget";
import { Redirect, useHistory } from "react-router-dom";
import {
  Grid,
  Hidden,
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { ReactComponent as LoginImg } from "../../assets/imgs/socialmedia.svg";
import logo from "../../assets/imgs/Logo.svg";
import logoDark from "../../assets/imgs/Logo-dark.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  navbar: {
    height: theme.navbar.width.close,
    display: "flex",
    justifyContent: "center",
  },
  imageContainer: {
    overflow: "hidden",
    height: "100%",
    marginRight: "7%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  logo: {
    height: "20px",
  },
  widgetContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const LoginOkta = ({ baseUrl }) => {
  const { authService, authState } = useOktaAuth();
  const { push } = useHistory();
  const classes = useStyles();

  const onSuccess = async (res) => {
    authService.login("/home");
    authService.redirect({
      sessionToken: res.session.token,
    });
  };

  const handleLogoClick = () => {
    push("/");
  };

  if (authState.isPending) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return authState.isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <Grid container wrap="wrap" className={classes.root}>
      <Hidden mdUp>
        <Grid item xs={12}>
          <AppBar className={classes.navbar} position="static">
            <Toolbar>
              <Button onClick={handleLogoClick}>
                <img className={classes.logo} src={logo} alt="SoMe logo" />
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
      </Hidden>
      <Grid item xs className={classes.widgetContainer}>
        <Hidden mdDown>
          <Button
            onClick={handleLogoClick}
            style={{ position: "absolute", top: ".8em", left: ".8em" }}
          >
            <img className={classes.logo} src={logoDark} alt="SoMe logo" />
          </Button>
        </Hidden>
        <SignInWidget
          baseUrl={process.env.REACT_APP_OKTA_DOMAIN}
          onSuccess={onSuccess}
        />
      </Grid>
      <Hidden xsDown>
        <Grid item xs={5} className={classes.imageContainer}>
          <LoginImg className={classes.image} alt="Login" />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LoginOkta;
