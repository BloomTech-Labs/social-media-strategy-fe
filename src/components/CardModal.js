import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deleteCard, editCard, editCardandPost } from "../actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { Fade, Menu, Tooltip, IconButton, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { NavLink } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { useTweetCount } from "./useTweetCount";

const Inputtextarea = styled.textarea`
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

const CardModal = (props) => {
  const classes = modalStyles();
  const SN = localStorage.getItem("SNAME");
  const [modalStyle] = useState(editModalLocation);
  const [handle, setHandle] = useState(1);
  const [postnow, setPostNow] = useState(false);
  const [content, setcontent] = useState({
    post_text: props.card.content,
    date: props.card.date,
    screenname: SN,
  });
  const [rectime, setRecTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tweetCount, handletweetchange] = useTweetCount(280);
  const [postContent, setPostContent] = useState("");

  let screen_name = props.user.accounts.map((e) => e.screen_name);
  const inputfocus = useRef(null);
  let updateTrue = props?.user?.didUpdate === true;

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
    props.open,
  ]);

   useEffect(() => {
    if (props.editing || props.open) {
      setTimeout(() => {
        inputfocus.current.focus();
      }, 0);
    }
  }, [props.editing, props.open]);

  const handleChange = (e) => {
    e.preventDefault();
    setcontent({ ...content, [e.target.name]: e.target.value });
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  const handleDateChange = (date) => {
    if (new Date(date) > new Date()) {
      setSelectedDate(date);
      setcontent({ ...content, date: date });
    } else {
      return null;
    }
  };

  const onsubmitTwitter = (e) => {
    e.preventDefault();
    props.editCardandPost(props.card.id, content, postContent);
    props.setOpen(false);
  };

  //  CURRENT PATCH FOR ISSUE -- need to adjust to be dynamic if Optimal time is a few days behind etc
  async function newRecTime(date) {
    let optTime = new Date(rectime);
    let today = new Date();
    optTime.setDate(today.getDate() + 1);
    handleDateChange(optTime);
    setcontent({ ...content, date: optTime });
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.mHeader}>Twitter Manager</h2>
      <h3 className={classes.mAccent}>Schedule or Post Now</h3>
      <FormControl className={classes.formControl}>
        <span className='socialAccountInput'>
          <InputLabel
            shrink
            className='test'
            id='twitter-handle-select'
          >
            <span className='socialAccount'> Social Account </span>
          </InputLabel>
          <Select
            labelId='twitter-handle-select'
            id='select'
            value={handle}
            onChange={handleHandleChange}
            className='test'
            style={{ width: "40%" }}
          >
            <MenuItem defaultValue value={1}>
              <span id='alignTextIcon'>
                @{screen_name} &nbsp;{" "}
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
                setPostNow(true) & setcontent({ ...content, date: "" })
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
                    display: "flex",
                    flexDirection: "column",
                    margin: "5%",
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() =>
                      new Date(rectime) > new Date()
                        ? handleDateChange(rectime)
                        : newRecTime()
                    }
                    style={{
                      borderRadius: "6px",
                      width: "205px",
                      height: "38px",
                      background: "#817BAB",
                      color: "#EBECF0",
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
              ? { color: "red" }
              : tweetCount.chars_left < 180
              ? { color: "orange" }
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
          style={{ width: "40%" }}
          className={classes.actionSubmit}
        >
          Schedule
        </button>
      ) : (
        <button
          onClick={onsubmitTwitter}
          style={{ width: "40%" }}
          className={classes.actionSubmit}
        >
          Post Now
        </button>
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);

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
