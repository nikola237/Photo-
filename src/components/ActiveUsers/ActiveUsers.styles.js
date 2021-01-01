import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  // table: {
  //   minWidth: 650,
  // },
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
  buttonCreate:{
    "&.MuiButton-textPrimary":{
      background: '#343a40',
      color:'white',
      borderRadius:"9px",
      width:'fit-content',
      padding:'15px ',
      margin:"10px 0",
      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)",
      "&:hover":{
        backgroundColor:'#343a40de'
      }
    }
  },
  dialog:{
    "& .MuiDialog-paperWidthSm":{
      backgroundColor:'white',
      background: " white",
      borderRadius:'8px',
      "& .MuiDialogContent-root":{
        padding:'30px'
      },
      "& .MuiFormControl-fullWidth":{
        padding:'15px'
      },
      "& .MuiFormLabel-root":{
      },
      "& .MuiDialogTitle-root":{
       background:"#595b5d",
       padding:'20px',
       borderBottom:'1px solid #949494',
       "& .MuiTypography-h6":{
         textAlign:'center',
         fontSize:'23px',
         color:'white',
         fontWeight:700
       },
     

      
      },
      "& .MuiButton-root":{
        border:'1px solid grey',
        borderRadius:"9px",
        padding:'10px'
      }
    }
  }
}));
