import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const MediaManager = ({ user }) => {
    const { authService } = useOktaAuth();

    const logout = async () => {
        authService.logout('/');
    }
    
    return (
        <>
            { user &&
            <div>
                <h4>User:</h4>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
                <hr />
                <button onClick={logout}>Logout</button>
            </div> }
        </>
    );
};

export default MediaManager;
