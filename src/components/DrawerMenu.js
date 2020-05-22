import React from 'react';
import { useHistory } from 'react-router';
import { useOktaAuth } from '@okta/okta-react';
import { 
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

const DrawerMenu = ({ open, toggleMenu }) => {
    const { authService } = useOktaAuth();
    const { push } = useHistory();

    const logout = async () => {
        authService.logout('/');
    }

    return (
        <Drawer open={open} onClose={toggleMenu} anchor='left' variant='temporary' >
            <div style={{flexGrow:'1'}}>
                <List>
                    <ListItem button onClick={() => push('/app/media-manager')}>
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
