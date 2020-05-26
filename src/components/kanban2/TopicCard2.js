import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Button from "@material-ui/core/Button";
import ActionButton2 from "./ActionButton2";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
    color: 'rgb(134,134,134)',
    fontSize: '.9rem'
  }
}));

export default function TopicCard2() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{ margin: "2%" }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            T
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="This is a Topic Card"
      />

      <CardMedia
        className={classes.media}
        image="https://images.unsplash.com/photo-1576158114254-3ba81558b87d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"
        title="Twitter Pic"
      />
      <CardContent>
        <div>

        </div>
        <div style={{display: 'flex', justifyContent:'flex-start', flexWrap: 'wrap'}}>
          <TwitterIcon style={{width: '20px', color: '#2196F3'}}/>
          <Typography style={{ color: "#2196F3", width: 'auto'}}>@user-name</Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a draft of a potential tweet.
        </Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button className={classes.button}>Schedule</Button>
        <Button className={classes.button}>Post Now</Button>
        </div>
      </CardContent>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            fontSize: ".7rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Trending in Topic:
        </Typography>
        <div style={{display: 'flex', justifyContent:'space-around'}}>
        <Typography className={classes.trendingTopics}>#hashtag</Typography>
        <Typography className={classes.trendingTopics}>@handle</Typography>
        <Typography className={classes.trendingTopics}>keyword</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ActionButton2 />
        </IconButton>
      </CardActions>
    </Card>
  );
}
