import React, { useState } from 'react';
import { Timeline, Tweet } from 'react-twitter-widgets';
import { useSelector } from 'react-redux';

export const TWITTER_TWEETS = (props) => {
  console.log(props, 'PROPS');
  return (
    <Tweet
      tweetId={`${props.twit.id_str}`}
      options={{
        theme: 'dark',
        width: '90%',
        align: 'center',
      }}
    />
  );
};

export const TWITTER_MENTIONS = () => {
  const [search, setsearch] = useState({ name: '', currentSearch: null });

  console.log(search, 'SEARCH');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setsearch({ ...search, currentSearch: search.name });
        }}
      >
        <span className='centerSearch'>
          <input
            className='searchBar'
            placeholder='@ username'
            type='text'
            name='name'
            value={search.name}
            onChange={(e) => {
              e.preventDefault();
              setsearch({ ...search, [e.target.name]: e.target.value });
            }}
          />
        </span>
      </form>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: `${search.currentSearch}`,
        }}
        options={{
          username: `${search.currentSearch}`,
          height: '100vh',

          theme: 'dark',
        }}
      />
    </div>
  );
};

export const TWITTER_TIMELINE = () => {
  const current_user = useSelector((state) => state.user);

  let screenname = current_user?.accounts?.map((e) => e.screen_name);

  return (
    <>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: `${screenname[0]}`,
        }}
        options={{
          username: `${screenname[0]}`,
          theme: 'dark',
        }}
      />
    </>
  );
};
