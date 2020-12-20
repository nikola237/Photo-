import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
  container: { 
    padding:'1%',
    width:'calc(100% - 56px)',
    backgroundColor: 'white',
    height: 'initial',
    minHeight: '100vh',
    marginLeft:'56px' , 
    borderRadius: '6px'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    color:'#fff'
  },
  picker: {
    width: 'max-content',
    backgroundColor: '#343a40',
    WebkitBoxShadow: '5px 5px 15px 5px rgba(0,0,0,0.66)',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.66)',
    borderRadius: '6px',
    padding:"0 15px",
    marginBottom:'10px',
    height:'100px',
    color:'#fff',
    "& label": {
      color: "#fff"
    },
    "& span": {
      color: "#fff"
    },
    "& input": {
      color: "#fff"
    },
    "& :before": {
      borderBottom: "1px solid #fff"
    }
  },
  buttons:{
    height:'100px'
  },
  
  typeButton: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: "0 20px",
    WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)", 
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)",
    borderRadius: "6px",
    marginLeft: "1%",
    flex: "1 1 10%",
    cursor: "pointer",
    transition: "all ease-in .3s",
      "&:hover": {
        opacity:"0.9",
        transform: "scale(1.02)"
      },
      "&.text": {
        verticalAlign: "middle",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "20px",
        margin: "0"
      },
      "& p":{
        textAlign:'center',
        marginTop:'30px'
      }

  },
  active: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "3px 5px 15px 5px rgba(0,0,0,0.44)",
    fontWeight: "600",
    color: '#fff',
    padding: "0 20px",
    WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)", 
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.66)",
    borderRadius: "6px",
    marginLeft: "1%",
    flex: "1 1 10%",
    cursor: "pointer",
    transition: "all ease-in .3s",
      "&:hover": {
        opacity:"0.9",
        transform: "scale(1.02)"
      },
      "&.text": {
        verticalAlign: "middle",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "20px",
        margin: "0"
      },
      "& p":{
        textAlign:'center',
        marginTop:'30px'
      }
  },
  // downloadButton: {
  //   color: '#fff',
  //   backgroundColor: "#343a40",
  //   border: "1px solid #fff",
  //   borderRadius: "5px",
  //   float: "right"
  // },
  // downloadButton_csv: {
  //   color: '#fff',
  //   backgroundColor: "#343a40",
  //   border: "1px solid #fff",
  //   borderRadius: "5px",
  //   float: "left",
  // }

}));

