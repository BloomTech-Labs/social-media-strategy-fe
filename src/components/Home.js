import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
// Components
import Dashboard from './dashboard/Dashboardv2';
import Nav from './Nav';
import DrawerMenu from './DrawerMenu';

const Home = () => {
    const { authService, authState } = useOktaAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    // update user info in redux store
    // if user hasn't linked any social media account redirect to /link-accounts
    // else render dashboard (or another) component

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
        <Nav toggleMenu={toggleMenu} />
        <div style={{position: 'relative'}}>
            
            <DrawerMenu open={menuOpen} toggleMenu={toggleMenu} />
            {/* { userHasLinkedAccounts ?  */}
            <main>
                <Dashboard />
            </main>
            {/* //: */}
            {/* <Redirect to='/link-accounts'/> } */}
        </div>
        </>
    )
}

export default Home;
