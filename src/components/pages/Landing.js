import React from "react";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ReactComponent as Logo } from "../../assets/imgs/landing_social.svg";
import { ReactComponent as ScheduleLogo } from "../../assets/imgs/shedule.svg";
import { ReactComponent as AnalyzingPic } from "../../assets/imgs/blueSearch.svg";
import { ReactComponent as DataScience } from "../../assets/imgs/datascience.svg";
import LearnMore from "../analytics/LearnMore";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      overflowY: "auto!important",
      height: "100%",
      // margin: "auto",
      // width: "960px",
    },
  },
  appBar: {
    borderBottom: "none!important",
    boxShadow: "none!important",
    backgroundColor: "#fff",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    fontFamily: "sansita",
    color: "dodgerblue",
    fontSize: "36px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "11px",
    letterSpacing: "0.25px",
  },
  mainContent: {
    padding: theme.spacing(8, 0, 6),
    maxWidth: 400,
    "@media (max-width: 960px)": {
      maxWidth: 600,
    },
    "@media (orientation: portrait)": {
      marginTop: -10,
    },
  },
  subContent: {
    paddingTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 600px)": {
      maxWidth: 400,
    },
    marginTop: -30,
    marginBottom: 50,
  },
  mainHeading: {
    textAlign: "center",
    color: "4E4E4E",
    fontFamily: "Sansita",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 40,
    "@media (max-width: 960px)": {
      fontSize: 32,
      marginTop: -40,
      marginBottom: 0,
    },
    "@media (max-width: 600px)": {
      fontSize: 32,
      marginTop: 60,
      marginBottom: 50,
    },
  },
  subHeading: {
    fontSize: "14pt",
    textAlign: "center",
    fontFamily: "Roboto Condensed",
    margin: "0 auto",
    fontWeight: "bold",
    "@media (min-width: 960px)": {
      maxWidth: 400,
    },
  },
  button: {
    backgroundColor: "#2196F3",
    fontFamily: "Roboto Condensed",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: "20px",
    color: "#fff",
    padding: "15px",
    "@media (max-width: 960px)": {
      marginTop: -20,
    },
    "@media (max-width: 600px)": {
      marginTop: 10,
    },
  },
  butttonContainer: {
    textAlign: "center",
  },
  h1: {
    fontSize: "25pt",
    textAlign: "center",
    fontFamily: "Roboto Condensed",
    margin: "0 auto",
    fontWeight: 500,
    textAlign: "center",
    "@media (min-width: 960px)": {
      maxWidth: 400,
    },
  },
  p: {
    fontSize: "14pt",
    textAlign: "center",
    fontFamily: "Roboto Condensed",
    margin: "0 auto",
    "@media (min-width: 960px)": {
      maxWidth: 400,
    },
  },
}));

export default function Landing() {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            SoMe
          </Typography>
          <nav>
            <Link variant="button" href="/login" className={classes.link}>
              SIGN UP
            </Link>
            <Link variant="button" href="/login" className={classes.link}>
              LOGIN
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Main text */}
        <div>
          <Container component="main" className={classes.mainContent}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              className={classes.mainHeading}
            >
              Social Media management <br></br> made easy.
            </Typography>
          </Container>
          <Container
            maxWidth="md"
            component="main"
            className={classes.butttonContainer}
          >
            <Button
              component="button"
              className={classes.button}
              onClick={() => push("/login")}
            >
              Get Started
            </Button>
          </Container>
        </div>
        {/* End main text */}

        {/* Sub text */}
        <div>
          <Container className={classes.subContent}>
            <Logo style={{ width: "400px", height: "400px" }} />
            <Typography component="p" className={classes.subHeading}>
              Discover how to develop your brand <br></br>and manage your
              digital marketing strategy
            </Typography>
          </Container>
          {/* End sub text */}
        </div>
      </div>

      {/* Start of About */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "8%",
        }}
      >
        <div>
          <ScheduleLogo style={{ width: "300px", height: "300px" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className={classes.h1}>Draft, Organize, and Schedule</h1>
          <br></br>
          <p className={classes.p}>
            SoMe makes it easy to streamline and optimize your social media
            presence in one convenient place.
          </p>
        </div>
      </div>

      <h1 className={classes.h1} style={{color: 'dodgerblue'}}>Cool! But what sets us apart?</h1>

      {/* Start of Analytics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "8%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column"}}>
          <h1 className={classes.h1}>Gain powerful insights</h1>
          <br></br>
          <p className={classes.p}>
            Find out the words your followers are engaging with most. We believe this information can be extremely beneficial in increasing your engagement.
          </p>
          <br></br>
          <div style={{display:'flex', justifyContent:"center"}}>
          <LearnMore/>
          </div>
        </div>

        <div>
          <DataScience style={{ width: "300px", height: "300px" }} />
        </div>
       
      </div>

      {/* Start of monthly snapshot */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "8%",
        }}
      >
        <div>
          <AnalyzingPic style={{ width: "300px", height: "300px" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className={classes.h1}>Track your platform growth</h1>
          <br></br>
          <p className={classes.p}>
            <p className={classes.p}>
              View a snapshot of your social media engagement each month. SoMe provides valuable metrics so you can make sure your platforms' growth remains on track. </p>
            <br></br>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
