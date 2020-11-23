import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  appBarSpacer: theme.mixins.toolbar,
}));
