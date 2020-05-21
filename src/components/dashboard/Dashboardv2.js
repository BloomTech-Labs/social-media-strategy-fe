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

    return (
        <>
            { user &&
            <div>
                <h4>User:</h4>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
                <hr />
            </div> }
        </>
    );
};

export default Dashboardv2;
