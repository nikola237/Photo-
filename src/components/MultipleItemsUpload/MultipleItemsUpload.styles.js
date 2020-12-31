import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  fileContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  avatarImgMulti: {
    justifyContent: 'center',
    fontSize: 10,
  },

  content: {
    textAlign: 'center',
  },

  button: {
    justifyContent: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
  },

  box: {
    textAlign: 'right',
  },
}));
