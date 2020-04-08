import axios from 'axios';
// require('dotenv').config();

const url = 'https://social-media-strategy.herokuapp.com/api/';

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
};
