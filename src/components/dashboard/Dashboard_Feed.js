import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { NavLink } from 'react-router-dom';
import {
  TWITTER_TWEETS,
  TWITTER_TIMELINE,
  TWITTER_MENTIONS,
} from '../Twitter_Tweets';

const Dashboard_Feed = (props) => {
  const [feed, setFeed] = useState([]);
  const [feedStatus, SetFeedStatus] = useState('tweets');

  // const { url } = matchPath();

  useEffect(() => {
    axiosWithAuth()
      .get(`/auth/userStream`)
      .then((res) => {
        console.log(res, 'USER STREAM');
        setFeed(res?.data?.stream_data);
      })
      .catch((err) => console.log(err.message));
  }, [props.currentUser]);
  return (
    <div>
      <nav className='feedNav'>
        <NavLink
          className='feed'
          activeClassName='feedActive'
          onClick={() => SetFeedStatus('tweets')}
          to='/home/feed/home'
        >
          Home
        </NavLink>
        <NavLink
          className='feed'
          activeClassName='feedActive'
          onClick={() => SetFeedStatus('timeline')}
          to='/home/feed/profile'
        >
          Profile
        </NavLink>
        <NavLink
          className='feed'
          activeClassName='feedActive'
          onClick={() => SetFeedStatus('mentions')}
          to='/home/feed/search'
        >
          Search
        </NavLink>
      </nav>

      {feedStatus === 'tweets' ? (
        <>
          {feed?.map((twit) => (
            <div key={twit.id + 1}>
              {console.log('INFO FOR 1 TWIT', twit)}

              <TWITTER_TWEETS key={twit.id} twit={twit} />
            </div>
          ))}
        </>
      ) : feedStatus === 'timeline' ? (
        <>
          <TWITTER_TIMELINE />
        </>
      ) : (
        <>
          <TWITTER_MENTIONS />
        </>
      )}
    </div>
  );
};

export default Dashboard_Feed;
