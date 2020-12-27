import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const ProbaSearch = ({ autoSuggestion, kwords, dispatch }) => {
  console.log(autoSuggestion, 'iz probe');
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={autoSuggestion && autoSuggestion}
        getOptionLabel={(autoSuggestion) => autoSuggestion.tagname}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
};

export default ProbaSearch;
