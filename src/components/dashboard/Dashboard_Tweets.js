import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import styled from 'styled-components';
import TwitterIcon from '@material-ui/icons/Twitter';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

// import Container from './TopicCard.js';
const TweetContainer = styled.div`
  .postText {
    padding: 2rem 0rem;
  }
`;

const useStyles = makeStyles(theme => ({
  tweetCont: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem 1rem 0',
    margin: '0.5rem auto',
    width: '80%',
    border: '2px solid #1ca1f2'
  },

  scheduled: {
    fontSize: '.75rem',
    fontWeight: '400',
    marginTop: '2.5rem',
    textAlign: 'right',
    color: '#e85556'
  },

  postText: {
    textAlign: 'center',
    fontSize: '1.4rem'
  }
}));

const Title = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: left;
  padding: 5rem 0 3rem 2.5rem;
`;

const timeformat = toFormat => {
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

const dateFormat = dateObj => {
  const date = new Date(dateObj);

  let formatted = `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()} @ ${timeformat(dateObj)}`;

  return formatted;
};

const Dashboard_Tweets = props => {
  const [tweets, setTweets] = useState([]);
  const userID = props.currentUser.subject;
  const classes = useStyles();

  const twitHandle = props.user.accounts[0].screen_name;

  let updateTrue = props.user.didUpdate === true;

  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${userID}/user`)
      .then(res => {
        const completedTweets = [];

        for (let post in res?.data) {
          if (res.data[post].completed) {
            completedTweets.push(res.data[post]);
          }
        }
        setTweets(orderTweets(completedTweets));
      })
      .catch(err => console.log(err.message));
  }, [updateTrue]);

  const orderTweets = tweetArray => {
    let original = tweetArray;

    original = original
      .filter(tweet => {
        // const compare = new Date(tweet.date);

        return tweet.date.length > 0;
      })
      .filter(tweet => {
        const compare = new Date(tweet.date);

        return compare > new Date();
      });
    console.log('ORIGINAL PRE SORT', original);
    original.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
    return original;
  };
  console.log('props from dashbaord', props);
  return (
    <div>
      {tweets.length < 1 ? (
        <Title>Your Scheduled Tweets Appear Here</Title>
      ) : (
        <Title>My Scheduled Posts</Title>
      )}
      {tweets.map(tweet => (
        <Card className={classes.tweetCont} key={Date.now() + Math.random()}>
          <CardHeader
            avatar={
              <Avatar
                className="proPic"
                src={props.user.accounts[0].profile_img}
                alt=""
              />
            }
            action={
              <TwitterIcon style={{ color: '#3282B8', 'margin-top': '1rem' }} />
            }
            title={props.user.accounts[0].name}
            subheader={
              <a
                style={{ color: '#3282B8', textDecoration: 'none' }}
                href={`https://twitter.com/${twitHandle}`}
                alt=""
              >
                <span>@{`${twitHandle}`}</span>
              </a>
            }
          />
          <CardContent>
            <div className={classes.postText}>{`${tweet.post_text}`}</div>
            <div className={classes.scheduled}>
              Scheduled: {`${dateFormat(tweet.date)}`}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   user: state.user,
// });

export default Dashboard_Tweets;
