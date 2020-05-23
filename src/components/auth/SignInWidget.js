import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import './SignInWidget.css'

const OktaSigninWidget = ({baseUrl, onSuccess}) => {
    useEffect(() => {
        const widget = new OktaSignIn({
            baseUrl
        });

        widget.renderEl({ el: '#sign-in-widget' }, onSuccess);
    }, []);
    

    return (
        <div className='widget-container'>
            <div id='sign-in-widget' />
        </div>
    );
}

export default OktaSigninWidget;
