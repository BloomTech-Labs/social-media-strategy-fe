import React from "react";
import { useHistory } from "react-router-dom";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
// Material-UI icons
import MenuIcon from "@material-ui/icons/Menu";
// Components
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
// Img
import logo from "../../assets/imgs/somelogo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "grid",
    zIndex: "1100",
    [theme.breakpoints.up("xs")]: {
      height: theme.navbar.height.normal,
    },
    [theme.breakpoints.down("xs")]: {
      height: theme.navbar.height.small,
      minHeight: theme.navbar.height.small,
    },
  },
  logo: {
    height: "30px",
    [theme.breakpoints.down("xs")]: {
      height: "20px",
    },
  },
}));

const Nav = ({ toggleMenu }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {toggleMenu && (
            <IconButton
              onClick={() => toggleMenu()}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Button onClick={() => history.push("/home")}>
            <img className={classes.logo} src={logo} alt="SoMe logo" />
          </Button>
          {toggleMenu && <Search />}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
