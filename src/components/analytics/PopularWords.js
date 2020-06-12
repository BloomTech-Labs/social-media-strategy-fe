import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "1%",
    marginTop: "0!important",
    padding: "2.5% 5.5%",
  },
  title: {
    fontSize: 40,
    fontFamily: "Roboto Condensed",
    fontWeight: "Bold",
    lineHeight: "100%",
  },
  button1: {
    background: "#6A4DE0",
    color: "white",
  },
  button2: {
    background: "white",
    color: "#6A4DE0",
  },
});

export default function PopularWords() {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%"}}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} style={{ color: "#4E4E4E" }}>
            Need
          </Typography>
          <Typography className={classes.title} style={{ color: "#6A4DE0" }}>
            Inspiration?
          </Typography>
            <br/>
          <Typography>
            Gain insights into the words your followers engage with most
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <Button className={classes.button1} variant="contained">
              Start Analysis
            </Button>
            <Button className={classes.button2} variant="contained">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
