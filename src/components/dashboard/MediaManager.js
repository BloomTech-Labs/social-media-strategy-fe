import React from 'react';
import TopicNav from '../kanban/TopicNav';
import CreateTopic from '../kanban2/CreateTweet';
import TopicBucket2 from '../kanban2/TopicBucket2';
import { Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.navbar.height.small})`
        },
        [theme.breakpoints.up('xs')]: {
            height: `calc(100vh - ${theme.navbar.height.normal})`
        },
        position: 'relative'
    },
    content: {
        height: '100%',
        flexDirection: 'column'
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        margin: theme.spacing(3)
    },
    topics: {
        flexGrow: '1'
    }
}));

const MediaManager = ({ user }) => {
    const { header, container, content, topics } = useStyles();

    return (
        <Grid className={container} container alignContent='center'>
            <Grid item xs={12} className={content}>
                <Typography className={header} variant='h4' component='h1' color='textSecondary'>Media Manager</Typography>
                <CreateTopic />
                <Grid container item className={topics}>
                    <TopicBucket2 />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MediaManager;
