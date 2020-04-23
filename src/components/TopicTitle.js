import React, { useState } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import { editTopic } from '../actions';

const TopicTitle = (props) => {
  const [content, setcontent] = useState({ name: props.topic.title });
  const [editing, setediting] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.editTopic(props.topic.id, content.name);
    setcontent({ name: content.name });
    setediting(!editing);
  };

  const renderTopicForm = () => {
    return (
      <form onSubmit={submitForm}>
        <input
          type='text'
          name='name'
          value={content.name}
          onChange={handleChange}
          defaultValue={props.topic.title}
        />
        &nbsp;{" "}
        <span onClick={() => setediting(!editing)} className='edit-toggle'>
          x
        </span>
      </form>
    );
  };

  return (
    <h4 className='title'>
      {props.topic.title !== "Drafts" ? (
        <span className='editTopics'>
          <span className='topicIcons'>
            <span className={`deleteTopic`}>
              <DeleteIcon
                style={{ "margin-right": "20" }}
                onClick={() => props.deleteTopics(props.topic.id)}
              />
            </span>
            <CreateIcon
              className={`editTopic`}
              onClick={() => setediting(!editing)}
            />
          </span>
          {!editing ? (
            <span className='topicTitle'>{props.topic.title}</span>
          ) : (
            renderTopicForm()
          )}
        </span>
      ) : (
        props.topic.title
      )}
    </h4>
  );
};

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { editTopic })(TopicTitle);