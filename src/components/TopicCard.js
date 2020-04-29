import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import '../sass/topicBuckets.scss';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { deleteCard, editCard, editCardandPost } from '../actions';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from '@material-ui/core/Backdrop';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Fade, Menu, Tooltip, IconButton, Typography } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import TwitterIcon from '@material-ui/icons/Twitter';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTweetCount } from './useTweetCount';

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

// const Icons = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   padding: 0.5rem;
// `;
export const Inputtextarea = styled.textarea`
  display: flex;
  line-height: 1.44em;
  /* border: 0; */
  outline: none;
  padding: 0;
  resize: none;
  width: 83%;
  margin: 0 auto;
  height: 15vh;
  font-size: 1.8rem;
  ::placeholder {
    font-size: 1rem;
    color: gray;
  }
`;

function editModalLocation() {
  const top = 15;
  const left = 30;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const modalStyles = makeStyles((theme) => ({
  paper: {
    fontFamily: 'Montserrat, sans-serif',
    position: 'absolute',
    width: 600,
    backgroundColor: '#F5F7F8',
    borderRadius: '6px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
  },
  mHeader: {
    fontSize: '1.6rem',
  },
  mAccent: {
    lineHeight: '.1rem',
    color: '#e85556',
    fontWeight: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  actionSubmit: {
    color: '#fff',
    backgroundColor: '#E85556',
    borderRadius: '5rem',
    border: 'none',
    padding: '1rem',
    margin: '.5rem 1rem',
    width: '40%',
    fontSize: '1.2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: '50%',
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const TopicCard = (props) => {
  const classes = modalStyles();
  const [rectime, setRecTime] = useState(new Date());
  const [tweetCount, handletweetchange] = useTweetCount(280);

  const SN = localStorage.getItem('SNAME');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalStyle] = useState(editModalLocation);
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState(1);
  const [content, setcontent] = useState({
    post_text: props.card.content,
    date: props.card.date,
    screenname: SN,
  });
  const [editing, setediting] = useState(false);
  const [postnow, setPostNow] = useState(false);
  const { goBack } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [postContent, setPostContent] = useState('');
  const [dialogtoggle, setDialogToggle] = useState(false);

  let updateTrue = props?.user?.didUpdate === true;
  let screen_name = props.user.accounts.map((e) => e.screen_name);

  const inputfocus = useRef(null);

  useEffect(() => {
    if (editing || open) {
      setTimeout(() => {
        inputfocus.current.focus();
      }, 0);
    }
  }, [editing, open]);

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

  const onsubmitTwitter = (e) => {
    e.preventDefault();
    props.editCardandPost(props.card.id, content, postContent);
    setOpen(false);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    if (new Date(date) >= new Date()) {
      setSelectedDate(date);
      setcontent({ ...content, date: date });
    } else {
      return null;
    }
  };

  const togglemodal = () => {
    setOpen(!open);
    setAnchorEl(null);

    setcontent({ ...content, screenname: screen_name[0] });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  //  CURRENT PATCH FOR ISSUE -- need to adjust to be dynamic if Optimal time is a few days behind etc
  async function newRecTime(date) {
    let optTime = new Date(rectime);
    let today = new Date();
    optTime.setDate(today.getDate() + 1);
    handleDateChange(optTime);
    setcontent({ ...content, date: optTime });
  }

  function timeformat(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var x = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0' + m : m;
    var mytime = h + ':' + m + ' ' + x;
    return mytime;
  }

  var postdates = new Date(props?.card?.date);

  var dateWithouthSecond =
    // props?.card?.date?.length > 0
    postContent?.date?.length > 0
      ? postdates.getMonth() +
        1 +
        '/' +
        postdates.getDate() +
        '/' +
        postdates.getFullYear() +
        ' @ ' +
        timeformat(postdates)
      : null;

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.mHeader}>Twitter Manager</h2>
      <h3 className={classes.mAccent}>Schedule or Post Now</h3>
      <FormControl className={classes.formControl}>
        <span className='socialAccountInput'>
          <InputLabel
            shrink
            // className={classes.select}
            className='test'
            id='twitter-handle-select'
          >
            <span className='socialAccount'> Social Account </span>
          </InputLabel>
          <Select
            labelId='twitter-handle-select'
            id='select'
            value={handle}
            // defaultValue={1}
            onChange={handleHandleChange}
            className='test'
            style={{ width: '40%' }}
          >
            <MenuItem defaultValue value={1}>
              <span id='alignTextIcon'>
                @{screen_name} &nbsp;{' '}
                <TwitterIcon className='twitterIconModal' />
              </span>
            </MenuItem>
          </Select>
        </span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <nav className='item-sub-nav'>
            <NavLink
              onClick={() => {
                setPostNow(false);
                handleDateChange(new Date());
              }}
              to={`/home/schedule`}
            >
              Schedule
            </NavLink>
            <NavLink
              onClick={() =>
                setPostNow(true) & setcontent({ ...content, date: '' })
              }
              to={`/home/post-now`}
            >
              Post Now
            </NavLink>
          </nav>
          <Grid container justify='space-around' alignItems='center'>
            {!postnow ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '5%',
                  }}
                >
                  <DatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    disablePast={true}
                    label='Date'
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <TimePicker
                    margin='normal'
                    id='time-picker'
                    label='Time'
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() =>
                      new Date(rectime) > new Date()
                        ? handleDateChange(rectime)
                        : newRecTime()
                    }
                    style={{
                      borderRadius: '6px',
                      width: '205px',
                      height: '38px',
                      background: '#817BAB',
                      color: '#EBECF0',
                    }}
                  >
                    Suggest a Time
                  </button>
                  <Tooltip
                    title='proprietary optimization algorithm to maximize engagement'
                    placement='top-end'
                    aria-label='InfoIcon'
                    fontSize='small'
                    color='action'
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
              </>
            ) : null}
          </Grid>
        </MuiPickersUtilsProvider>
        <Inputtextarea
          placeholder='Customize your Twitter message here'
          type='text'
          name='post_text'
          cols='50'
          rows='10'
          maxLength='280'
          ref={inputfocus}
          onFocus={handletweetchange}
          value={content.post_text}
          onChange={(event) => handletweetchange(event, handleChange(event))}
        />
        <span
          style={
            tweetCount.chars_left < 80
              ? { color: 'red' }
              : tweetCount.chars_left < 180
              ? { color: 'orange' }
              : null
          }
          className='tweetcountmodal'
        >
          {tweetCount.chars_left}
        </span>
      </FormControl>
      {!postnow ? (
        <button
          onClick={onsubmitTwitter}
          style={{ width: '40%' }}
          className={classes.actionSubmit}
        >
          Schedule
        </button>
      ) : (
        <button
          onClick={onsubmitTwitter}
          style={{ width: '40%' }}
          className={classes.actionSubmit}
        >
          Post now
        </button>
      )}
    </div>
  );

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
            <div style={{ display: 'flex', width: '100%' }}>
              <nav
                style={{
                  fontSize: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <a
                  style={{ color: '#3282B8', textDecoration: 'none' }}
                  href={`https://twitter.com/${screen_name[0]}`}
                  alt=''
                >
                  {screen_name[0] === 'Your Handle Here' ? (
                    'No ScreenName Available'
                  ) : (
                    <>
                      <span>@{screen_name[0]}</span>
                      <span style={{ fontSize: '10px' }}>
                        &nbsp;
                        <TwitterIcon fontSize='inherit' />
                      </span>
                    </>
                  )}

                  {/* <span style={{ fontSize: '10px' }}>
                    <TwitterIcon fontSize="inherit" />
                  </span> */}
                </a>

                <span style={{ color: '#848484', fontSize: '9px' }}>
                  {postContent?.date?.length &&
                  new Date(postContent?.date) < new Date() ? (
                    <span className='posted'>Tweet Posted</span>
                  ) : postContent?.date?.length ? (
                    <span className='scheduled'>
                      {' '}
                      Scheduled: {dateWithouthSecond}{' '}
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
              {/* <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                className={classes.button}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingTop: '0',
                  paddingRight: '0',
                }}
              > */}
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
                      padding: '0',
                      paddingBottom: '12px',
                    }}
                  >
                    <CreateIcon
                      className={`${props.card.id}-create`}
                      // onClick={() => setediting(!editing)}
                      fontSize='small'
                    />
                  </IconButton>
                </span>
              )}
              {/* </IconButton> */}
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                className={classes.button}
                onClick={handleClick}
                style={{
                  padding: '0',
                  paddingBottom: '12px',
                }}
              >
                <MoreVertIcon
                  className={`${props.card.id}-edit`}
                  style={{ padding: '0rem .25rem' }}
                  // onClick={handleClick}
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
                  style={{ textDecoration: 'none', color: 'black  ' }}
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
            // onClose={handledialogtoggle}
            disableEscapeKeyDown={true}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Delete Scheduled Tweet?'}
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
            onClose={() => setOpen(false) & goBack()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>{modalBody}</Fade>
          </Modal>
          {!editing ? (
            <Typography
              style={{ overflowWrap: 'anywhere', textAlign: 'initial' }}
              variant='subtitle2'
              paragraph
            >
              {props.card.content}
            </Typography>
          ) : (
            <>
              <form
                className='edit-card'
                onSubmit={(e) => {
                  e.preventDefault();
                  props.editCard(props.card.id, content, postContent);
                  setcontent({ ...content, post_text: content.post_text });
                  setediting(!editing);
                }}
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
                  // onClick={handletweetchange}
                  value={content.post_text}
                  onChange={(event) =>
                    handletweetchange(event, handleChange(event))
                  }
                />
                {/* &nbsp;{" "} */}

                <div className='action-cont editcard-cont'>
                  <input className='actionSubmit' type='submit' />
                  <span
                    onClick={() => setediting(!editing)}
                    style={{
                      color: 'red',
                      fontSize: '1.0rem',
                      fontWeight: 'bolder',
                      padding: '0 .5rem',
                    }}
                  >
                    X
                  </span>
                  <span
                    style={
                      tweetCount.chars_left < 80
                        ? { color: 'red' }
                        : tweetCount.chars_left < 180
                        ? { color: 'orange' }
                        : null
                    }
                    className='tweetcount'
                  >
                    {tweetCount.chars_left}
                  </span>
                </div>
              </form>
            </>
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
    ...bindActionCreators({ deleteCard, editCard, editCardandPost }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicCard);
