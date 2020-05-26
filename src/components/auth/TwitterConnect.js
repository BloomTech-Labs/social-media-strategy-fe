import React from "react";

function TwitterConnect(props) {
  const oktaToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  console.log(oktaToken);

  async function authorizeTwitter() {
    let ax = await (
      await fetch(`${process.env.REACT_APP_API_URL}/auth/twitter/authorize`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${oktaToken.accessToken.accessToken}`,
        },
      })
    ).json();

    await (window.location.href = ax);
  }

  return (
    <div>
      <h1>TwitterConnect</h1>
      <button onClick={authorizeTwitter}>Authorize Twitter</button>
    </div>
  );
}

export default TwitterConnect;
