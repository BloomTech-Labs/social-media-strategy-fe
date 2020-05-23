import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SignInWidget from './SignInWidget';
import { Redirect } from 'react-router-dom';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import loginImg from '../../assets/imgs/login.png';

const useStyles = makeStyles({
    imageContainer: {
        overflow: 'hidden',
        maxHeight: '100vh'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
    }
});

const LoginOkta = ({ baseUrl }) => {
    const { authService, authState } = useOktaAuth();
    const classes = useStyles();

    const onSuccess = async res => {
        authService.login('/app');
        authService.redirect({
            sessionToken: res.session.token
        });
    };

    if(authState.isPending) { 
        return <div>Loading...</div>;
    }
    
    return ( authState.isAuthenticated ?
        <Redirect to='/app' />
        :
        <Grid container wrap='nowrap'>
            <Grid item xs>
                <SignInWidget baseUrl={baseUrl} onSuccess={onSuccess} />
            </Grid>
            <Hidden xsDown>
                <Grid item xs={5} className={classes.imageContainer}>
                    <img className={classes.image} src={loginImg} alt="Login"/>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default LoginOkta;