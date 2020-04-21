// React and React-Router-DOM imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

// Material UI imports
import { Card, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CropFreeIcon from "@material-ui/icons/CropFree";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Styling
import "../sass/dashboard.scss";

// Assets import
import img from "../assets/headshot.jpg";
import pin from "../assets/pin.svg";
import twitterimg from "../imgs/Vector.png";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { drawerOpen, currentUser, drawerswitch, fetchAccounts } from "../actions";
import { dashStyles } from "../sass/DashStyles";

// Set dummy Acct Data
const drawerWidth = 400;

const Dashboard = props => {
  const st = dashStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    props.fetchAccounts();
  },[]);

  const theme = useTheme();
  
  const handleDrawerClose = () => {
    props.drawerswitch();
  };

  const handleClick = event => {
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
          method: "GET",
          redirect: "follow",
          headers: {
            accept: "application/json",
            Authorization: localStorage.getItem("token")
          }
        }
      )
    ).json();

    let move = await (window.location.href = ax); // not currently used anywhere
  }

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
  
    <div className="dash-app">
      <div className="title">

        <div className={st.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
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
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left"
            }}
          >
            <Typography className={st.typography}>
              <img
                onClick={twitter}
                style={{ cursor: "pointer" }}
                src={twitterimg}
                alt=""
              />
            </Typography>
          </Popover>
        </div>

        {props.user.map(account => (
          <Card className={st.root}>
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
            <Box display={"flex"} className={st.boxCtr}>
              <Box flex={"auto"} className="headers">
                <p className={st.secondaryTitle}>Posts</p>
                <p className={st.statLabel}>{account.total_post}</p>
              </Box>
              <Box flex={"auto"} className="headers">
                <p className={st.secondaryTitle}>Following</p>
                <p className={st.statLabel}>{account.total_following}</p>
              </Box>
              <Box flex={"auto"} className="headers">
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
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ currentUser, drawerswitch, drawerOpen }, dispatch)
  };
}


export default connect(mapStateToProps, { currentUser, fetchAccounts })(Dashboard);