import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: '100vh',
    backgroundColor: '#EEEEEE',
  },
  offset: theme.mixins.toolbar,

  searchContainer: {
    paddingTop: theme.spacing(8),
    width: '100%',
    display: 'flex',
    textAlign: 'center',
  },
  radioBtn: {
    paddingBottom: 22,
  },
  tabs: {
    color: theme.palette.primary.main,
    indicatorColor: theme.palette.secondary.dark,
  },
  pagination: {
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    bottom: 0,
    justifyContent: 'center',
    height: 62,
    backgroundColor: '#EEEEEE',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));
