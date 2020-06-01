import React, { useEffect, memo } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CircularProgress, Typography } from "@material-ui/core";

import { authorizeTwitterCallback } from "../../actions/userActions";

const queryString = require("query-string");

const container = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const Callback = () => {
  const { authService } = useOktaAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log("TwitterConnectCallback useEffect fired", Date.now());
    const { oauth_token, oauth_verifier } = queryString.parse(location.search);
    dispatch(
      authorizeTwitterCallback(
        authService,
        history,
        oauth_token,
        oauth_verifier
      )
    );
  }, []);

  return (
    <div style={container}>
      <Typography variant="h6">Redirecting you back to SoMe</Typography>
      <br />
      <CircularProgress />
    </div>
  );
};

export default memo(Callback);
