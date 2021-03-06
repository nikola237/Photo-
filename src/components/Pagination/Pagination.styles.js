import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      height: 67,
    },
    //   pagination: {
    //     height: '100px',
    //     width: '100%',
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //   },
  },
  pagination: {
    padding: '5%',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiPaginationItem-textPrimary': {
      fontSize: '20px',
      fontWeight: '700',
    },
    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      color: 'black',
      backgroundColor: '#6ac5a9',
    },
  },
}));
