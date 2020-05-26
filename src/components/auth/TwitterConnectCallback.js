import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
const queryString = require("query-string");

const Callback = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  useEffect(() => {
    const { oauth_token, oauth_verifier } = queryString.parse(location.search);
    axiosWithAuth()
      .post(`${process.env.REACT_APP_API_URL}/auth/twitter/callback`, {
        oauth_token,
        oauth_verifier,
      })
      .then(({ data }) => setMessage(data.message))
      .catch((err) => {
        console.error({
          message: err.message,
          error: err.stack,
          name: err.name,
          code: err.code,
        });
      });
  }, [location]);

  return (
    <div>
      <h1>TwitterConnectCallback</h1>
      {message && <span>{message}</span>}
    </div>
  );
};

export default Callback;
