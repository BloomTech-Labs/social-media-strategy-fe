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
import BackgroundImage from "../assets/imgs/bgDesktopLandscape.jpg";

const useStyles = makeStyles((theme) => ({
 "@global": {
  body: {
   backgroundImage: `url(${BackgroundImage})`,
  },
 },
 appBar: {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: "#2196F3",
 },
 toolbar: {
  flexWrap: "wrap",
 },
 toolbarTitle: {
  flexGrow: 1,
  fontFamily: "sansita",
  color: "#fff",
  fontSize: "36px",
 },
 link: {
  margin: theme.spacing(1, 1.5),
  color: "#fff",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "11px",
  letterSpacing: "0.25px",
 },
 mainContent: {
  padding: theme.spacing(8, 0, 6),
  maxWidth: 800,
  "@media (max-width: 960px)": {
   maxWidth: 600,
  },
  "@media (orientation: portrait)": {
   marginTop: -10,
  },
 },
 subContent: {
  "@media (max-width: 600px)": {
   maxWidth: 400,
  },
  marginTop: -30,
  marginBottom: 50,
 },
 mainHeading: {
  textAlign: "center",
  color: "#fff",
  fontFamily: "Roboto Condensed",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: 70,
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
   {/* Main text */}
   <Container component="main" className={classes.mainContent}>
    <Typography
     component="h1"
     variant="h2"
     gutterBottom
     className={classes.mainHeading}
    >
     Social Media Management made easy.
    </Typography>
   </Container>
   {/* End main text */}
   {/* Sub text */}
   <Container className={classes.subContent}>
    <Typography component="p" className={classes.subHeading}>
     Discover how to develop your brand and manage your digital marketing
     strategy
    </Typography>
   </Container>
   {/* End sub text */}
   <Container
    maxWidth="md"
    component="main"
    className={classes.butttonContainer}
   >
    <Button component="button" className={classes.button} onClick={() => push('/login')}>
     Get Started
    </Button>
   </Container>
  </React.Fragment>
 );
}
