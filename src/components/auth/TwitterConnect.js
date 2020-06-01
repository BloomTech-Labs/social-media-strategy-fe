import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";

import Nav from "../Nav";
import twitterLogo from "../../assets/imgs/twitter-logo.svg";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { authorizeTwitter } from "../../actions/userActions";

// Material-UI
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexWrap: "wrap",
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  content: {
    [theme.breakpoints.down("xs")]: {
      height: `calc(100% - ${theme.navbar.height.small})`,
    },
    [theme.breakpoints.up("xs")]: {
      height: `calc(100% - ${theme.navbar.height.normal})`,
    },
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 4%",
  },
  header: {
    fontWeight: "bold",
    fontFamily: "Roboto Condensed",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    width: "330px",
    maxWidth: "90%",
  },
}));

function TwitterConnect(props) {
  const classes = useStyles();
  const { authService } = useOktaAuth();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(!!user.twitter_handle);
  const [loading, setLoading] = useState(false);
  console.log(user);

  function startAuthorize() {
    setLoading(true);
    dispatch(authorizeTwitter(authService));
  }

  function disconnectTwitter() {
    setLoading(true);

    axiosWithAuth(authService)
      .get("/auth/twitter/disconnect")
      .then(({ data }) => {
        setIsConnected(false);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Grid container className={classes.root}>
      <Nav />
      <Grid item className={classes.content}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Fragment>
            <Typography variant="h4" component="h1" className={classes.header}>
              {isConnected
                ? "Your twitter account is connected."
                : "Let's get your account set up!"}
            </Typography>
            <img src={twitterLogo} alt="Twitter logo" />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disableElevation
              onClick={isConnected ? disconnectTwitter : startAuthorize}
            >
              {isConnected ? "Disconnect Twitter" : "Connect to Twitter"}
            </Button>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
}

export default TwitterConnect;
