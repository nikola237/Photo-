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

  menu: {
    flexGrow: 1,
    justifyContent: 'start',
    direction: 'left',
    cursor: 'pointer',
  },
}));
