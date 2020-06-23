import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../actions/statsActions";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RepeatIcon from "@material-ui/icons/Repeat";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    width: 200,
    margin: "1%",
    marginTop: "0!important"
  },
  title: {
    fontSize: 14
  },
  statCards: {
    display: "flex",
    justifyContent: "center",
    flex: "wrap",
    "@media (max-width: 890px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  number: {
    fontSize: "30pt",
    fontWeight: "bold",
    color: "#rgb(50,50,50)",
    width: "100%",
    textAlign: "center",
    "@media (max-width: 650px)": {
      fontSize: "25pt"
    }
  },
  stat: {
    width: "100%",
    textAlign: "center",
    fontSize: "14pt",
    fontWeight: "bold",
    color: "#4E4E4E"
  },
  change: {
    display: "flex",
    justifyContent: "center"
  }
});

const Stats = props => {
  const classes = useStyles();
  const stats = useSelector(state => state.stats);
  const dispatch = useDispatch();
  var numeral = require("numeral");

  useEffect(() => {
    if (!stats.num_followers) {
      console.log("loading stats");
      (() => {
        dispatch(getData());
      })();
    }
    // eslint-disable-next-line
  }, [stats]);

  return (
    <>
      <div className={classes.statCards}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.root}>
            <CardContent className={classes.card}>
              <PersonAddIcon style={{ color: "limegreen", width: "100%" }} />
              <Typography className={classes.number}>
                {numeral(stats.num_followers).format("0 a")}
              </Typography>
              <Typography className={classes.stat}>Followers</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.card}>
              <RepeatIcon style={{ color: "royalblue", width: "100%" }} />
              <Typography className={classes.number}>
                {numeral(stats.num_retweets).format("0 a")}
              </Typography>
              <Typography className={classes.stat}>Retweets</Typography>
            </CardContent>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.root}>
            <CardContent className={classes.card}>
              <FavoriteIcon style={{ color: "red", width: "100%" }} />
              <Typography className={classes.number}>
                {numeral(stats.num_favorites).format("0 a")}
              </Typography>
              <Typography className={classes.stat}>Likes</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.card}>
              <ThumbsUpDownIcon
                style={{ color: "blueviolet", width: "100%" }}
              />
              <Typography className={classes.number}>
                {numeral(stats.engagement_ratio).format("0.00%")}
              </Typography>
              <Typography className={classes.stat}>Engagement</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Stats;
