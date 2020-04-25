import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { twitterPostnow } from '../actions';

const TweetNow = (props) => {
  const { handleSubmit, register } = useForm();
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
          <TextareaAutosize
            className='text-area'
            rowsMin={3}
            type='text'
            name='post_text'
            ref={register}
          />
          <Button className='actionSubmit' type='submit'>
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
