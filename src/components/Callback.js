import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
const queryString = require('query-string');

const Callback = () => {
  const location = useLocation();
  const [state, setstate] = useState('');

  async function fetchdata() {
    const parse = queryString.parse(location.search);

    let user = await axiosWithAuth().get(`/users/user`);
    setstate(user.data.subject);

    let post = await axiosWithAuth().post(
      `https://post-route-feature.herokuapp.com/api/auth/${user.data.subject}/callback`,
      { parse: parse, location: location }
    );

    console.log(user.data, post, 'AXXX');
    console.log(user.data.subject, 'SHOWUPPPPP');
    console.log(location.search);
    console.log(parse, 'QUERIYSTRINGSTUFF');
  }

  useEffect(() => {
    fetchdata();
  }, [state]);

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
          <span class='label label-success'>{'statuses_count'}</span> times.
        </li>
        <li>
          You have <span class='label label-success'>{'followers_count'}</span>{' '}
          followers.
        </li>
        <li>
          You follow <span class='label label-success'>{'friends_count'}</span>{' '}
          users.
        </li>
      </ul>
    </div>
  );
};

export default Callback;
