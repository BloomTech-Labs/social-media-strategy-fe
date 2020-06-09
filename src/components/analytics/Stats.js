import React from "react";
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RepeatIcon from '@material-ui/icons/Repeat';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

const useStyles = makeStyles({
    root: {
      width: 250,
    },
    title: {
      fontSize: 14,
    },
    card: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    number: {
        fontSize:"50pt", 
        fontWeight: "bold",
        color: "#4E4E4E",
        width: "100%",
        textAlign: "center",
    }
  });

export default function Stats() {
    const classes = useStyles();
    return (
        <div style={{display: "flex", justifyContent:"space-evenly" }}>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <PersonAddIcon style={{color: "green", width: "100%"}}/>
                <Typography className={classes.number}>1.5K</Typography>
                <Typography>Followers</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <RepeatIcon style={{color: "magenta", width: "100%"}}/>
                <Typography className={classes.number}>1.8K</Typography>
                <Typography>Retweets</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <TouchAppIcon style={{color: "blue", width: "100%"}}/>
                <Typography className={classes.number}>3.6K</Typography>
                <Typography>Impressions</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                
                    <ThumbsUpDownIcon style={{color:"red", width: "100%"}}/>

                <Typography className={classes.number}>20K</Typography>
                <Typography>Engagement</Typography>
            </CardContent>
        </Card>
        </div>


    );
}