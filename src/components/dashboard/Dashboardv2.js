import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Dashboardv2 = () => {
    const { authService, authState } = useOktaAuth();
    const [user, setUser] = useState();
    console.log('authState', authState);

    useEffect(() => {
        (async () => {
            const res = await authService.getUser();
            setUser(res);
        })();
    }, [authService]);

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

export default Dashboardv2;
