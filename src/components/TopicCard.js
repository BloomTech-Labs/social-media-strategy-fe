import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import '../sass/topicBuckets.scss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { Fade, Menu, Tooltip, Fab, IconButton } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { useHistory, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import twitterLogo from '../imgs/Vector.png';

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

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;
export const Inputtextarea = styled.textarea`
  display: flex;
  line-height: 1.44em;
  /* border: 0; */
  outline: none;
  padding: 0;
  resize: none;
  width: 100%;
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
}));

const TopicCard = (props) => {
  const classes = modalStyles();
  const [rectime, setRecTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalStyle] = useState(editModalLocation);
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState('');
  const [content, setcontent] = useState({
    post_text: props.card.content,
    date: '',
  });
  const [editing, setediting] = useState(false);
  const [postnow, setPostNow] = useState(false);
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${props.card.id}`)
      .then((res) => {
        let optimalTime = '';
        res.data.map((e) => (optimalTime = e.optimal_time));
        console.log(res, optimalTime, 'POSTS');
        setRecTime(optimalTime);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const onsubmitScheduled = (e) => {
    e.preventDefault();
    props.editCardandPost(props.card.id, content);
    setOpen(false);
  };

  const onsubmitPostNow = (e) => {
    e.preventDefault();
    setcontent({ ...content, date: '' });
    setTimeout(() => {
      props.editCardandPost(props.card.id, content);
      setOpen(false);
    }, 200);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const togglemodal = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.mHeader}>Edit post</h2>
      <h3 className={classes.mAccent}>Draft, schedule, and post</h3>
      <FormControl className={classes.formControl}>
        <InputLabel
          shrink
          // className={classes.select}
          className="test"
          id="twitter-handle-select"
        >
          Social Account
        </InputLabel>
        <Select
          labelId="twitter-handle-select"
          id="select"
          value={handle}
          onChange={handleHandleChange}
          className="test"
          style={{ width: '40%' }}
        >
          <MenuItem value={1}>
            @{props.user.accounts.map((e) => e.screen_name)} &nbsp;{' '}
            <img src={twitterLogo} alt="" />
          </MenuItem>
        </Select>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <nav className="item-sub-nav">
            <NavLink onClick={() => setPostNow(false)} to={`/schedule`}>
              Schedule
            </NavLink>
            <NavLink onClick={() => setPostNow(true)} to={`/post-now`}>
              Post Now
            </NavLink>
          </nav>
          <Grid container justify="space-around" alignItems="center">
            {console.log(selectedDate, 'DATE FORMAT CHECK')}
            {!postnow ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '5%',
                  }}
                >
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  {/* <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              /> */}
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => setSelectedDate(rectime)}
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
                    title="DS Team Magic"
                    placement="top-end"
                    aria-label="InfoIcon"
                    fontSize="small"
                    color="action"
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
              </>
            ) : null}
          </Grid>
        </MuiPickersUtilsProvider>

        <Inputtextarea
          placeholder="Twitter Post"
          type="text"
          name="post_text"
          cols="50"
          rows="10"
          value={content.post_text}
          onChange={handleChange}
        ></Inputtextarea>
      </FormControl>
      {!postnow ? (
        <button
          onClick={onsubmitScheduled}
          style={{ width: '100%' }}
          className={classes.actionSubmit}
        >
          Schedule
        </button>
      ) : (
        <button
          onClick={onsubmitPostNow}
          style={{ width: '100%' }}
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
        >
          <BtnCont>
            <IconButton>
              {/* <DeleteIcon
                className={`delete`}
                onClick={() => props.deleteCard(props.card.id)}
              />
              <CreateIcon
                className={`${props.card.id}-create`}
                // onClick={() => props.editCard(props.card.id, content)}
                className="edit"
                onClick={() => setediting(!editing)}
              /> */}
              <MoreVertIcon
                // className={`${props.card.id}-edit`}
                // style={{ padding: '0rem .25rem' }}
                // onClick={togglemodal}
                onClick={handleClick}
              />
            </IconButton>
            <Menu
              id="post-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={handleMenuClose}
            >
              <NavLink
                style={{ textDecoration: 'none', color: 'black  ' }}
                to={`/schedule`}
              >
                <MenuItem
                  onClick={togglemodal}
                  className={`${props.card.id}-edit`}
                >
                  Edit
                </MenuItem>
              </NavLink>

              <MenuItem
                onClick={() => props.deleteCard(props.card.id)}
                className={`delete`}
              >
                Delete
              </MenuItem>
            </Menu>
          </BtnCont>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false) & push('/')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>{modalBody}</Fade>
          </Modal>
          {!editing ? (
            props.card.content
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.editCard(props.card.id, content);
                  setcontent({ ...content, post_text: content.post_text });
                  setediting(!editing);
                }}
              >
                {console.log(props.card.id, content, rectime, 'CARD ID')}
                <textarea
                  type="text"
                  name="post_text"
                  value={content.post_text}
                  onChange={handleChange}
                />
                &nbsp;{' '}
                <span
                  onClick={() => setediting(!editing)}
                  style={{ color: 'red', fontWeight: 'bolder', padding: '5px' }}
                >
                  x
                </span>
                <input type="submit" />
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
