import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
// Components

import PostMenu from "./PostMenu";
// Material-UI
import { Typography, makeStyles, Button } from "@material-ui/core";

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
    display: 'flex',
    alignItems: 'flex-start'
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
  const {
    container,
    contentContainer,
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
            <Typography style={{flexGrow: '1'}}>{post.post_text} </Typography>
            <div>
              <PostMenu post={post} />
            </div>
          </div>
          {post.imageUrl && (
            <img className={image} src={post.imageUrl} alt="Post" />
          )}

          <div className={actionsContainer}>
            <Button disabled={isPosted} onClick={postToTwitter} color="primary">
              {isPosted ? "Posted" : "Post Now"}
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Post);
