import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import twitterLogo from "../../assets/imgs/twitter-logo.svg";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import axios from "axios";
// Material-UI
import { Grid, makeStyles, Typography, Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexWrap: 'wrap',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${theme.navbar.height.small})`
    },
    [theme.breakpoints.up('xs')]: {
      height: `calc(100% - ${theme.navbar.height.normal})`
    },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '0 4%'
  },
  header: {
    fontWeight: 'bold',
    fontFamily: 'Roboto Condensed',
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
    width: '330px',
    maxWidth: '90%'
  }
}));

function TwitterConnect(props) {
  const classes = useStyles();
  const { authService } = useOktaAuth();
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const oktaToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  console.log(oktaToken);

  useEffect(() => {
    (async () => {
      const oktaUser = await authService.getUser();
      setIsConnected(oktaUser.twitter_screenName);
      setLoading(false);
    })();
  }, [authService]);

  async function authorizeTwitter() {
    let ax = await (
      await fetch(`${process.env.REACT_APP_API_URL}/auth/twitter/authorize`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${oktaToken.accessToken.accessToken}`,
        },
      })
    ).json();

    await (window.location.href = ax);
  }

  const disconnectTwitter = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_API_URL}/auth/twitter/disconnect`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${oktaToken.accessToken.accessToken}`
      }
    });
    setIsConnected(false);
    setLoading(false);
  }

  return (
    <Grid container className={classes.root}>
      <Nav />
      <Grid item className={classes.content}>
        { loading ? 
          <CircularProgress />
        :
          <>
            <Typography variant="h4" component="h1" className={classes.header}>
              { isConnected ? 'Your twitter account is connected.' : 'Let\'s get your account set up!' }
            </Typography>
            <img src={twitterLogo} alt="Twitter logo" />
            <Button variant="contained" color="primary" className={classes.button} disableElevation 
              onClick={isConnected ? disconnectTwitter : authorizeTwitter}>
              { isConnected ? 'Disconnect Twitter' : 'Connect to Twitter' }
            </Button>
          </>
        }
      </Grid>
    </Grid>
  );
}

export default TwitterConnect;
