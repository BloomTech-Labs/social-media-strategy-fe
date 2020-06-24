import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatus } from "../../actions/popwordsActions";
import { Card } from "@material-ui/core";
import { makeStyles, Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import Scrollbars from "react-custom-scrollbars";

const useStyles = makeStyles({
  root: {
    width: 700,
    height: 350,
    margin: "1%",
    marginTop: "0!important",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 890px)": {
      maxWidth: "600px",
    },
    "@media (max-width: 700px)": {
      maxWidth: "390px",
    },
  },
  title: {
    fontSize: 40,
    fontFamily: "Roboto Condensed",
    fontWeight: "Bold",
    lineHeight: "100%",
  },
  words: {
    fontSize: 18,
    "@media (max-width: 890px)": {
      fontSize: 14,
    },
    // "@media (max-width: 700px)": {
    //   fontSize: 9,
    // },
  },
});

export default function Success({ handleAnalysisUpdate }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { topics, processing, queued } = useSelector((state) => state.popWords);
  const { twitter_handle } = useSelector((state) => state.user);
  const colors = ["blue", "green", "red", "purple", "black"];

  useEffect(() => {
    if (processing || queued) {
      const interval = setInterval(async () => {
        await dispatch(getStatus(twitter_handle));
      }, 20000);
      return () => clearInterval(interval);
    } else {
    }
  }, [processing, queued, dispatch, twitter_handle]);

  return (
    topics.length > 0 && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "700px",
        }}
        className={classes.root}
      >
        <Card
          className={classes.root}
          style={{ maxHeight: 300, overflowY: "auto" }}
        >
          <Scrollbars>
            <div style={{ padding: "0 5%" }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    className={classes.title}
                    style={{ color: "#00BB78" }}
                  >
                    Success!
                  </Typography>
                  {(processing || queued) && (
                    <Typography variant="caption">
                      Status:{" "}
                      {processing ? "Processing update" : queued && "Queued"}
                    </Typography>
                  )}
                </div>
                <Typography
                  style={{
                    color: "#4E4E4E",
                    fontSize: "14!important",
                    fontWeight: "bolder",
                  }}
                >
                  Here are the most popular words your followers are engaging
                  with
                </Typography>
                <Typography
                  style={{ color: "#4E4E4E", fontSize: "12!important" }}
                >
                  Grouped by topic
                </Typography>
              </CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {topics.map((topic, topicIndex) => (
                  <CardContent key={topicIndex}>
                    {topic.map((word, index) => (
                      <Typography
                        className={classes.words}
                        style={{ color: colors[topicIndex] }}
                        key={index}
                      >
                        {" "}
                        {word}{" "}
                      </Typography>
                    ))}
                  </CardContent>
                ))}
              </div>
            </div>
          </Scrollbars>
        </Card>
        <div style={{ textAlign: "right", marginBottom: "8px" }}>
          <Button onClick={handleAnalysisUpdate}>
            Request analysis update
            <RefreshIcon />
          </Button>
        </div>
      </div>
    )
  );
}
