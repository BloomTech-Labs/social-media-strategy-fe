import axios from 'axios';
require('dotenv').config();

const url = process.env.REACT_APP_API_URL || 'https://api.so-me.net/api/';

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
