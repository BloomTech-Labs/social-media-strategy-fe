import React from "react";
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

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
      <Card className={classes.root}>
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
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
            </CardContent>
            <CardContent>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
            </CardContent>
            <CardContent>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
            </CardContent>
            <CardContent>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
            </CardContent>
            <CardContent>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
              <Typography>Testing</Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
