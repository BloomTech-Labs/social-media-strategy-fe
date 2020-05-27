import React from "react";
import Nav from "../Nav";
import twitterLogo from "../../assets/imgs/twitter-logo.svg";
// Material-UI
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";

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
  const oktaToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  console.log(oktaToken);

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

  return (
    <Grid container className={classes.root}>
      <Nav />
      <Grid item className={classes.content}>
        <Typography variant="h4" component="h1" className={classes.header}>
          Let's get your account set up!
        </Typography>
        <img src={twitterLogo} alt="Twitter logo" />
        <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={authorizeTwitter}>
          Authorize Twitter
        </Button>
      </Grid>
    </Grid>
  );
}

export default TwitterConnect;
