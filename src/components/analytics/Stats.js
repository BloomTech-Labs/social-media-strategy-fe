import React from "react";
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RepeatIcon from '@material-ui/icons/Repeat';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
        fontSize:"55pt", 
        fontWeight: "bold",
        color: "#rgb(50,50,50)",
        width: "100%",
        textAlign: "center",
    },
    stat: {
        width: "100%",
        textAlign: "center",
        fontSize: "14pt",
        fontWeight: "bold",
        color: "#4E4E4E",
    },
    change: {
        display: "flex",
        justifyContent: "center",
    }
  });

export default function Stats() {
    const classes = useStyles();
    return (
        <div style={{display: "flex", justifyContent:"space-evenly" }}>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <PersonAddIcon style={{color: "limegreen", width: "100%"}}/>
                <Typography className={classes.number}>1.5K</Typography>
                <Typography className={classes.stat}>Followers</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <RepeatIcon style={{color: "royalblue", width: "100%"}}/>
                <Typography className={classes.number}>1.8K</Typography>
                <Typography className={classes.stat}>Retweets</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                <FavoriteIcon style={{color: "red", width: "100%"}}/>
                <Typography className={classes.number}>3.6K</Typography>
                <Typography className={classes.stat}>Favorites</Typography>
            </CardContent>
        </Card>
        <Card className={classes.root}>
            <CardContent className={classes.card}>
                
                    <ThumbsUpDownIcon style={{color:"blueviolet", width: "100%"}}/>

                <Typography className={classes.number}>360%</Typography>
                <Typography className={classes.stat}>Engagement</Typography>
            </CardContent>
        </Card>
        </div>


    );
}