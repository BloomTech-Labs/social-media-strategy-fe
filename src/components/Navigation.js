import React, { useState, useEffect } from 'react';

//component imports
import HomeNav from './HomeNav';
import REGISTER_LOGIN from '../components/Register_Login';

// material ui imports
import { Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

// react router dom imports
import { NavLink, Route, Switch } from 'react-router-dom';

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
import Axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

//import TransitionsModal from "./modal";

const Navigation = () => {
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(blue[700]),
      backgroundColor: blue[700],
      '&:hover': {
        backgroundColor: blue[500]
      }
    }
  }))(Button);
  const [currentuser, setCurrentuser] = useState('');
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [message, setMessage] = useState(false);
  const [account, setAccount] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [alert, setAlert] = useState(false);

  async function twittercheck() {
    let user = await axiosWithAuth().get(`/users/user`);
    setCurrentuser(user.data.subject);
  }
  async function twitter() {
    let ax = await (
      await fetch(
        ` https://post-route-feature.herokuapp.com/api/auth/${currentuser}/oauth`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            accept: 'application/json',
            Authorization: localStorage.getItem('token')
          }
        }
      )
    ).json();

    console.log(ax);
    let move = await (window.location.href = ax);
  }
  useEffect(() => {
    twittercheck();
  }, []);

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
      <div className='navContainer'>
        <div className='navButtonContainer'>
          {/* <TransitionsModal /> */}
          {console.log(window.location.pathname)}
          {console.log(currentuser)}
          <ColorButton className='navButton'>Post</ColorButton>
        </div>
        <nav className='navLinks'>
          <ul>
            <NavLink
              className={home ? 'linkActive' : 'linkNav'}
              to='/home'
              onClick={homeHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={home ? HomeAlt : Home}
                  alt='home icon'
                />
                Home
              </li>
            </NavLink>
            <NavLink
              className={search ? 'linkActive' : 'linkNav'}
              to='/search'
              onClick={searchHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={search ? SearchAlt : Search}
                  alt='Search icon'
                />
                Search
              </li>
            </NavLink>
            <NavLink
              className={account ? 'linkActive' : 'linkNav'}
              to='/account'
              onClick={accountHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={account ? AccountAlt : Account}
                  alt='Account icon'
                />
                Account
              </li>
            </NavLink>
            <NavLink
              className={analytics ? 'linkActive' : 'linkNav'}
              to='/analytics'
              onClick={analyticsHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={analytics ? AnalyticsAlt : Analytics}
                  alt='Analytics icon'
                />
                Analytics
              </li>
            </NavLink>
            <NavLink
              className={message ? 'linkActive' : 'linkNav'}
              id='1'
              to='/messages'
              onClick={messageHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={message ? MessageAlt : Message}
                  alt='Message icon'
                />
                Messages
              </li>
            </NavLink>
            <NavLink
              className={alert ? 'linkActive' : 'linkNav'}
              to='/notifications'
              onClick={alertHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={alert ? AlertAlt : Alert}
                  alt='bell icon'
                />
                Notifications
              </li>
            </NavLink>
            <NavLink
              className={menu ? 'linkActive' : 'linkNav'}
              to='/more'
              onClick={menuHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={menu ? MenuAlt : Menu}
                  alt='Menu icon'
                />
                More
              </li>
            </NavLink>
            <NavLink
              className={menu ? 'linkActive' : 'linkNav'}
              to='/login'
              onClick={menuHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={menu ? MenuAlt : Menu}
                  alt='Menu icon'
                />
                Login
              </li>
            </NavLink>
            <NavLink
              className={menu ? 'linkActive' : 'linkNav'}
              to='/callback'
              onClick={menuHandler}>
              <li className='link'>
                <img
                  className='navImage'
                  src={menu ? MenuAlt : Menu}
                  alt='Menu icon'
                />
                Callback test
              </li>
            </NavLink>
          </ul>
        </nav>
        <div className='avatar'>
          <img
            style={{ position: 'absolute', right: '-115px', cursor: 'pointer' }}
            alt=''
            src='https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/icons/sign-in-with-twitter-gray-png-img-fullhd-medium.png.img.fullhd.medium.png'
            onClick={twitter}
          />
        </div>
      </div>
      <Switch>
        <Route path='/home'>{HomeNav}</Route>
        <Route path='/search'></Route>
        <Route path='/account'></Route>
        <Route path='/analytics'></Route>
        <Route path='/messages'></Route>
        <Route path='/notifications'></Route>
        <Route path='/more'></Route>
      </Switch>
    </div>
  );
};

export default Navigation;
