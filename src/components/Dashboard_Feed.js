import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { NavLink, matchPath } from 'react-router-dom';
import {
  TWITTER_TWEETS,
  TWITTER_TIMELINE,
  TWITTER_MENTIONS,
} from './Twitter_Tweets';
import PrivateRoute from '../utils/PrivateRoute';

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
      <nav className="item-sub-nav">
        <NavLink onClick={() => SetFeedStatus('tweets')} to={`feed/home`}>
          Home
        </NavLink>
        <NavLink onClick={() => SetFeedStatus('timeline')} to={`feed/profile`}>
          Profile
        </NavLink>
        <NavLink onClick={() => SetFeedStatus('mentions')} to={`feed/mentions`}>
          Mentions
        </NavLink>
      </nav>

      {feedStatus === 'tweets' ? (
        <>
          {feed?.map((twit) => (
            <div>
              {console.log('INFO FOR 1 TWIT', twit)}

              <TWITTER_TWEETS twit={twit} />
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
