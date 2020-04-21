// React and React-Router-DOM imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { Card, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

// Styling
import '../sass/dashboard.scss';

// Assets import
import data from './accounts.json'; // dummy import
import pin from '../assets/pin.svg';
import twitterimg from '../imgs/Vector.png';
import { connect } from 'react-redux';
import { currentUser, fetchAccounts } from '../actions';

// Material UI Styled Components
const dashStyles = makeStyles({
  root: {
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
    margin: '1rem 0rem',
  },
  name: {
    fontSize: '1.6rem',
    color: '#1B262C',
    fontFamily: 'Montserrat, sans-serif',
    padding: '1rem',
  },
  handle: {
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    padding: '1rem',
  },
  locationIcon: {
    height: '3vh',
  },
  secondaryTitle: {
    fontSize: '1.2rem',
    color: '#848484',
    fontFamily: 'Montserrat, sans-serif',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#848484',
    fontFamily: 'Montserrat, sans-serif',
  },
  boxCtr: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const useStyles = makeStyles((theme) => ({
  typography: {
    background: '#EAEAEA',
    padding: theme.spacing(2),
    height: '20px',
  },
}));

const Dashboard = (props) => {
  const st = dashStyles();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    props.fetchAccounts();
  },[]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

    let move = await (window.location.href = ax); // not currently used anywhere
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log(props.user[0].profile_img, "User Accounts")

  return (
    <div className="dash-app">
      <div className="title">
        <h1 className="bold">Dashboard</h1>
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
            <Typography className={classes.typography}>
              <img
                onClick={twitter}
                style={{ cursor: 'pointer' }}
                src={twitterimg}
                alt=""
              />
            </Typography>
          </Popover>
        </div>
        {props.user.map(account => (
          <Card key={data.id} className={st.root}>
            <img className='icon' src={account.profile_img} alt="Profile" />
            <Typography variant="h3" className={st.name}>
              {account.firstName}
              {account.lastName}
            </Typography>
            <Typography variant="h4" className={st.handle}>
              <img className={st.locationIcon} src={twitterimg} alt='Twitter Icon'/> {account.screen_name}
            </Typography>
            <Box display={'flex'} className={st.boxCtr}>
              <img className={st.locationIcon} src={pin} fontSize="small" alt='map pin'/>
              <Typography className={st.secondaryTitle}>
                {account.location}
              </Typography>
            </Box>
            <Box display={'flex'} className={st.boxCtr}>
              <Box flex={'auto'} className="headers">
                <p className={st.secondaryTitle}>Posts</p>
                <p className={st.statLabel}>{account.total_post}</p>
              </Box>
              <Box flex={'auto'} className="headers">
                <p className={st.secondaryTitle}>Following</p>
                <p className={st.statLabel}>{account.total_following}</p>
              </Box>
              <Box flex={'auto'} className="headers">
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
  user: state.user.accounts,
});

export default connect(mapStateToProps, { currentUser, fetchAccounts })(Dashboard);