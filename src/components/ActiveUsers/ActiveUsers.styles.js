import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  addUser: {
    color: theme.palette.secondary.dark,
    cursor: 'pointer',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '17px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1 0 auto',
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
    // height: 62,
  },
}));
