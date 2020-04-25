import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import TwitterIcon from '@material-ui/icons/Twitter';
// import Container from './TopicCard.js';
const TweetContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  margin: 0.5rem auto;
  width: 80%;
  text-align: center;
  border: 2px solid #1ca1f2;

  .scheduled {
    color: lightgrey;
    font-size: 0.8rem;
    padding: 0.6rem 0rem;
  }

  .postText {
    padding: 2rem 0rem;
  }
`;

const HandleInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TopBar = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;

  a {
    padding: 0 1rem;
    display: flex;
    align-items: center;
  }

  .proPic {
    border-radius: 50%;
    margin-bottom: 0.5rem;
    width: 40px;
  }
`;

const Title = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 1rem 1.5rem;
`;

const timeformat = (toFormat) => {
  let date = new Date(toFormat);
  var h = date.getHours();
  var m = date.getMinutes();
  var x = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  h = h ? h : 12;
  m = m < 10 ? '0' + m : m;
  var mytime = h + ':' + m + ' ' + x;
  return mytime;
};

const dateFormat = (dateObj) => {
  const date = new Date(dateObj);

  let formatted = `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()} @ ${timeformat(dateObj)}`;

  return formatted;
};

const Dashboard_Tweets = (props) => {
  const [tweets, setTweets] = useState([]);
  const userID = props.currentUser.subject;

  const twitHandle = props.user.accounts[0].screen_name;

  console.log('CUSER', props.user.accounts[0].screen_name);

  let updateTrue = props.user.didUpdate === true;

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
  }, [updateTrue]);

  const orderTweets = (tweetArray) => {
    let original = tweetArray;

    original = original
      .filter((tweet) => {
        // const compare = new Date(tweet.date);

        return tweet.date.length > 0;
      })
      .filter((tweet) => {
        const compare = new Date(tweet.date);

        return compare > new Date();
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
      <Title>My Scheduled Posts</Title>
      {tweets.map((tweet) => (
        <TweetContainer>
          <TopBar>
            <img
              className='proPic'
              src={props.user.accounts[0].profile_img}
              alt=''
            ></img>
            <HandleInfo>
              <a
                style={{ color: '#3282B8', textDecoration: 'none' }}
                href={`https://twitter.com/${twitHandle}`}
                alt=''
              >
                <span>@{`${twitHandle}`}</span>
              </a>
            </HandleInfo>

            <div
              style={{
                color: 'dodgerblue',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TwitterIcon />
            </div>
          </TopBar>

          <div className='scheduled'>
            Scheduled: {`${dateFormat(tweet.date)}`}
          </div>
          <div className='postText'>{`${tweet.post_text}`}</div>
        </TweetContainer>
      ))}
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   user: state.user,
// });

export default Dashboard_Tweets;
