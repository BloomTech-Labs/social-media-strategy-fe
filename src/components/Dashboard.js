// React and React-Router-DOM imports
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Material UI imports
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core";
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

const Dashboard = () => {
  const st = dashStyles();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentuser, setCurrentuser] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function twittercheck() {
    let user = await axiosWithAuth().get(`/users/user`);
    console.log(user.data.subject);
    setCurrentuser(user.data.subject);
  }

  async function twitter() {
    if (!localStorage.getItem("token")) {
      window.alert(
        "No token, please hit log in button and login/signup, Thank you"
      );
    } else {
      let ax = await (
        await fetch(
          ` https://social-media-strategy.herokuapp.com/api/auth/${currentuser}/oauth`,
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
          {/* <Link className="button" to={{
        pathname:'/add-acct',
        state: {modal: true },
        }}>Add Account</Link> */}
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
export default Dashboard;

{
  /* <div className="dash-app">
      <div className="title">
      <h1 className="bold">Dashboard</h1>
      <div className="dash-title">
      <h4 className="highlight">Tuesday</h4> <h4 className="highlight"> • </h4><h4> 16 March, 2020</h4>
      </div>
      <div className="acct-title">
      <h2 className="blue-bold">Accounts</h2>
      <Link className="button" to={{
        pathname:'/add-acct',
        state: {modal: true },
        }}>Add Account</Link>
      </div>
        {accountData.map(e => (
      <div key={data.id} className="acct-card">
        <img className='icon' src={img} alt='Profile'/>
        <h3>{e.firstName}{e.lastName}</h3>
        <h5>{e.twitterHandle}</h5>
        <div className="location">
          <img 
            className="location-img"
            src={pin}/>
          <h4>{e.location}</h4>
        </div>
                <div className="all-stats">
                <div className="headers">
                    <h5>Posts</h5>
                    <h6>{e.posts}</h6>
                </div>
                <div className="headers">
                    <h5>Following</h5>
                    <h6>{e.following}</h6>
                </div>
                <div className="headers">
                    <h5>Followers</h5>
                    <h6>{e.followers}</h6>
                </div>
                </div>
          </div>
          ))}
        </div>
      </div> */
}

// return (
//     <div className="columns is-multiline dash-app">
//     <h1 className="column is-full">Dashboard</h1>
//     <div className="columns dashboard-title">
//     <h4 className="column is-narrow highlight">Tuesday</h4> <h4 className="column is-narrow highlight"> ▪ </h4><h4 className="column"> 16 March, 2020</h4>
//     </div>
//     <div className="columns is-centered is-vcentered">
//     <h2 className="column is-half">Accounts</h2>
//     <Link className="column is-half" to={{
//       pathname:'/add-acct',
//       state: {modal: true },
//     }}>Add Account</Link>
//     </div>
//       {accountData.map(e => (
//     <div key={data.id} className="columns is-multiline is-centered acct-card">
//       <div className="columns is-multiline is-centered">
//       <img className='column is-full icon' style={{width:"20%"}} src={img} alt='Profile'/>
//       <h3 className="column is-full">{e.firstName}{e.lastName}</h3>
//       <h5 className="column is-full">{e.twitterHandle}</h5>
//       </div>
//       <div className="columns is-vcentered is-full is-centered">
//         <img
//           className="column is-half"
//           src={pin}
//           style={{width:'10%'}}/>
//         <h4 className="column is-half">{e.location}</h4>
//       </div>
//       <div className="columns is-centered is-vcentered is-full">
//       <div className="columns is-vcentered is-multiline is-centered">
//           <h5 className="column is-half">Posts</h5>
//           <h6 className="column is-half">{e.posts}</h6>
//       </div>
//       <div className="columns is-vcentered is-multiline is-centered">
//           <h5 className="column is-half">Following</h5>
//           <h6 className="column is-half">{e.following}</h6>
//       </div>
//       <div className="columns is-vcentered is-multiline is-centered">
//           <h5 className="column is-half">Followers</h5>
//           <h6 className="column is-half">{e.followers}</h6>
//       </div>
//       </div>
//         </div>
//         ))}
//     </div>
// );
