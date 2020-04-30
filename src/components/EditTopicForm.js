import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { useTweetCount } from "./useTweetCount";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { editCard } from '../actions';

const EditTopicForm = (props) => {
    const [tweetCount, handletweetchange] = useTweetCount(280);

    const inputfocus = useRef(null);

    useEffect(() => {
        if (props.editing) {
          setTimeout(() => {
            inputfocus.current.focus();
          }, 0);
        }
      }, [props.editing]);
    
    const handleChange = (e) => {
        e.preventDefault();
        props.setcontent({ ...props.content, [e.target.name]: e.target.value });
      };
    
    const onSubmit = (e) => {
        e.preventDefault();
                  props.editCard(props.card.id, props.content, props.postContent);
                  props.setcontent({ ...props.content, post_text: props.content.post_text });
                  props.setediting(!props.editing);
    }

    return (
        <form
                className='edit-card'
                onSubmit={onSubmit}
              >
                <TextareaAutosize
                  rowsMin={3}
                  id='textareaAuto'
                  className='edit-card-txt-area'
                  type='text'
                  name='post_text'
                  maxLength='280'
                  ref={inputfocus}
                  onFocus={handletweetchange}
                  value={props.content.post_text}
                  onChange={(event) =>
                    handletweetchange(event, handleChange(event))
                  }
                />
                <div className='action-cont editcard-cont'>
                  <input className='actionSubmit' type='submit' />
                  <span
                    onClick={() => props.setediting(!props.editing)}
                    style={{
                      color: "red",
                      fontSize: "1.0rem",
                      fontWeight: "bolder",
                      padding: "0 .5rem",
                    }}
                  >
                    X
                  </span>
                  <span
                    style={
                      tweetCount.chars_left < 80
                        ? { color: "red" }
                        : tweetCount.chars_left < 180
                        ? { color: "orange" }
                        : null
                    }
                    className='tweetcount'
                  >
                    {tweetCount.chars_left}
                  </span>
                </div>
              </form>
    )
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { editCard })(EditTopicForm);