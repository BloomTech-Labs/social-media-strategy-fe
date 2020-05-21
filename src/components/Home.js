import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
// Components
import Dashboard from './dashboard/Dashboardv2';

const Home = () => {
    const { authService, authState } = useOktaAuth();
    // update user info in redux store
    // if user hasn't linked any social media account redirect to /link-accounts
    // else render dashboard (or another) component

    return (
        // userHasLinkedAccounts ? 
        <Dashboard />
        // :
        // <Redirect to='/link-accounts'/>
    )
}

export default Home;
