import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWords } from "../../actions/popwordsActions";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as AnalyzingPic} from "../../assets/imgs/analyzingFollowers.svg";


const useStyles = makeStyles({
  root: {
    width: 700,
    margin: "1%",
    // marginTop: "0!important",
    padding: "4% 5.5%",
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    fontFamily: "Roboto Condensed",
    fontWeight: "Bold",
    lineHeight: "100%",
  },
});

export default function Loading() {
  const classes = useStyles();
  const popWords = useSelector(state => state.popWords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popWords.success === false && popWords.loading === true) {
      console.log("no data yet");
      const interval = setInterval(() => {
        console.log('Interval triggered');
        dispatch(getWords());
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [popWords.success]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
      <Card className={classes.root}>
        <div>
          <CardContent>
            <Typography className={classes.title} style={{ color: "#C772FF" }}>
              Analyzing
            </Typography>
            <Typography className={classes.title} style={{ color: "#6A4DE0" }}>
              Your followers...
            </Typography>
            <br />
            <Typography style={{fontSize:'14pt'}}>Check back soon!</Typography>
            <Typography>Average wait time ~10 minutes</Typography>
          </CardContent>
        </div>
        <div>
           <AnalyzingPic style={{width: '200px', height:"200px"}}/>
        </div>
      </Card>
    </div>
  );
}
