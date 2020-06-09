import React from "react";
import { useHistory } from "react-router-dom";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
// Material-UI icons
import MenuIcon from "@material-ui/icons/Menu";
// Img
import logo from "../../assets/imgs/Logo-dark.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "grid",
    zIndex: "1100",
    height: theme.navbar.height
  },
  navbar: {
    backgroundColor: '#FFF'
  },
  logo: {
    height: "20px"
  }
}));

const TopNav = ({ toggleMenu }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <IconButton
            onClick={() => toggleMenu()}
            edge="start"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={() => history.push("/home")}>
            <img className={classes.logo} src={logo} alt="SoMe logo" />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNav;
