import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    border: '3px solid #6ac5a9',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    padding: '.4% 0',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  searchIcon: {
    height: '100%',
    position: 'absolute',
    top: '50%',
    left: '2%',
    transform: 'translate(0%,-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    fontSize: '20px',
    padding: '2% 3%',
    width: '100%',

    // [theme.breakpoints.up('sm')]: {
    //   width: '45ch',
    //   '&:focus': {
    //     width: '40ch',
    //   },
    // },
  },
}));
