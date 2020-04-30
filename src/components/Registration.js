import React from 'react';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import { connect } from 'react-redux';
import { useStyles } from '../sass/StyledRegister_login';
import * as yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { registerUser } from '../actions';
import { useHistory } from 'react-router';

const Registration = props => {
  const LoginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(4)
  });
  const { register, handleSubmit, control, errors } = useForm({
    validationSchema: LoginSchema
  });
  const classes = useStyles();
  const { push } = useHistory();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link data-cy="register-copyright" color="inherit" to="/team">
          SoMe{' '}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const onSubmit = data => {
    props.registerUser(data, push);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image2}
        data-cy="registerImage"
      />
      <Grid
        className={classes.test}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar data-cy="register-logo" className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <div>
            <Typography
              style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '36px',
                lineHight: '44px'
              }}
              component="h1"
              variant="h5"
            >
              Sign Up to SoMe
              <br />
              <span
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '22px',
                  color: '#E85556'
                }}
              >
                Create Account
                <br />
              </span>
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                data-cy="email"
                ref={register}
                name="email"
                as={TextField}
                control={control}
                variant="outlined"
                margin="normal"
                required
                inputProps={{ minLength: '4', required: true }}
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                type="email"
                autoFocus
              />
              <ErrorMessage errors={errors} name="email" />
              <Controller
                data-cy="password"
                variant="outlined"
                margin="normal"
                inputProps={{ minLength: '4', required: true }}
                ref={register}
                as={TextField}
                control={control}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                data-cy="submit"
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    data-cy="register-to-login"
                    className="registerButton"
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                    to="/login"
                  >
                    Already have an account? Sign In here.
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>{' '}
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { registerUser })(Registration);
