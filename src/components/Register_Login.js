import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { useStyles } from "../sass/StyledRegister_login";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { login, registerUser } from "../actions";
import { useHistory } from "react-router";

const Register_Login = (props) => {
  const { register, handleSubmit, control } = useForm();
  const [signup, setsignup] = useState(false);
  const classes = useStyles();
  const { push } = useHistory();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          SoMe{" "}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const onSubmit = (data) => {
    if (!signup) {
      props.login(data, push, props.locationCheck);

      console.log(new Date());
    } else {
      props.registerUser(data, push, props.locationCheck);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      {!signup ? (
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      ) : (
        <Grid item xs={false} sm={4} md={7} className={classes.image2} />
      )}

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
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <div>
            {console.log(signup)}
            <Typography
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "36px",
                lineHight: "44px",
              }}
              component="h1"
              variant="h5"
            >
              {!signup ? "Login to SoMe" : "Sign Up to SoMe"} <br />
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "#E85556",
                }}
              >
                {!signup ? "Sign into your account" : "Create Account"} <br />
              </span>
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                ref={register}
                name="email"
                as={TextField}
                control={control}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                type="text"
                autoFocus
              />
              <Controller
                variant="outlined"
                margin="normal"
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
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                className={classes.submit}
              >
                {!signup ? "Sign In" : "Create Account"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => setsignup(!signup)}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>{" "}
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { login, registerUser })(
  Register_Login
);
