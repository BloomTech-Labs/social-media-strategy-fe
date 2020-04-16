import React, { useState } from 'react';
//component imports
import TransitionsModal from './Modal';
import HomeNav from './HomeNav';
import REGISTER_LOGIN from '../components/Register_Login';
// react router dom imports
import { NavLink, Route, Switch } from 'react-router-dom';
// Styles
import '../sass/navigation.scss';
// asset imports
import Home from '../assets/icons8-home-30.svg';
import HomeAlt from '../assets/icons8-home2-30.svg';
import Search from '../assets/icons8-search-30.svg';
import SearchAlt from '../assets/icons8-search2-30.svg';
import Menu from '../assets/icons8-menu-vertical-30.svg';
import MenuAlt from '../assets/icons8-menu-vertical2-30.svg';
import Message from '../assets/icons8-chat-30.svg';
import MessageAlt from '../assets/icons8-chat2-30.svg';
import Account from '../assets/icons8-male-user-30.svg';
import AccountAlt from '../assets/icons8-male-user2.svg';
import Analytics from '../assets/icons8-bar-chart-30.svg';
import AnalyticsAlt from '../assets/icons8-bar-chart2-30.svg';
import Alert from '../assets/icons8-doorbell-30.svg';
import AlertAlt from '../assets/icons8-doorbell2-30.svg';

const Navigation = () => {
  // const [currentuser, setCurrentuser] = useState("");
  const [color, setColor] = useState({
    home: true,
    search: false,
    menu: false,
    message: false,
    account: false,
    analytics: false,
    alert: false,
  });

  console.log(color.home);
  return (
    <div>
      <div className="navContainer">
        <div className="navButtonContainer">
          <TransitionsModal />
        </div>
        <nav className="navLinks">
          <ul>
            <NavLink
              className={color.home ? 'linkActive' : 'linkNav'}
              to="/home"
              onClick={() =>
                setColor({
                  home: true,
                  search: false,
                  menu: false,
                  message: false,
                  account: false,
                  analytics: false,
                  alert: false,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.home ? HomeAlt : Home}
                  alt="home icon"
                />
                Home
              </li>
            </NavLink>
            <NavLink
              className={color.search ? 'linkActive' : 'linkNav'}
              to="/search"
              onClick={() =>
                setColor({
                  home: false,
                  search: true,
                  menu: false,
                  message: false,
                  account: false,
                  analytics: false,
                  alert: false,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.search ? SearchAlt : Search}
                  alt="Search icon"
                />
                Search
              </li>
            </NavLink>
            <NavLink
              className={color.account ? 'linkActive' : 'linkNav'}
              to="/account"
              onClick={() =>
                setColor({
                  home: false,
                  search: false,
                  menu: false,
                  message: false,
                  account: true,
                  analytics: false,
                  alert: false,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.account ? AccountAlt : Account}
                  alt="Account icon"
                />
                Account
              </li>
            </NavLink>
            <NavLink
              className={color.analytics ? 'linkActive' : 'linkNav'}
              to="/analytics"
              onClick={() =>
                setColor({
                  home: false,
                  search: false,
                  menu: false,
                  message: false,
                  account: false,
                  analytics: true,
                  alert: false,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.analytics ? AnalyticsAlt : Analytics}
                  alt="Analytics icon"
                />
                Analytics
              </li>
            </NavLink>
            <NavLink
              className={color.message ? 'linkActive' : 'linkNav'}
              id="1"
              to="/messages"
              onClick={() =>
                setColor({
                  home: false,
                  search: false,
                  menu: false,
                  message: true,
                  account: false,
                  analytics: false,
                  alert: false,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.message ? MessageAlt : Message}
                  alt="Message icon"
                />
                Messages
              </li>
            </NavLink>
            <NavLink
              className={color.alert ? 'linkActive' : 'linkNav'}
              to="/notifications"
              onClick={() =>
                setColor({
                  home: false,
                  search: false,
                  menu: false,
                  message: false,
                  account: false,
                  analytics: false,
                  alert: true,
                })
              }
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.alert ? AlertAlt : Alert}
                  alt="bell icon"
                />
                Notifications
              </li>
            </NavLink>
            <NavLink
              onClick={() =>
                // localStorage.removeItem("token") &
                // localStorage.removeItem("CURRENTUSER") &
                localStorage.clear() &
                sessionStorage.clear() &
                window.location.reload(false)
              }
              className={color.menu ? 'linkActive' : 'linkNav'}
              to="/"
            >
              <li className="link">
                <img
                  className="navImage"
                  src={color.menu ? MenuAlt : Menu}
                  alt="Menu icon"
                />
                Logout{' '}
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
