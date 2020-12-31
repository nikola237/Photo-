import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: '100vh',
    backgroundColor: '#EEEEEE',
  },
  searchContainer: {
    padding: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  content: {
    '$ .MuiListItemText-root .makeStyles-content-16 .MuiListItemText-dense': {
      textAlign: 'center',
    },
  },
}));
