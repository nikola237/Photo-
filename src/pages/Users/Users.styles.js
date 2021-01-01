import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
<<<<<<< HEAD
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
=======
    background:'white'
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
  },
  tableWrapper:{
    margin:"1% auto",
    fontSize:'20px'
  },
  tabs:{

    "& .MuiTab-textColorPrimary":{
      margin:"10px",
    "&.Mui-selected":{
      color:'white',
      backgroundColor:'#343a40',
      padding:'20px',
      borderRadius:'8px',
      fontWeight:600,
      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)",
    }
    }
  }
}));
