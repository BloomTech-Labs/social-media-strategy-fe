import React from "react";
//component imports
import TransitionsModal from "./Modal";
import SvgComponent from './SvgComponent';
// react router dom imports
import { NavLink, Route, Switch } from "react-router-dom";
// Styles
import "../sass/navigation.scss";
// asset imports
import Menu from "../assets/icons8-menu-vertical-30.svg";

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
                <SvgComponent iconName='home' />
                Home
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/search"
            >
              <li className="link">
              <SvgComponent iconName='search' />
                Search
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/account"
            >
              <li className="link">
              <SvgComponent iconName='male-user' />
                Account
              </li>
            </NavLink>
            <NavLink
              className = "linkNav"
              activeClassName = "linkActive"
              to="/analytics"
            >
              <li className="link">
              <SvgComponent iconName='bar-chart' />
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
              <SvgComponent iconName='chat' />
                Messages
              </li>
            </NavLink>
            <NavLink
              className="linkNav"
              activeClassName= 'linkActive'
              to="/notifications"
            >
              <li className="link">
              <SvgComponent iconName='doorbell' />
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
