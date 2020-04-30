import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "../sass/topicBuckets.scss";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import { deleteCard, editCardandPost } from "../actions";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";

import CardModal from "./CardModal";
import EditTopicForm from './EditTopicForm';

import { Fade, Menu, IconButton, Typography } from "@material-ui/core";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Button from "@material-ui/core/Button";

import "date-fns";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  margin: 0.5rem;
  width: 80%;
  text-align: center;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const modalStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: "Montserrat, sans-serif",
    position: "absolute",
    width: 600,
    backgroundColor: "#F5F7F8",
    borderRadius: "6px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "inherit",
  },
  mHeader: {
    fontSize: "1.6rem",
  },
  mAccent: {
    lineHeight: ".1rem",
    color: "#e85556",
    fontWeight: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  actionSubmit: {
    color: "#fff",
    backgroundColor: "#E85556",
    borderRadius: "5rem",
    border: "none",
    padding: "1rem",
    margin: ".5rem 1rem",
    width: "40%",
    fontSize: "1.2rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    width: "50%",
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

// MODAL ON CLOSE UPDATE TO
//  onClose={() =>
//               setOpen(false) &
//               goBack() &
//               setSelectedDate(new Date()) &
//               setcontent({ ...content, date: '' })
//             }

const TopicCard = (props) => {
  const classes = modalStyles();
  const [rectime, setRecTime] = useState(new Date());

  const SN = localStorage.getItem("SNAME");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [content, setcontent] = useState({
    post_text: props.card.content,
    date: props.card.date,
    screenname: SN,
  });
  const [editing, setediting] = useState(false);
  const { goBack } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [postContent, setPostContent] = useState("");
  const [dialogtoggle, setDialogToggle] = useState(false);

  let updateTrue = props?.user?.didUpdate === true;
  let screen_name = props.user.accounts.map((e) => e.screen_name);

  const handledialogtoggle = () => {
    setDialogToggle(!dialogtoggle);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${props.card.id}`)

      .then((res) => {
        res.data.map((e) => setPostContent(e) & setRecTime(e.optimal_time));
      })
      .catch((err) => console.log(err.message));
  }, [
    updateTrue,
    props.user.currentUser,
    props.user.accounts,
    props.card.date,
    props.card.id,
    open,
  ]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const togglemodal = () => {
    setOpen(!open);
    setAnchorEl(null);

    setcontent({ ...content, screenname: screen_name[0] });
  };

  function timeformat(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var x = h >= 12 ? "pm" : "am";
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? "0" + m : m;
    var mytime = h + ":" + m + " " + x;
    return mytime;
  }

  var postdates = new Date(props?.card?.date);

  var dateWithouthSecond =
    postContent?.date?.length > 0
      ? postdates.getMonth() +
        1 +
        "/" +
        postdates.getDate() +
        "/" +
        postdates.getFullYear() +
        " @ " +
        timeformat(postdates)
      : null;
  console.log(content, 'WHAT ARE YOU');

  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => (
        <Container
          className={`${props.className}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id='cardhover'
        >
          <BtnCont>
            <div style={{ display: "flex", width: "100%" }}>
              <nav
                style={{
                  fontSize: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <a
                  style={{ color: "#3282B8", textDecoration: "none" }}
                  href={`https://twitter.com/${screen_name[0]}`}
                  alt=''
                >
                  {screen_name[0] === "Your Handle Here" ? (
                    "No ScreenName Available"
                  ) : (
                    <>
                      <span>@{screen_name[0]}</span>
                      <span style={{ fontSize: "10px" }}>
                        &nbsp;
                        <TwitterIcon fontSize='inherit' />
                      </span>
                    </>
                  )}
                </a>

                <span style={{ color: "#848484", fontSize: "9px" }}>
                  {postContent?.date?.length &&
                  new Date(postContent?.date) < new Date() ? (
                    <span className='posted'>Tweet Posted</span>
                  ) : postContent?.date?.length ? (
                    <span className='scheduled'>
                      {" "}
                      Scheduled: {dateWithouthSecond}{" "}
                    </span>
                  ) : postContent?.date === null ? (
                    <span className='notScheduled'>Post not Scheduled</span>
                  ) : (
                    <span className='posted'>Tweet Posted</span>
                  )}
                </span>
              </nav>
            </div>

            <span className='editIcons'>
              {postContent?.date?.length &&
              new Date(postContent?.date) < new Date() ? null : postContent
                  ?.date?.length ? null : (
                <span className='showHover'>
                  <IconButton
                    disableRipple={true}
                    disableFocusRipple={true}
                    className={classes.button}
                    onClick={(event) => setediting(!editing)}
                    style={{
                      padding: "0",
                      paddingBottom: "12px",
                    }}
                  >
                    <CreateIcon
                      className={`${props.card.id}-create`}
                      fontSize='small'
                    />
                  </IconButton>
                </span>
              )}
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                className={classes.button}
                onClick={handleClick}
                style={{
                  padding: "0",
                  paddingBottom: "12px",
                }}
              >
                <MoreVertIcon
                  className={`${props.card.id}-edit`}
                  style={{ padding: "0rem .25rem" }}
                  fontSize='small'
                />
              </IconButton>
            </span>

            <Menu
              id='post-menu'
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={handleMenuClose}
            >
              {postContent?.date === null ? (
                <NavLink
                  style={{ textDecoration: "none", color: "black  " }}
                  to={`/home/schedule`}
                >
                  <MenuItem
                    onClick={togglemodal}
                    className={`${props.card.id}-edit`}
                  >
                    Post
                  </MenuItem>
                </NavLink>
              ) : null}

              <MenuItem
                onClick={() => {
                  if (
                    postContent?.date?.length &&
                    new Date(postContent?.date) > new Date()
                  ) {
                    return handledialogtoggle();
                  } else {
                    return props.deleteCard(props.card.id);
                  }
                }}
                className={`delete`}
              >
                Delete
              </MenuItem>
            </Menu>
          </BtnCont>

          <Dialog
            open={dialogtoggle}
            disableEscapeKeyDown={true}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {"Delete Scheduled Tweet?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Deleting a scheduled Tweet will remove it from your scheduled
                queue. Are you sure you want to do delete post? (Cannot be
                undone.)
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handledialogtoggle} color='primary'>
                No
              </Button>
              <Button
                onClick={() => {
                  props.deleteCard(props.card.id);
                  return handledialogtoggle();
                }}
                color='primary'
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            onClose={() =>
              setOpen(false) &
              goBack() &
              setSelectedDate(new Date()) &
              setcontent({ ...content, date: '' })
            }
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <CardModal
                card={props.card}
                open={open}
                setOpen={setOpen}
                editing={editing}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                rectime={rectime}
                setRecTime={setRecTime}
              />
            </Fade>
          </Modal>
          {!editing ? (
            <Typography
              style={{ overflowWrap: "anywhere", textAlign: "initial" }}
              variant='subtitle2'
              paragraph
            >
              {props.card.content}
            </Typography>
          ) : (
            <EditTopicForm
              card={props.card} 
              content={content} 
              setcontent={setcontent}
              postContent={postContent}
              editing={editing}
              setediting={setediting}
            />
          )}
        </Container>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  topics: state.topics,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ deleteCard, editCardandPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicCard);