import React from "react";
import { useSelector } from "react-redux";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 700,
    margin: "1%",
    marginTop: "0!important",
    padding: "0 5%",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 40,
    fontFamily: "Roboto Condensed",
    fontWeight: "Bold",
    lineHeight: "100%",
  },
});

export default function Success() {
  const classes = useStyles();
  const popWords = useSelector((state) => state.popWords.success.topics);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
      <Card
        className={classes.root}
        style={{ maxHeight: 300, overflowY: "auto" }}
      >
        <div>
          <CardContent>
            <Typography className={classes.title} style={{ color: "#00BB78" }}>
              Success!
            </Typography>
            <Typography
              style={{
                color: "#4E4E4E",
                fontSize: "14!important",
                fontWeight: "bolder",
              }}
            >
              Here are the most popular words your followers are engaging with
            </Typography>
            <Typography style={{ color: "#4E4E4E", fontSize: "12!important" }}>
              Grouped by topic
            </Typography>
          </CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>

            </CardContent>
            <CardContent >
              {arr.map((item) => (
                <Typography style={{color: 'blue'}}> Testing </Typography>
              ))}
              
            </CardContent>
            <CardContent>
              {arr.map((item) => (
                <Typography style={{color: 'green'}}> Testing </Typography>
              ))}
            </CardContent>
            <CardContent>
              {arr.map((item) => (
                <Typography style={{color: 'red'}}> Testing </Typography>
              ))}
            </CardContent>
            <CardContent>
              {arr.map((item) => (
                <Typography style={{color: 'purple'}}> Testing </Typography>
              ))}
            </CardContent>
            <CardContent>
              {arr.map((item) => (
                <Typography> Testing </Typography>
              ))}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
