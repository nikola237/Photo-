import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "88vw ",
    borderRadius:'10px',
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)",
    padding:'20px',
    backgroundColor:"#343a40", 
    color:'white',
    "& tbody":{
    "& .MuiTableRow-root":{
      backgroundColor:'#06060629',
      '&:nth-of-type(odd)':{
        backgroundColor:'#ffffff29',
      }
    }
    },
    "& .MuiTableCell-head":{
      color:'white',
      fontSize:'20px',
    },
    "& .MuiTableCell-body":{
      color:'white',
    },
    "& .MuiTableRow-head":{
      backgroundColor:'#343a40',  
      color:'white',
    }
  },
  pagination:{
    color:'white',
    "& .MuiSelect-icon":{
      color:'white'
    },
    "& .MuiIconButton-root.Mui-disabled":{
      color:"#7b7b7b"
    }
  }
}));
