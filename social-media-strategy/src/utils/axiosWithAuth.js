import axios from 'axios';

const url = 'placeholder';

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
};