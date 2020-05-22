import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { 
    makeStyles,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyle = makeStyles(theme => ({
    '@global': {
        '.MuiDrawer-paper': {
            top: theme.navbar.height.normal,
            [theme.breakpoints.down('xs')]: {
                top: theme.navbar.height.small
            }
        },
        '.MuiDrawer-modal': {
            zIndex: '1000 !important'
        }
    }
}));

const DrawerMenu = ({ open, toggleMenu }) => {
    const { authService } = useOktaAuth();
    const classes = useStyle();

    const logout = async () => {
        authService.logout('/');
    }

    return (
        <Drawer style={classes} open={open} onClose={toggleMenu} anchor='left' variant='temporary' >
            <div style={{flexGrow:'1'}}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Media Manager" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Queue" />
                    </ListItem>
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

export default DrawerMenu;
