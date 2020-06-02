import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
// Components
import Nav from "../nav/Nav";
import DrawerMenu from "../nav/DrawerMenu";
// Image
import twitterLogo from "../../assets/imgs/twitter-logo.svg";
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
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    (async () => {
      const oktaUser = await authService.getUser();
      setIsConnected(oktaUser.twitter_handle);
      setLoading(false);
    })();
  }, [authService]);

  function authorizeTwitter() {
    axiosWithAuth(authService)
      .get("/auth/twitter/authorize")
      .then(({ data }) => (window.location.href = data))
      .catch((err) => console.error(err));
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Grid container className={classes.root}>
      <Nav toggleMenu={isConnected ? toggleMenu : null} />
      { isConnected && 
        <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />
      }
      <Grid item className={classes.content}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
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
              onClick={isConnected ? disconnectTwitter : authorizeTwitter}
            >
              {isConnected ? "Disconnect Twitter" : "Connect to Twitter"}
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default TwitterConnect;
