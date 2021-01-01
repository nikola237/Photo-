import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    backgroundColor: '#EEEEEE',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  tabs: {
    color: theme.palette.primary.main,
    indicatorColor: theme.palette.secondary.dark,
  },
  content: {
    flex: 1,
    padding: theme.spacing(7),
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
  },
  tableWrapper: {
    margin: '1% auto',
    fontSize: '20px',
  },
}));
