import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import EditList from "./EditList";
import { updateList } from "../../actions/listsActions";
import { makeStyles, Typography } from "@material-ui/core";
// Icons
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles(theme => ({
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: "#FFF",
    minHeight: theme.kanban.list.header.height,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  twitterHandleContainer: {
    display: "flex",
    alignItems: "center"
  },
  twitterIcon: {
    color: "#2196F3",
    width: "16px"
  },
  cursorGrab: {
    cursor: "grab"
  },
  cursorPointer: {
    cursor: "pointer"
  }
}));

const ListHeader = props => {
  const { list, dragHandleProps, user } = props;

  const {
    header,
    twitterHandleContainer,
    twitterIcon,
    cursorGrab,
    cursorPointer
  } = useStyles();

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(list?.title || "");

  useEffect(() => {
    if (listTitle !== list.title) {
      setListTitle(list.title);
    }
    // eslint-disable-next-line
  }, [list]); // it does not work if listTitle is added to depencencies array

  const handleInputText = e => {
    setListTitle(e.currentTarget.value);
  };

  const submit = e => {
    e.preventDefault();

    if (!listTitle && listTitle === "Drafts") {
      setListTitle(list.title);
    } else if (listTitle !== list.title) {
      dispatch(updateList(list.id, { title: listTitle }));
    }
    setIsEditing(false);
  };

  return (
    <div className={header} {...dragHandleProps}>
      {isEditing ? (
        <EditList
          listTitle={listTitle}
          list={list}
          handleInputText={handleInputText}
          submit={submit}
        />
      ) : (
        <Typography
          className={listTitle === "Drafts" ? cursorGrab : cursorPointer}
          onClick={listTitle !== "Drafts" ? () => setIsEditing(true) : null}
          variant="h6"
          component="h3"
        >
          {listTitle}
        </Typography>
      )}
      <div className={twitterHandleContainer}>
        <TwitterIcon className={twitterIcon} />
        <Typography variant="caption">{`@${user.twitter_handle}`}</Typography>
      </div>
    </div>
  );
};

export default ListHeader;
