import React, { useState } from 'react';
import { Timeline, Follow, Mention, Tweet } from 'react-twitter-widgets';
import { useSelector } from 'react-redux';

export const TWITTER_TWEETS = (props) => {
  console.log(props, 'PROPS');
  return (
    <Tweet
      tweetId={`${props.twit.id_str}`}
      options={{
        theme: 'dark',
      }}
      onLoad={() => console.log('Timeline is loaded!')}
    />
  );
};

export const TWITTER_MENTIONS = () => {
  const current_user = useSelector((state) => state.user);
  const [search, setsearch] = useState({ name: '', currentSearch: null });

  let screenname = current_user?.accounts?.map((e) => e.screen_name);
  console.log(search, 'SEARCH');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setsearch({ ...search, currentSearch: search.name });
        }}
      >
        <input
          type="text"
          name="name"
          value={search.name}
          onChange={(e) => {
            e.preventDefault();
            setsearch({ ...search, [e.target.name]: e.target.value });
          }}
        />
      </form>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: `${search.currentSearch}`,
        }}
        options={{
          username: `${search.currentSearch}`,
          height: '100vh',
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
          //   height: '100vh',
          theme: 'dark',
        }}
      />
    </>
  );
};
