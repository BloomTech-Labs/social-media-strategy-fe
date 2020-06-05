import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useOktaAuth } from "@okta/okta-react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  makeStyles,
} from "@material-ui/core";
import clsx from 'clsx';
// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from "@material-ui/icons/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    position: 'fixed',
    width: theme.navbar.width.close,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000
  },
  drawerOpen: {
    width: theme.navbar.width.open,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.navbar.width.close,
    overflow: 'hidden',
  },
  icon: {
    color: theme.palette.primary.light
  },
  selectedIcon: {
    color: theme.palette.primary.dark
  },
  logoutIcon: {
    color: theme.palette.primary.main
  }
}));

const SideNav = () => {
  const location = useLocation();
  const { push } = useHistory();
  const { authService } = useOktaAuth();

  const [currentPath, setCurrentPath] = useState('');
  const [open, setOpen] = useState(false);
  
  const classes = useStyles();
  
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const logout = async () => {
    authService.logout("/");
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      
        <List aria-label="Menu">
          <ListItem button onClick={() => push("/home")}>
            <ListItemIcon>
              <DashboardIcon className={currentPath.includes('/home') ? classes.selectedIcon : classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Media Manager" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button onClick={() => push('/connect/twitter')}>
            <ListItemIcon>
              <AccountBoxIcon className={currentPath.includes('/connect') ? classes.selectedIcon : classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.logoutIcon} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      
    </Drawer>
  );
};

export default SideNav;
