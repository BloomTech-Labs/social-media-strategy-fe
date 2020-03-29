import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
const queryString = require('query-string');

const Callback = () => {
  const location = useLocation();
  const [state, setstate] = useState('');
  const { push } = useHistory();
  const [time, setTime] = useState(4);

  async function fetchdata() {
    const parse = queryString.parse(location.search);
    try {
      let user = await axiosWithAuth().get(`/users/user`);
      setstate(user.data.subject);
      console.log(parse, 'QUERIYSTRINGSTUFF');

      let post = await axiosWithAuth().post(
        `https://post-route-feature.herokuapp.com/api/auth/${user.data.subject}/callback`,
        // `https://post-route-feature.herokuapp.com/api/users`,

        { parse: parse, location: location }
      );

      let promise = await [user, post];

      let check = await Promise.allSettled(promise);
      console.log(check, 'promise check');

      let move = setTimeout(() => {
        push('/');
      }, 4000);
      let countdown = setInterval(timer, 1000);
      function timer() {
        if (window.location.pathname !== '/callback') {
          console.log('Interval Cleared');
          clearInterval(countdown);
        } else {
          setTime(time => time - 1);
          console.log(window.location.pathname, 'TIME');
        }
      }
    } catch (error) {
      console.log({
        message: error.message,
        error: error.stack,
        name: error.name,
        code: error.code
      });
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'blue' }}>
        Testing Social Media {console.log(state)}
      </h1>
      <h2>success</h2>
      <p>
        Thank you, <strong>name</strong>, for authorizing SoMe an access token
        for <a href='https://twitter.com/{{ screen_name }}'>@</a>. We've
        successfully received your access token and confirmed it by retrieving
        some basic details on your behalf from the Twitter API. Yay!
      </p>
      <p>Here is what we pulled from the API on your behalf:</p>
      <ul>
        <li>
          You have Tweeted{' '}
          <span className='label label-success'>{'statuses_count'}</span> times.
        </li>
        <li>
          You have{' '}
          <span className='label label-success'>{'followers_count'}</span>{' '}
          followers.
        </li>
        <li>
          You follow{' '}
          <span className='label label-success'>{'friends_count'}</span> users.
        </li>
      </ul>
      <h2>Redirecting you back to your SoMe profile in {time} </h2>
    </div>
  );
};

export default Callback;
