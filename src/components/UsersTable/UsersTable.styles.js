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
    '& .MuiTableCell-body': {
      color: 'white',
    },
    '& .MuiTableRow-head': {
      backgroundColor: '#343a40',
      color: 'white',
    },
  },
  pagination: {
    color: '#fff',
    '& .MuiSelect-icon': {
      color: 'white',
    },
    '& .MuiIconButton-root.Mui-disabled': {
      color: '#7b7b7b',
    },
    '& .MuiTablePagination-root': {
      color: '#fff',
    },
  },
  head: {
    backgroundColor: theme.palette.common.black,
  },

  headTitle: {
    color: theme.palette.common.white,
    fontSize: 17,
  },
  selected: {
    '& .MuiInput-root': {
      color: '#fff',
    },
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
}));
