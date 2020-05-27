import React from 'react';
import TopicNav from '../kanban/TopicNav';
import CreateTopic from '../kanban2/CreateTweet';
import TopicBucket2 from '../kanban2/TopicBucket2';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: theme.spacing(3)
    }
}));

const MediaManager = ({ user }) => {
    const {header} = useStyles();

    return (
        <>
            <Typography className={header} variant='h4' component='h1' color='textSecondary'>Media Manager</Typography>
            {/* <TopicNav /> */}
            <CreateTopic />
            <div
                style={{
                display: 'flex',
                justifyContent: 'space-around',
                height: "100%",
                overflowY: "scroll",
                height: "calc(100vh - 127px)",
                }}
            >
                <TopicBucket2 />
            </div>
        </>
    );
};

export default MediaManager;
