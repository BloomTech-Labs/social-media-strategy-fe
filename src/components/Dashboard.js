// React and React-Router-DOM imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';

// Material UI imports
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CropFreeIcon from '@material-ui/icons/CropFree';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//Adding moment for date purposes
import Moment from 'moment';

// import AddAccount from "./AddAccount";

// Styling
import '../sass/dashboard.scss';

// Assets import
import data from './accounts.json';
import img from '../assets/headshot.jpg';
import pin from '../assets/pin.svg';
import twitterimg from '../imgs/Vector.png';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { drawerOpen, currentUser, drawerswitch } from '../actions';
import { dashStyles } from '../sass/DashStyles';

// Set dummy Acct Data
const accountData = data.accounts;
const drawerWidth = 400;

const Dashboard = (props) => {
  const st = dashStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [drawerOpen, setDrawerOpen] = useState(true);

  // const handleDrawerOpen = () => {
  //   setDrawerOpen(true);
  // };

  const handleDrawerClose = () => {
    props.drawerswitch();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // async function twittercheck() {
  //   props.currentUser();
  // }

  async function twitter() {
    let ax = await (
      await fetch(
        ` https://social-media-strategy.herokuapp.com/api/auth/${props.user.currentUser.subject}/oauth`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            accept: 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      )
    ).json();

    let move = await (window.location.href = ax);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function getDate() {
    const todaysDate = Moment().format('MMM DD, YYYY');
    return todaysDate;
  }
  return (
    <Drawer
      className={st.drawer}
      open={props.user.drawer}
      variant="persistent"
      anchor="left"
      classes={{
        paper: st.drawerPaper,
      }}
    >
      <div className="title">
        <div className={st.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <h1 className="bold">Dashboard</h1>
        <div className="dash-title">
          <h4 className="highlight">{Moment().format('dddd')}</h4>{' '}
          <h4 className="highlight"> • </h4>
          <h4 className="date">{getDate()}</h4>
        </div>
        <div className="acct-title">
          <h2 className="blue-bold">Accounts</h2>
          <Link
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
            className="button"
          >
            Add Account
          </Link>
          {/* <Button
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Open Popover
          </Button> */}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <Typography className={st.typography}>
              <img
                onClick={twitter}
                style={{ cursor: 'pointer' }}
                src={twitterimg}
                alt=""
              />
            </Typography>
          </Popover>
        </div>
        {accountData.map((e) => (
          <Card key={data.id} className={st.root}>
            <img className="icon" src={img} alt="Profile" />
            <Typography variant="h3" className={st.name}>
              {e.firstName}
              {e.lastName}
            </Typography>
            <Typography variant="h4" className={st.handle}>
              {e.twitterHandle}
            </Typography>
            <Box display={'flex'} className={st.boxCtr}>
              <img className={st.locationIcon} src={pin} fontSize="small" />
              <Typography className={st.secondaryTitle}>
                {e.location}
              </Typography>
            </Box>
            <Box display={'flex'} className={st.boxCtr}>
              <Box flex={'auto'} className="headers">
                <p className={st.secondaryTitle}>Posts</p>
                <p className={st.statLabel}>{e.posts}</p>
              </Box>
              <Box flex={'auto'} className="headers">
                <p className={st.secondaryTitle}>Following</p>
                <p className={st.statLabel}>{e.following}</p>
              </Box>
              <Box flex={'auto'} className="headers">
                <p className={st.secondaryTitle}>Followers</p>
                <p className={st.statLabel}>{e.followers}</p>
              </Box>
            </Box>
          </Card>
        ))}
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ currentUser, drawerswitch, drawerOpen }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
