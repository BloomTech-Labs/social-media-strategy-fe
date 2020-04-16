import React from "react";
//component imports
import TransitionsModal from "./Modal";
// react router dom imports
import { NavLink, Route, Switch } from "react-router-dom";
// Styles
import "../sass/navigation.scss";
// asset imports
import Home from "../assets/icons8-home-30.svg";
import Search from "../assets/icons8-search-30.svg";
import Menu from "../assets/icons8-menu-vertical-30.svg";
import Message from "../assets/icons8-chat-30.svg";
import Account from "../assets/icons8-male-user-30.svg";
import Analytics from "../assets/icons8-bar-chart-30.svg";
import Alert from "../assets/icons8-doorbell-30.svg";

const Navigation = () => {
  
  return (
    <div>
      <div className="navContainer">
        <div className="navButtonContainer">
          <TransitionsModal />
        </div>
        <nav className="navLinks">
          <ul>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/home"
            >
              <li className="link">
                <img
                  src={Home}
                  alt="home icon"
                />
                Home
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/search"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Search}
                  alt="Search icon"
                />
                Search
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/account"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Account}
                  alt="Account icon"
                />
                Account
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/analytics"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Analytics}
                  alt="Analytics icon"
                />
                Analytics
              </li>
            </NavLink>
            <NavLink
              className="linkNav"
              activeClassName= 'linkActive'
              id="1"
              to="/messages"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Message}
                  alt="Message icon"
                />
                Messages
              </li>
            </NavLink>
            <NavLink
              className="linkNav"
              activeClassName= 'linkActive'
              to="/notifications"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Alert}
                  alt="bell icon"
                />
                Notifications
              </li>
            </NavLink>
            <NavLink
              className="linkNav"
              activeClassName= 'linkActive'
              to="/login"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={Menu}
                  alt="Menu icon"
                />
                Login
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
      <Switch>
        {/* <Route path='/home'>{HomeNav}</Route> */}
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
