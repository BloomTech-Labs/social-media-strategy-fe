import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
// Material-UI
import { 
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Menu
} from '@material-ui/core';
// Material-UI icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { AccountCircle } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ProfileMenu = () => {
    const { authService } = useOktaAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleAnchorEl = e => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        authService.logout('/');
    }

    return (
        <div style={{flexGrow: '1', textAlign: 'end'}}>
            <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAnchorEl}
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
                open={isOpen}
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
    )
}

export default ProfileMenu;
