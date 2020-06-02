import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useTweetCount } from '../../hooks/useTweetCount';
import '../../sass/topicBuckets.scss';

import { twitterPostnow } from '../../actions';

const TweetNow = (props) => {
  const { handleSubmit, register } = useForm();
  const [tweetCount, handletweetchange] = useTweetCount(280);

  const onSubmit = (values) => {
    values.id = String(Date.now());
    console.log(values);
    twitterPostnow(props.user.subject, values);
    props.close();
  };
  return (
    // <>
    <div className='tweet-now-cont'>
      <span className='lineHeight'>
        <h2 className='postNowHeader'>Tweet your audience</h2>
        <h3 className='postNowPrompt'>Skip the Queue</h3>
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className='postNowInputs'>
          {/* <TextareaAutosize
            className='text-area'
            maxLength='280'
            rowsMin={3}
            type='text'
            name='post_text'
            onChange={handletweetchange}
            ref={register}
          /> */}
          <span
            style={
              tweetCount.chars_left < 80
                ? { color: 'red' }
                : tweetCount.chars_left < 180
                ? { color: 'orange' }
                : null
            }
            className='tweetcountmodalPostNoW'
          >
            {tweetCount.chars_left}
          </span>

          <Button
            style={{ backgroundColor: '#E85556', marginTop: '0' }}
            className='actionSubmit'
            type='submit'
          >
            Post
          </Button>
        </span>
      </form>
    </div>
    // </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps, { twitterPostnow })(TweetNow);
