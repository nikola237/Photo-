import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: '100vh',
    flexDirection: 'column',
  },
  tabs: {
    width: '45%',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',

      '& .MuiButtonBase-root': {
        flex: '0 0 35%',
      },
    },
    '& .MuiTab-wrapper': {
      zIndex: '1',
      fontSize: '14px',
      fontWeight: '700',
    },

    '& .PrivateTabIndicator-root-17': {
      height: '26px',
      backgroundColor: 'orange',

      // border:"13px solid #f68e1f"
    },
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
