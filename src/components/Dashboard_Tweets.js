import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
// import Container from './TopicCard.js';

const TweetContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  margin: 0.5rem;
  width: 80%;
  text-align: center;
`;

const handleInfo = styled.div`
  display: flex;
  width: 100%;
`;
const Dashboard_Tweets = (props) => {
  const [tweets, setTweets] = useState([]);
  const userID = props.currentUser.subject;

  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${userID}/user`)
      .then((res) => {
        const completedTweets = [];

        for (let post in res?.data) {
          console.log('POST', post);
          if (res.data[post].completed) {
            completedTweets.push(res.data[post]);
          }
        }
        setTweets(orderTweets(completedTweets));
      })
      .catch((err) => console.log(err.message));
  }, [props.currentUser]);

  const orderTweets = (tweetArray) => {
    let original = tweetArray;

    original = original.filter((tweet) => {
      return tweet.date.length > 0;
    });

    console.log('ORIGINAL PRE SORT', original);
    original.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });

    return original;
  };

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetContainer>{`${tweet.post_text}`}</TweetContainer>
      ))}
    </div>
  );
};

export default Dashboard_Tweets;
