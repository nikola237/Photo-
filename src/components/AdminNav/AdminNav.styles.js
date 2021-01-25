import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white,
    borderBottom: '3px solid black',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
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
    color: '#fff',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#000',
    },
  },

  menu: {
    flexGrow: 1,
    justifyContent: 'start',
    direction: 'left',
    cursor: 'pointer',
  },
  menuButton: {
    color: '#fff',
  },

  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: '56px',
  },
  drawerPaperClose: {
    overflowX: 'hidden',

    width: '56px',
  },

  logout: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#000',
    },
  },
}));
