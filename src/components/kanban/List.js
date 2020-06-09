import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Typography, makeStyles } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";

import Post from "./Post";
import CreateTweet from "./CreateTweet";

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  postsContainer: {
    overflow: "hidden",
    height: `calc(100vh - ${theme.kanban.topContainer.height} - ${theme.kanban.list.header.height} - ${theme.spacing(2)}px) !important`,
  },
}));

const List = ({ listId, list }) => {
  const { listContainer, header, postsContainer } = useStyles();
  return (
    <Draggable key={list.id} draggableId={String(list.id)} index={list.index}>
      {(provided, snapshot) => (
        <div
          className={listContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={header} {...provided.dragHandleProps}>
            <Typography variant="h6" component="h3">
              {list.title}
            </Typography>
            <CreateTweet listId={list.id} />
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

export default List;
