import React, { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    const { oauth_token, oauth_verifier } = queryString.parse(location.search);
    axiosWithAuth()
      .post("/auth/twitter/callback", {
        oauth_token,
        oauth_verifier,
      })
      .then((res) => push("/app"))
      .catch((err) => {
        console.error(err);
        push("/connect/twitter");
      });
  }, [location]);

  return (
    <div style={container}>
      <Typography variant="h6">Redirecting you back to SoMe</Typography>
      <br />
      <CircularProgress />
    </div>
  );
};

export default Callback;
