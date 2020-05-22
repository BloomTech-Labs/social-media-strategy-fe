import React from 'react';
import Nav from './Nav';
import DrawerMenu from './DrawerMenu';

const NavMenu = () => {
    return (
        <>
            <Nav toggleMenu={toggleMenu} />
            <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />
        </>
    )
}

export default NavMenu
