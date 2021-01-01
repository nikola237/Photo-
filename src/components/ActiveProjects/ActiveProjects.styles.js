import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderRadius: '10px',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.66)',
    padding: '20px',
    backgroundColor: '#343a40',
    color: 'white',
    '& tbody': {
      '& .MuiTableRow-root': {
        backgroundColor: '#06060629',
        '&:nth-of-type(odd)': {
          backgroundColor: '#ffffff29',
        },
      },
    },
    '& .MuiTableCell-head': {
      color: 'white',
      fontSize: '20px',
    },
    '& .MuiTableCell-body': {
      color: 'white',
    },
    '& .MuiTableRow-head': {
      backgroundColor: '#343a40',
      color: 'white',
    },
  },
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  addProject: {
    color: theme.palette.secondary.dark,
    cursor: 'pointer',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '17px',
    backgroundColor: '#fff',
  },
  filter: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
    '& .MuiInput-underline:before': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.dark,
    },

    '& .MuiInput-underline:after': {
      borderColor: theme.palette.secondary.dark,
    },
  },
  project: {
    paddingBottom: theme.spacing(3),
  },

  content: {
    flex: '1 0 auto',
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
  },
}));
