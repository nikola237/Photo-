import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 60,
    paddingRight: 60,
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  offset: theme.mixins.toolbar,

  searchContainer: {
    // paddingTop: theme.spacing(8),
    width: '100%',
    display: 'flex',
  },
  radioBtn: {
    paddingBottom: 22,
  },
  tabs: {
    color: theme.palette.primary.dark,
    indicatorColor: '#f78e1f',
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 1,
    fontWeight: 600,
    fontSize: 16,
  },

  tabBackground: {
    position: 'absolute',
    top: '11%',
    right: '7%',
    height: '2%',
    width: '42%',
    backgroundColor: '#f78e1f  ',
  },

  pagination: {
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing(4),
    height: 381,
  },
  // footer: {
  //   bottom: 0,
  //   justifyContent: 'center',
  //   height: 62,
  //   backgroundColor: '#EEEEEE',
  // },
  // form: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   margin: 'auto',
  //   width: 'fit-content',
  // },
  // formControl: {
  //   marginTop: theme.spacing(2),
  //   minWidth: 120,
  // },
  // formControlLabel: {
  //   marginTop: theme.spacing(1),
  // },
  // filter: {
  //   marginTop: theme.spacing(4),
  //   marginBottom: theme.spacing(4),
  // },
}));
