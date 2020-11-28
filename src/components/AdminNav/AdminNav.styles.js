import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  offset: theme.mixins.toolbar,
  user: {
    marginRight: theme.spacing(2),
  },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  // },
  menu: {
    flexGrow: 1,
    justifyContent: 'start',
    direction: 'left',
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9),
    // },
  },
}));

// appBar: {
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
// },
// appBarShift: {
//   marginLeft: drawerWidth,
//   width: `calc(100% - ${drawerWidth}px)`,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
// },
// // menuButton: {
// //   marginRight: 36,
// // },
// menuButtonHidden: {
//   display: 'none',
// },
// offset: theme.mixins.toolbar,
// user: {
//   marginRight: theme.spacing(2),
// },
// toolbar: {
//   paddingRight: 24, // keep right padding when drawer closed
// },
// menu: {
//   flexGrow: 1,
//   justifyContent: 'start',
//   direction: 'left',
// },
// drawerPaper: {
//   position: 'fixed',
//   whiteSpace: 'nowrap',
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
// },
// drawerPaperClose: {
//   overflowX: 'hidden',
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   width: theme.spacing(7),
//   [theme.breakpoints.up('sm')]: {
//     width: theme.spacing(9),
//   },
// },
