import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { twitterPost } from '../actions';

const TweetNow = (props) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    values.id = String(Date.now());
    console.log(values);
    twitterPost(props.user.subject, values);
  };
  return (
    <>
      <h2 id='transition-modal-title'>Twitter Manager</h2>
      <h3>Post Now</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' name='post_text' ref={register} />
        <button type='submit'>Tweet Now</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps, { twitterPost })(TweetNow);
