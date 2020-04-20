import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

export const dashStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
    margin: '1rem 0rem',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0.2,
    fontFamily: 'Montserrat, sans-serif',
    // overflowY: auto,
  },
  drawerPaper: {
    width: drawerWidth,
    marginLeft: '12%',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '13%',
      background: 'red',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '18%',
      background: 'red',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20%',
      background: 'red',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuIcon: {
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  name: {
    fontSize: '1.6rem',
    color: '#1B262C',
    fontFamily: 'Montserrat, sans-serif',
    padding: '1rem',
  },
  handle: {
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    padding: '1rem',
  },
  locationIcon: {
    height: '3vh',
  },
  secondaryTitle: {
    fontSize: '1.2rem',
    color: '#848484',
    fontFamily: 'Montserrat, sans-serif',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#848484',
    fontFamily: 'Montserrat, sans-serif',
  },
  boxCtr: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typography: {
    background: '#EAEAEA',
    padding: theme.spacing(2),
    height: '20px',
  },
}));
