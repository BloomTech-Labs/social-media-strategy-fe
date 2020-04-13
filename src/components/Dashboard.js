// React and React-Router-DOM imports
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Material UI imports
import { Card, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";

// import AddAccount from "./AddAccount";

// Styling
import "../sass/dashboard.scss";

// Assets import
import data from "./accounts.json";
import img from "../assets/headshot.jpg";
import pin from "../assets/pin.svg";
import twitterimg from "../imgs/Vector.png";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { currentUser } from "../actions";

// Set dummy Acct Data
const accountData = data.accounts;

// Material UI Styled Components
const dashStyles = makeStyles({
  root: {
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center",
    margin: "1rem 0rem",
  },
  name: {
    fontSize: "1.6rem",
    color: "#1B262C",
    fontFamily: "Montserrat, sans-serif",
    padding: "1rem",
  },
  handle: {
    fontSize: "1.2rem",
    fontFamily: "Montserrat, sans-serif",
    padding: "1rem",
  },
  locationIcon: {
    height: "3vh",
  },
  secondaryTitle: {
    fontSize: "1.2rem",
    color: "#848484",
    fontFamily: "Montserrat, sans-serif",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#848484",
    fontFamily: "Montserrat, sans-serif",
  },
  boxCtr: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
const useStyles = makeStyles((theme) => ({
  typography: {
    background: "#EAEAEA",
    padding: theme.spacing(2),
    height: "20px",
  },
}));

const Dashboard = (props) => {
  const st = dashStyles();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function twittercheck() {
    props.currentUser();
  }

  async function twitter() {
    if (!localStorage.getItem("token")) {
      window.alert(
        "No token, please hit log in button and login/signup, Thank you"
      );
    } else {
      let ax = await (
        await fetch(
          ` https://social-media-strategy.herokuapp.com/api/auth/${props.user.currentUser.subject}/oauth`,
          {
            method: "GET",
            redirect: "follow",
            headers: {
              accept: "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
      ).json();

      console.log(ax);
      let move = await (window.location.href = ax);
    }
  }

  useEffect(() => {
    twittercheck();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="dash-app">
      <div className="title">
        <h1 className="bold">Dashboard</h1>
        <div className="dash-title">
          <h4 className="highlight">Tuesday</h4>{" "}
          <h4 className="highlight"> • </h4>
          <h4 className="date"> 16 March, 2020</h4>
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
            {console.log(props.user)}
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
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
          >
            <Typography className={classes.typography}>
              <img
                onClick={twitter}
                style={{ cursor: "pointer" }}
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
            <Box display={"flex"} className={st.boxCtr}>
              <img className={st.locationIcon} src={pin} fontSize="small" />
              <Typography className={st.secondaryTitle}>
                {e.location}
              </Typography>
            </Box>
            <Box display={"flex"} className={st.boxCtr}>
              <Box flex={"auto"} className="headers">
                <p className={st.secondaryTitle}>Posts</p>
                <p className={st.statLabel}>{e.posts}</p>
              </Box>
              <Box flex={"auto"} className="headers">
                <p className={st.secondaryTitle}>Following</p>
                <p className={st.statLabel}>{e.following}</p>
              </Box>
              <Box flex={"auto"} className="headers">
                <p className={st.secondaryTitle}>Followers</p>
                <p className={st.statLabel}>{e.followers}</p>
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

export default connect(mapStateToProps, { currentUser })(Dashboard);
