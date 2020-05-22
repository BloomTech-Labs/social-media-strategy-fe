import React from 'react';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { 
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Menu
} from '@material-ui/core';
// Material-UI icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { AccountCircle } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Components
import Search from './Search';

import logo from '../assets/imgs/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    zIndex: '1100',
    [theme.breakpoints.up('xs')]: {
      height: theme.navbar.height.normal
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.navbar.height.small,
      minHeight: theme.navbar.height.small
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

const Nav = ({ toggleMenu }) => {
  const { authService } = useOktaAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const logout = async () => {
    authService.logout('/');
  }

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton onClick={() => toggleMenu()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Button>
              <img src={logo} alt="SoMe logo"/>
            </Button>
            <Search />
            <div style={{flexGrow: '1', textAlign: 'end'}}>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <AccountBoxIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                </Menu>
            </div>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Nav;
