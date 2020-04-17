import React from 'react';
//component imports
import TransitionsModal from './Modal';
import SvgComponent from './SvgComponent';
// react router dom imports
import { NavLink, Route, Switch } from 'react-router-dom';
// Styles
import '../sass/navigation.scss';
// asset imports
import Menu from '../assets/icons8-menu-vertical-30.svg';
import { drawerswitch, drawerOpen } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Navigation = (props) => {
  return (
    <div>
      <div className="navContainer">
        <div className="navButtonContainer">
          <TransitionsModal />
        </div>
        <nav className="navLinks">
          <ul>
            <NavLink
              onClick={() => {
                if (props.user.drawerContent === 'HOME' || !props.user.drawer) {
                  props.drawerswitch();
                }
                props.drawerOpen('HOME');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/home"
            >
              <li className="link">
                <SvgComponent iconName="home" />
                Home
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'SEARCH' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('SEARCH');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/search"
            >
              <li className="link">
                <SvgComponent iconName="search" />
                Search
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'ACCOUNT' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('ACCOUNT');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/account"
            >
              <li className="link">
                <SvgComponent iconName="male-user" />
                Account
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'ANALYTICS' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('ANALYTICS');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/analytics"
            >
              <li className="link">
                <SvgComponent iconName="bar-chart" />
                Analytics
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'MESSAGES' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('MESSAGES');
              }}
              className="linkNav"
              activeClassName="linkActive"
              id="1"
              to="/messages"
            >
              <li className="link">
                <SvgComponent iconName="chat" />
                Messages
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'NOTIFICATIONS' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('NOTIFICATIONS');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/notifications"
            >
              <li className="link">
                <SvgComponent iconName="doorbell" />
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
              className={'linkNav'}
              to="/"
            >
              <li className="link">
                <img className="navImage" src={Menu} alt="Menu icon" />
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
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ drawerswitch, drawerOpen }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
