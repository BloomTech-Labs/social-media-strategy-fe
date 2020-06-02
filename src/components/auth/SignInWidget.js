import React, { useEffect } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import { makeStyles } from "@material-ui/core";
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// import './SignInWidget.css';
import "./SignInWidget.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const OktaSigninWidget = ({ baseUrl, onSuccess }) => {
  const classes = useStyles();

  useEffect(() => {
    const widget = new OktaSignIn({
      baseUrl,
      features: {
        registration: true,
      },
    });

    widget.renderEl({ el: "#sign-in-widget" }, onSuccess);

    return () => {
      widget.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <div id="sign-in-widget" />
    </div>
  );
};

export default OktaSigninWidget;
