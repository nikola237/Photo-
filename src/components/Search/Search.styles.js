import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.25),
    },
    // marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
  },
  // root: {
  //   '& .MuiInputBase-root': {
  //     width: '92%',
  //   },
  // },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputInput: {
    // padding: theme.spacing(1, 1, 1, 1),
    // // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px + 1em)`,
    // transition: theme.transitions.create('width'),
    // width: '92%',
    // '& .MuiInputBase-root': {
    //   width: '92%',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   width: '25ch',
    //   '&:focus': {
    //     width: '40ch',
    //   },
    // },
  },
}));
