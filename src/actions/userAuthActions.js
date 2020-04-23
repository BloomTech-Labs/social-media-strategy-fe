import { axiosWithAuth } from '../utils/axiosWithAuth';
import Axios from 'axios';
import CONSTANTS from './constants';
import { v4 as uuidv4 } from 'uuid';

export const login = (userData, cb) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });

  Axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login` ||
      'https://social-media-strategy.herokuapp.com/api/auth/login',
    userData
  )
    .then((response) => {
      dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });
      localStorage.setItem('token', response.data.token);
      cb('/');
    })
    .catch((error) => {
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
    });
};

export const registerUser = (userData, cb) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });
  Axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register` ||
      'https://social-media-strategy.herokuapp.com/api/auth/register',
    userData
  )
    .then(async (response) => {
      dispatch({ type: CONSTANTS.USER_APICALL_SUCCESS });
      localStorage.setItem('token', response.data.token);
      cb('/');
      let res = await axiosWithAuth().get(`/users/user`);

      console.log(res.data.subject);
      await axiosWithAuth().post(`/topics/${res.data.subject}/user`, {
        id: `topic-${uuidv4()} topic-0`,
        title: 'Drafts',
        user_id: res.data.subject,
        index: 0,
        cards: [
          {
            id: `card-${0}`,
            content:
              'This is an example of a post that you could draft. Feel free to express yourself!',
          },
        ],
      });
    })
    .catch((error) => {
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
      console.log('Error', error);
    });
};

export const currentUser = (cb) => (dispatch) => {
  dispatch({ type: CONSTANTS.USER_APICALL_START });

  axiosWithAuth()
    .get(`/users/user`)
    .then((response) => {
      localStorage.setItem('CUSER', response.data.subject);

      dispatch({
        type: CONSTANTS.USER_APICALL_SUCCESS,
        currentUser: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response.status, 'ERRORSTATUS');
      dispatch({ type: CONSTANTS.USER_APICALL_FAILURE, payload: error.data });
      if (error.response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        cb('/login');
      }
    });
};

export const fetchAccounts = () => (dispatch) => {
  dispatch({ type: CONSTANTS.ACCOUNTS_FETCH_START });
  axiosWithAuth()
    .get('/auth/userinfo')
    .then((response) => {
      dispatch({
        type: CONSTANTS.ACCOUNTS_FETCH_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({ type: CONSTANTS.ACCOUNTS_FETCH_FAILURE, payload: error.data });
    });
};

export const drawerOpen = (payload) => (dispatch) => {
  dispatch({ type: CONSTANTS.DRAWER_OPEN, payload: payload });
  // post changes to the back end
};

export const drawerswitch = () => (dispatch) => {
  dispatch({ type: CONSTANTS.DRAWER_SWITCH });
  // post changes to the back end
};
