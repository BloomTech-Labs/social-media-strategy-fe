import React from 'react';
//component imports
import TransitionsModal from './Modal';
import Date from './Date';
// react router dom imports
import { NavLink, Switch } from 'react-router-dom';
// Styles
import '../sass/navigation.scss';
// asset imports

import { drawerswitch, drawerOpen } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RssFeedIcon from '@material-ui/icons/RssFeed';

const Navigation = props => {
  return (
    <div>
      <div className="navContainer">
        <div className="navButtonContainer">
          <TransitionsModal name="Post now" />
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
              data-cy="nav-home-active"
              to="/home/accounts"
            >
              <li data-cy="nav-home" className="link">
                <HomeIcon
                  className="navImage"
                  style={{ width: '30px', height: '30px' }}
                />
                Home
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  props.user.drawerContent === 'QUEUE' ||
                  !props.user.drawer
                ) {
                  props.drawerswitch();
                }
                props.drawerOpen('QUEUE');
              }}
              className="linkNav"
              data-cy="nav-queue-active"
              activeClassName="linkActive"
              to="/home/queue"
            >
              <li data-cy="nav-queue" className="link">
                <ScheduleIcon
                  className="navImage"
                  style={{ width: '30px', height: '30px' }}
                />
                Queue
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                if (props.user.drawerContent === 'FEED' || !props.user.drawer) {
                  props.drawerswitch();
                }
                props.drawerOpen('FEED');
              }}
              className="linkNav"
              activeClassName="linkActive"
              to="/home/feed/home"
            >
              <li className="link">
                <RssFeedIcon
                  className="navImage"
                  style={{ width: '30px', height: '30px' }}
                />
                Feed
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
              to="/login"
            >
              <li className="link">
                <ExitToAppIcon
                  className="navImage"
                  style={{ width: '30px', height: '30px' }}
                />
                Logout{' '}
              </li>
            </NavLink>
          </ul>
        </nav>
        <Date className="date" />
      </div>
      <Switch>
        {/* <Route path='/home'>{HomeNav}</Route> */}
        {/* <Route path='/search'></Route>
        <Route path='/account'></Route>
        <Route path='/analytics'></Route>
        <Route path='/messages'></Route>
        <Route path='/notifications'></Route>
        <Route path='/landing'></Route> */}
      </Switch>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.user,
  topics: state.topics
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ drawerswitch, drawerOpen }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
