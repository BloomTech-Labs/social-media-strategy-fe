import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React, { Component } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: '20%',
        fontWeight: 'bold'
      },
    },
  }));

export default function AddTopicButton() {
  const classes = useStyles();
    return (
      <div className={classes.root} style={{display: 'flex', justifyContent:'center'}}>
        <Button variant="contained" color="secondary">
          Add Topic
        </Button>
      </div>
    );
  }
