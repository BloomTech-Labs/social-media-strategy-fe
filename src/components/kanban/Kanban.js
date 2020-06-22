import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles, CircularProgress } from "@material-ui/core";

import List from "./List";
import { loadListsFromDb } from "../../actions/listsActions";
import {
  dragPostToDifferentList,
  dragPostToSameList,
  dragList
} from "../../actions/kanbanActions";
import CreateList from "./CreateList";

const useStyles = makeStyles(theme => ({
  kanban: {
    display: "flex",
    width: "100%",
    height: `calc(100vh - ${theme.kanban.topContainer.height})`
  },
  loading: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const Kanban = () => {
  const { lists } = useSelector(state => state.kanban);
  const user = useSelector(state => state.user);

  const { kanban, loading } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.okta_uid) {
      if (!lists) {
        (async () => {
          dispatch(await loadListsFromDb(user.okta_uid));
        })();
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const onDragEnd = result => {
    const { source, destination, type } = result;

    if (
      !result.destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (type === "post") {
      if (source.droppableId !== destination.droppableId) {
        // if drag post to a different list/column
        dispatch(dragPostToDifferentList(lists, source, destination));
      } else {
        // if drag post to the same list/column
        dispatch(dragPostToSameList(lists, source, destination));
      }
    } else if (type === "list") {
      // if drag list
      dispatch(dragList(lists, source, destination));
    }
  };

  return lists ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="mainDroppable" type="list">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={kanban}
          >
            {Object.entries(lists)
              .sort((a, b) => a.index - b.index)
              .map(([listId, list]) => (
                <List key={list.id} list={list} user={user} />
              ))}
            {provided.placeholder}
            <CreateList />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <div className={loading}>
      <CircularProgress />
    </div>
  );
};
export default Kanban;
