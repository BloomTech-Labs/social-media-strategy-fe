import axios from "axios";

const url = process.env.REACT_APP_API_URL || "https://api.so-me.net/api/";

export const axiosWithAuth = () => {
  const oktaToken = JSON.parse(localStorage.getItem("okta-token-storage"));
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${oktaToken.accessToken.value}`,
    },
  });
};
