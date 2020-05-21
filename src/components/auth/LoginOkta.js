import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SignInWidget from './SignInWidget';
import { Redirect } from 'react-router-dom';

const LoginOkta = ({ baseUrl }) => {
    const { authService, authState } = useOktaAuth();

    const onSuccess = async res => {
        authService.login('/home');
        authService.redirect({
            sessionToken: res.session.token
        });
    };

    if(authState.isPending) { 
        return <div>Loading...</div>;
    }
    
    return ( authState.isAuthenticated ?
        <Redirect to='/home' />
        :
        <div style={{display: 'flex'}}>
            <img src={require("../../assets/imgs/login.png")} alt="Login" style={{width: '50%', height:'100%', objectFit: 'cover', objectPosition: 'center'}}/>
            
            <SignInWidget baseUrl={baseUrl} onSuccess={onSuccess} />
        </div> 
    );
};

export default LoginOkta;