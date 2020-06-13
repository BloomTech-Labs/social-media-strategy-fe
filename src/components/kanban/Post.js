import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { updatePost } from "../../actions/listsActions";
// Components
import EditPostText from "./EditPostText";
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

  const dispatch = useDispatch();

  const [isPosted, setPosted] = useState(post.posted);
  const [text, setText] = useState(post.post_text || "");
  const [isEditing, setIsEditing] = useState(false);

  const postToTwitter = () => {
    axiosWithAuth()
      .put(`/posts/${post.id}/postnow`)
      .then(() => setPosted(true));
  };

  const handleInputText = e => {
    setText(e.currentTarget.value);
  }

  const submit = e => {
    e.preventDefault();

    // if input is empty set text with the previous post text value
    if (!text) {
      setText(post.post_text);
    } else if (text !== post.post_text) {
      dispatch(updatePost(post.id, { post_text: text }));
    }

    console.log('submit');
    setIsEditing(false);
  }

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
            { isEditing ? 
              <EditPostText 
                text={text}
                handleInputText={handleInputText}
                submit={submit}
              />
                :
              <>
                <Typography onClick={() => setIsEditing(true)} style={{flexGrow: '1'}}>{text} </Typography>
                <PostMenu post={post} setEditing={() => setIsEditing(true)} />
              </>
            }
            
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
