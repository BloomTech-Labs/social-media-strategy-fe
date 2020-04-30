import React, { useEffect, useState } from 'react';
import '../sass/callback.scss';
import { useLocation } from 'react-router-dom';
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
        `${process.env.REACT_APP_API_URL}/auth/${user.data.subject}/callback`,

        { parse: parse, location: location }
      );

      let promise = [user, post];

      await Promise.allSettled(promise);
      setData(post.data);

      setTimeout(() => {
        window.location.replace('/home');
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
    setTimeout(() => {
      displayiferror();
    }, 4500);
  }, []);

  return (
    <div className="callback-cont">
      <div className="callback-box">
        <h1 className="callback-header">
          SoMe Connection {console.log(state, data)}
        </h1>
        <h2 className="success">Success</h2>
        <p className="callback-para">
          Thank you,{' '}
          <strong>
            <a
              className="highlight"
              href={`https://twitter.com/${data.twitter_screenName}`}
            >
              @{data.twitter_screenName}
            </a>
          </strong>
          , for authorizing SoMe an access token. We've successfully received
          your access token and confirmed it!
        </p>

        {/* <li>
          You have Tweeted{' '}
          <span className='label label-success'>{'statuses_count'}</span> times.
        </li> */}
        <p className="callback-bold">
          You currently have
          <span className="label label-success">
            &nbsp;{data.total_followers}
          </span>{' '}
          followers.
        </p>
        {/* <li>
          You follow{' '}
          <span className='label label-success'>{'friends_count'}</span> users.
        </li> */}
        <h2>Redirecting you back to your SoMe profile in {time} </h2>
        <p className="redirect">
          If countdown didn't redirect you to profile page please click {''}
          <a className="highlight" href="/home">
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Callback;
