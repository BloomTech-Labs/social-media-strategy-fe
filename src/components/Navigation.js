import React, { useState } from "react";

//component imports
import HomeNav from "./HomeNav";

// material ui imports
import { Button, Typography, Box } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// react router dom imports
import { NavLink, Route, Switch } from "react-router-dom";

// Styles
import "../sass/navigation.scss";

// asset imports
import Home from "../assets/icons8-home-30.svg";
import HomeAlt from "../assets/icons8-home2-30.svg";
import Search from "../assets/icons8-search-30.svg";
import SearchAlt from "../assets/icons8-search2-30.svg";
import Menu from "../assets/icons8-menu-vertical-30.svg";
import MenuAlt from "../assets/icons8-menu-vertical2-30.svg";
import Message from "../assets/icons8-chat-30.svg";
import MessageAlt from "../assets/icons8-chat2-30.svg";
import Account from "../assets/icons8-male-user-30.svg";
import AccountAlt from "../assets/icons8-male-user2.svg";
import Analytics from "../assets/icons8-bar-chart-30.svg";
import AnalyticsAlt from "../assets/icons8-bar-chart2-30.svg";
import Alert from "../assets/icons8-doorbell-30.svg";
import AlertAlt from "../assets/icons8-doorbell2-30.svg";

//import TransitionsModal from "./modal";

// Material UI Styled Components
const navStyles = makeStyles({
  root: {
    fontFamily: "Montserrat, sans-serif",
    backgroundColor: "#1B262C",
    height: "100vh",
    padding: "1rem"
  },
  navBtn: {
    margin: "30% auto"
  },
  link: {
    fontSize:"1.2rem",
    fontFamily: "Montserrat, sans-serif",
    padding:"1rem",
    textDecoration: "none"
  },
  handle: {
    fontSize: "1.2rem",
    fontFamily: "Montserrat, sans-serif",
    padding:"1rem"
  },
  locationIcon: {
    height:"3vh"
  },
  secondaryTitle: {
    fontSize: "1.2rem",
    color: "#848484",
    fontFamily: "Montserrat, sans-serif",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#848484",
    fontFamily: "Montserrat, sans-serif"
  },
  boxCtr: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  }
})

const Navigation = () => {
  const ColorButton = withStyles(theme => ({
    root: {
      padding: ".5rem 5rem",
      borderRadius: "2rem",
      color: theme.palette.getContrastText(blue[700]),
      backgroundColor: blue[700],
      "&:hover": {
        backgroundColor: blue[500]
      }
    }
  }))(Button);

  const st = navStyles();

  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [message, setMessage] = useState(false);
  const [account, setAccount] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [alert, setAlert] = useState(false);

  const homeHandler = () => {
    setHome(true);
    setSearch(false);
    setMenu(false);
    setMessage(false);
    setAccount(false);
    setAnalytics(false);
    setAlert(false);
  };
  const searchHandler = () => {
    setHome(false);
    setSearch(true);
    setMenu(false);
    setMessage(false);
    setAccount(false);
    setAnalytics(false);
    setAlert(false);
  };
  const menuHandler = () => {
    setHome(false);
    setSearch(false);
    setMenu(true);
    setMessage(false);
    setAccount(false);
    setAnalytics(false);
    setAlert(false);
  };
  const messageHandler = () => {
    setHome(false);
    setSearch(false);
    setMenu(false);
    setMessage(true);
    setAccount(false);
    setAnalytics(false);
    setAlert(false);
  };
  const accountHandler = () => {
    setHome(false);
    setSearch(false);
    setMenu(false);
    setMessage(false);
    setAccount(true);
    setAnalytics(false);
    setAlert(false);
  };
  const analyticsHandler = () => {
    setHome(false);
    setSearch(false);
    setMenu(false);
    setMessage(false);
    setAccount(false);
    setAnalytics(true);
    setAlert(false);
  };
  const alertHandler = () => {
    setHome(false);
    setSearch(false);
    setMenu(false);
    setMessage(false);
    setAccount(false);
    setAnalytics(false);
    setAlert(true);
  };

  return (
    <div>
      <div className={st.root}>
        <div className={st.navBtn}>
          {/* <TransitionsModal /> */}
          <ColorButton>Post</ColorButton>
        </div>
        <nav className="navLinks">
            <NavLink
              className={home ? "linkActive" : "linkNav"}
              to="/home"
              onClick={homeHandler}
            >
              <Typography className={st.link}>
                <img
                  className={st.locationIcon}
                  src={home ? HomeAlt : Home}
                  alt="home icon"
                />
                Home
              </Typography>
            </NavLink>
            <NavLink
              className={search ? "linkActive" : "linkNav"}
              to="/search"
              onClick={searchHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={search ? SearchAlt : Search}
                  alt="Search icon"
                />
                Search
              </Typography>
            </NavLink>
            <NavLink
              className={account ? "linkActive" : "linkNav"}
              to="/account"
              onClick={accountHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={account ? AccountAlt : Account}
                  alt="Account icon"
                />
                Account
              </Typography>
            </NavLink>
            <NavLink
              className={analytics ? "linkActive" : "linkNav"}
              to="/analytics"
              onClick={analyticsHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={analytics ? AnalyticsAlt : Analytics}
                  alt="Analytics icon"
                />
                Analytics
              </Typography>
            </NavLink>
            <NavLink
              className={message ? "linkActive" : "linkNav"}
              id="1"
              to="/messages"
              onClick={messageHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={message ? MessageAlt : Message}
                  alt="Message icon"
                />
                Messages
              </Typography>
            </NavLink>
            <NavLink
              className={alert ? "linkActive" : "linkNav"}
              to="/notifications"
              onClick={alertHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={alert ? AlertAlt : Alert}
                  alt="bell icon"
                />
                Notifications
              </Typography>
            </NavLink>
            <NavLink
              className={menu ? "linkActive" : "linkNav"}
              to="/more"
              onClick={menuHandler}
            >
              <Typography className={st.link}>
                <img
                  className="navImage"
                  src={menu ? MenuAlt : Menu}
                  alt="Menu icon"
                />
                More
              </Typography>
            </NavLink>
        </nav>
        {/* <div className="avatar">
          <p>Hello, Programmers</p>
        </div> */}
      </div>
      <Switch>
        <Route path="/home">{HomeNav}</Route>
        <Route path="/search"></Route>
        <Route path="/account"></Route>
        <Route path="/analytics"></Route>
        <Route path="/messages"></Route>
        <Route path="/notifications"></Route>
        <Route path="/more"></Route>
      </Switch>
    </div>
  );
};

export default Navigation;