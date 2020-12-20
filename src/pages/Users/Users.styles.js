import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    background:'white'
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
