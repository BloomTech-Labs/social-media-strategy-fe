import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
const queryString = require('query-string');

const Callback = () => {
  const location = useLocation();
  const [state, setstate] = useState('');
  const [time, setTime] = useState(4);
  const [data, setData] = useState('');

  function displayiferror() {
    let s = document.querySelector(`.redirect`);

    s.style['display'] = 'block';
  }
  async function fetchdata() {
    const parse = queryString.parse(location.search);
    try {
      let user = await axiosWithAuth().get(`/users/user`);
      setstate(user.data.subject);

      let post = await axiosWithAuth().post(
        `https://social-media-strategy.herokuapp.com/api/auth/${user.data.subject}/callback`,

        { parse: parse, location: location }
      );

      let promise = [user, post];

      let check = await Promise.allSettled(promise);
      console.log(check, 'promise check');
      setData(post.data);

      let move = setTimeout(() => {
        window.location.replace('/');
      }, 4000);
      let countdown = setInterval(timer, 1000);
      function timer() {
        if (window.location.pathname !== '/callback') {
          console.log('Interval Cleared');
          clearInterval(countdown);
        } else {
          setTime((time) => time - 1);
          console.log(window.location.pathname, 'TIME');
        }
      }
    } catch (error) {
      console.log({
        message: error.message,
        error: error.stack,
        name: error.name,
        code: error.code,
      });
    }
  }

  useEffect(() => {
    fetchdata();
    setTimeout(() => {
      displayiferror();
    }, 4500);
  }, []);

  return (
    <div>
      <h1 style={{ color: 'blue' }}>
        Testing Social Media {console.log(state, data)}
      </h1>
      <h2>success</h2>
      <p>
        Thank you,{' '}
        <strong>
          <a style={{color:'orange'}} href={`https://twitter.com/${data.twitter_screenName}`}>
            @${data.twitter_screenName}
          </a>
        </strong>
        , for authorizing SoMe an access token. We've successfully received your
        access token and confirmed it!
      </p>
      <ul>
        {/* <li>
          You have Tweeted{' '}
          <span className='label label-success'>{'statuses_count'}</span> times.
        </li> */}
        <li>
          You have currently have
          <span className='label label-success'>
            &nbsp;{data.total_followers}
          </span>{' '}
          followers.
        </li>
        {/* <li>
          You follow{' '}
          <span className='label label-success'>{'friends_count'}</span> users.
        </li> */}
      </ul>
      <h2>Redirecting you back to your SoMe profile in {time} </h2>
      <p className='redirect'>
        if countdown didn't redirect you to profile page please click{' '}
        <a style={{color:'orange'}}href='/'>here</a>
      </p>
    </div>
  );
};

export default Callback;
