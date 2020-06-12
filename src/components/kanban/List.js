import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
// Material-UI
import {
  Typography,
  makeStyles,
  InputBase,
  IconButton
} from "@material-ui/core";
// Icons
import TwitterIcon from "@material-ui/icons/Twitter";

import { Scrollbars } from "react-custom-scrollbars";
import { updateList } from "../../actions/listsActions";
import Post from "./Post";
import EditList from "./EditList";


const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: "transparent",
    height: "fit-content",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "290px",
    minWidth: "290px",
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#FFF",
    height: theme.kanban.list.header.height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  postsContainer: {
    overflow: "hidden",
    height: `calc(100vh - ${theme.kanban.topContainer.height} - ${theme.kanban.list.header.height} - ${theme.spacing(2)}px) !important`,
  },
  form: {
    padding: '2px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    height: 'max-content',
    backgroundColor: '#fff',
  },
  iconButton: {
    padding: 10,
  },
  twitterHandleContainer: {
    display: "flex",
    alignItems: "center",
  },
  twitterIcon: {
    color: "#2196F3",
    width: "16px",
  },
}));

const List = ({ list, user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(list?.title || "");
  const {
    listContainer,
    header,
    postsContainer,
    form,
    iconButton,
    twitterHandleContainer,
    twitterIcon
  } = useStyles();

  useEffect(() => {
    if (listTitle !== list.title) {
      setListTitle(list.title);
    }
  }, [list]);

  const handleInputText = e => {
    setListTitle(e.currentTarget.value);
  }

  const submit = e => {
    e.preventDefault();

    if (!listTitle) {
      setListTitle(list.title)
    } else if (listTitle !== list.title) {
      dispatch(updateList(list.id, { title: listTitle }));
    }
    
    setIsEditing(false);
  }

  return (
    <Draggable key={list.id} draggableId={list.id} index={list.index}>
      {(provided, snapshot) => (
        <div
          className={listContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={header} {...provided.dragHandleProps}>
            { isEditing ? 
              <EditList
                listTitle={listTitle}
                handleInputText={handleInputText} 
                submit={submit}
              />
              :
              <Typography style={{cursor: 'pointer'}} onClick={() => setIsEditing(true)} variant="h6" component="h3">
                {listTitle}
              </Typography>
            }
            <div className={twitterHandleContainer}>
              <TwitterIcon className={twitterIcon} />
              <Typography variant="caption">{`@${user.twitter_handle}`}</Typography>
            </div>
          </div>
          <Droppable
            direction="vertical"
            droppableId={String(list.id)}
            type="post"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={postsContainer}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "transparent",
                }}
              >
                <Scrollbars>
                  {list.posts?.map((post) => (
                    <Post key={post.id} post={post} index={post.index} />
                  ))}
                </Scrollbars>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(List);
