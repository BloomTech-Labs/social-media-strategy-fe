import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
const queryString = require("query-string");

const Callback = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    const { oauth_token, oauth_verifier } = queryString.parse(location.search);
    axiosWithAuth()
      .post(`${process.env.REACT_APP_API_URL}/auth/twitter/callback`, {
        oauth_token,
        oauth_verifier,
      })
      .then(({ data }) => push('/app'))
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
