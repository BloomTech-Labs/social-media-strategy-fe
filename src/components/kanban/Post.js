import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import TwitterIcon from "@material-ui/icons/Twitter";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// Components
import ScheduleTweet from './ScheduleTweet';
import PostMenu from './PostMenu';
// Material-UI
import {
    Typography,
    makeStyles,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(3),
    backgroundColor: "#FFF",
  },
  contentContainer: {
    userSelect: "none",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderLeft: "solid 3px gray",
    minHeight: "50px",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1)
  },
  twitterHandleContainer: {
      display: 'flex',
      alignItems: 'center',
  },
  twitterIcon: {
    color: "#2196F3",
    width: "20px",
  },
  image: {
    width: "100%",
    maxHeight: "140px",
    objectFit: "cover",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: 0,
  },
}));

const Post = ({ post, index }) => {
  const { user } = useSelector((state) => state);
  const {
    container,
    contentContainer,
    header,
    twitterHandleContainer,
    twitterIcon,
    image,
    actionsContainer,
  } = useStyles();

  const [isPosted, setPosted] = useState(post.posted);

  const postToTwitter = () => {
    axiosWithAuth()
      .put(`/posts/${post.id}/postnow`)
      .then(() => setPosted(true));
  };

  return (
    <Draggable key={post.id} draggableId={post.id} index={post.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={container}
          style={{ ...provided.draggableProps.style }}
        >
          <div className={contentContainer}>
            <div className={header}>
              <div className={twitterHandleContainer}>
                  <TwitterIcon className={twitterIcon} />
                  <Typography variant='caption'>{`@${user.twitter_handle}`}</Typography>
              </div>
              { !post.posted && 
                <div>
                    <PostMenu post={post} />
                </div>
              }
            </div>
            {post.post_text}
          </div>
          {post.imageUrl && (
            <img className={image} src={post.imageUrl} alt="Post" />
          )}

          <div className={actionsContainer}>
            {!isPosted && <ScheduleTweet />}
            <Button disabled={isPosted} onClick={postToTwitter} color="primary">
              {isPosted ? "Posted" : "Post Now"}
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Post;
