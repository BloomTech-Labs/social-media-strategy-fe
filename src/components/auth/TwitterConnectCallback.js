import React, { useEffect, memo } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CircularProgress, Typography } from "@material-ui/core";
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
  const location = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    const { oauth_token, oauth_verifier } = queryString.parse(location.search);
    axiosWithAuth(authService)
      .post("/auth/twitter/callback", {
        oauth_token,
        oauth_verifier,
      })
      .then((res) => push("/home"))
      .catch((err) => {
        console.error(err);
        push("/connect/twitter");
      });
    // eslint-disable-next-line
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
