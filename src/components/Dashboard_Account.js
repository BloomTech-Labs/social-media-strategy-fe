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
import TwitterIcon from '@material-ui/icons/Twitter';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Styling
import '../sass/dashboard.scss';

// Assets import

import img from '../assets/headshot.jpg';
import pin from '../assets/pin.svg';
import twitterimg from '../imgs/Vector.png';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  drawerOpen,
  currentUser,
  drawerswitch,
  fetchAccounts,
} from '../actions';
import { dashStyles } from '../sass/DashStyles';

// Set dummy Acct Data
const drawerWidth = 400;

const Dashboard_Account = (props) => {
  const st = dashStyles();
  let updateTrue = props.user.didUpdate === true;

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    props.fetchAccounts();
  }, []);

  const theme = useTheme();

  const handleDrawerClose = () => {
    props.drawerswitch();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function twitter() {
    let ax = await (
      await fetch(
        `${process.env.REACT_APP_API_URL}/auth/${props.user.currentUser.subject}/oauth`,
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

    let move = await (window.location.href = ax); // not currently used anywhere
  }

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div className='title'>
        <div className={st.drawerHeader}> </div>
        <h1 className='bold'>Dashboard</h1>{' '}
        <div className='acct-title'>
          <h2 className='blue-bold'>Accounts</h2>{' '}
          <Link
            style={{ color: '#E85556' }}
            aria-describedby={id}
            variant='contained'
            color='primary'
            onClick={handleClick}
            className='button'
          >
            <span className='linkAccount'>Link Account</span>
          </Link>
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
                alt=''
              />
            </Typography>
          </Popover>
        </div>
        {props.user?.accounts?.map((account) => (
          <Card className={st.root}>
            {/* DONT TOUCH REPLACE, MAKES PIC HIGH RES  */}
            <img
              className='icon'
              src={account?.profile_img?.replace('_normal', '')}
              alt='Profile'
            />
            <Typography variant='h3' className={st.name}>
              {account.name}
            </Typography>
            <Typography variant='h4' className={st.handle}>
              <span className='dashCenter'>
                <TwitterIcon className='dashIcon' id='twitter' />
                <span>{account.screen_name}</span>
              </span>
            </Typography>

            <Box display={'flex'} className={st.boxCtr}>
              <Typography className={st.secondaryTitle}>
                <span className='dashCenter'>
                  <LocationOnIcon className='dashIcon' id='location' />
                  {account.location}
                </span>
              </Typography>
            </Box>
            <Box display={'flex'} className={st.boxCtr}>
              <Box flex={'auto'} className='headers'>
                <p className={st.secondaryTitle}>Posts</p>
                <p className={st.statLabel}>{account.total_post}</p>
              </Box>
              <Box flex={'auto'} className='headers'>
                <p className={st.secondaryTitle}>Following</p>
                <p className={st.statLabel}>{account.total_following}</p>
              </Box>
              <Box flex={'auto'} className='headers'>
                <p className={st.secondaryTitle}>Followers</p>
                <p className={st.statLabel}>{account.total_followers}</p>
              </Box>
            </Box>
          </Card>
        ))}
      </div>
    </div>
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

export default connect(mapStateToProps, { currentUser, fetchAccounts })(
  Dashboard_Account
);
