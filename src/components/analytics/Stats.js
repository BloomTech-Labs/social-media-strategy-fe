import React from "react";
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      width: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function Stats() {
    const classes = useStyles();
    return (
        <div style={{display: "flex", justifyContent:"space-evenly" }}>
        <Card className={classes.root}>
            <CardContent>
                <Typography>Followers</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography>Retweets</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography>Impressions</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent>
                <Typography>Engagements</Typography>
            </CardContent>
        </Card>
        </div>


    );
}