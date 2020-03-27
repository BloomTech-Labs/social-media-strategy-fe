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
    let ax = await axiosWithAuth().get(`/users`);

    let post = await axiosWithAuth().post(
      `https://post-route-feature.herokuapp.com/api/auth/${user.data.subject}/callback`,
      { parse: parse, location: location }
    );

    // setstate(user.data.subject);
    console.log(ax, user.data, post, 'AXXX');
    console.log(user.data.subject, 'SHOWUPPPPP');
    console.log(location.search);
    console.log(parse, 'QUERIYSTRINGSTUFF');
  }

  async function userstuff() {
    let user = await axiosWithAuth().get(
      `https://post-route-feature.herokuapp.com/api/users/user`
    );
    setstate(user.data.subject);
  }

  useEffect(() => {
    fetchdata();
    userstuff();
  }, [state]);

  return (
    <div>
      <h1 style={{ color: 'blue' }}>
        Testing Social Media {console.log(state)}
      </h1>
      <button
        onClick={async () => {
          console.log('click');

          let axioscall = await axiosWithAuth().get(
            `https://post-route-feature.herokuapp.com/api/auth/${state}/oauth`
          );
        }}
      />
    </div>
  );
};

export default Callback;
