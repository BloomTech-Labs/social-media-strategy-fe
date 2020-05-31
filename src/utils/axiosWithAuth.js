import axios from "axios";

const url = process.env.REACT_APP_API_URL || "https://api.so-me.net/api/";

export const axiosWithAuth = (authService) => {
  const { accessToken } = authService.getAuthState();

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
