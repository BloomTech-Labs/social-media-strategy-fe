import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { useLocation, useHistory } from 'react-router';
import {
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles(theme => ({
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

const MenuList = () => {
    const classes = useStyles();
    const location = useLocation();
    const { push } = useHistory();
    const { authService } = useOktaAuth();
    
    const [currentPath, setCurrentPath] = useState('');
    
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const logout = async () => {
        authService.logout("/");
    };

    return (
        <>
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
        </>
    )
}

export default MenuList;
