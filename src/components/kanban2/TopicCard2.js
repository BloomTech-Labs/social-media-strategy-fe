import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Popover from '@material-ui/core/Popover';
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";

import ScheduleTweet from './ScheduleTweet';
import CreateTweet from './CreateTweet';
import Tweet from "./Tweet.js";

import { Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 420,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "grey",
  },
  button: {
    color: "#2196F3",
  },
  trendingTopics: {
    color: "rgb(134,134,134)",
    fontSize: ".9rem",
  },
}));

export default function TopicCard2(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(e.stopPropagation());
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card className={classes.root} style={{ margin: "2%" }}>
      <CardHeader
        action={
          <IconButton
            aria-describedby={id}
            aria-label="settings"
            onClick={handleClick}
          >
            <MoreVertIcon />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.typography}>
                <Button>Edit</Button>
                <br/>
                <Button>Delete</Button>
              </Typography>
            </Popover>
          </IconButton>
        }
        title={props.topic.title}
      />

      <CardContent style={{ padding: "0!important" }}>
        <Droppable droppableId={props.topic.id}>
          {(provided) => (
            <span innerRef={provided.innerRef} {...provided.droppableProps}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <TwitterIcon style={{ width: "20px", color: "#2196F3" }} />
                <Typography style={{ color: "#2196F3", width: "auto" }}>
                  @user-name
                </Typography>
              </div>

              <Typography variant="body2" color="textSecondary" component="p">
                {props.tweets.map((tweet, index) => (
                  <Tweet key={tweet.id} tweet={tweet} index={index} />
                ))}
              </Typography>

              <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1576158114254-3ba81558b87d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"
                title="Twitter Pic"
              />
              {provided.placeholder}
            </span>
          )}
        </Droppable>
      </CardContent>

      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ScheduleTweet/>
          <Button className={classes.button}>Post Now</Button>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CreateTweet />
        </IconButton>
      </CardActions>
    </Card>
  );
}
