import React, { useState, useCallback, useEffect } from 'react';

//api
import api from '../../api/api';

//styles
import { Grid } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useStyles } from './Search.styles';

const Search = ({
  dispatch,

  autoSuggestion,

  tagsKwords,
}) => {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles();

  const getData = useCallback(() => {
    async function getTags() {
      try {
        const response = await api.post(`/tags/search?size=10`, {
          kword: tagsKwords,
        });

        if (response.data.rows[0]?.message) {
          return ['Nema Tagova'];
        } else {
          const filterTags = response.data.rows.map((el) => el.tagname);
          dispatch({ type: 'ADD_SUGGESTION', payload: filterTags });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTags();
  }, [dispatch, tagsKwords]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  return (
    <Grid container justify="center">
      <Box width={500}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-standard"
          options={autoSuggestion}
          getOptionLabel={(autoSuggestion) => autoSuggestion}
          value={value}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            const filterArray = newValue.join();

            dispatch({ type: 'SEARCH', payload: filterArray });
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            const options = newInputValue.split(',');

            if (options.length > 1) {
              const filter = value
                .concat(options)
                .map((x) => x.trim())
                .filter((x) => x);
              const filterArray = filter.join();
              dispatch({ type: 'SEARCH', payload: filterArray });

              setValue(
                value
                  .concat(options)
                  .map((x) => x.trim())
                  .filter((x) => x)
              );
            } else {
              setInputValue(newInputValue);
              if (newInputValue !== '') {
                dispatch({ type: 'SEARCH', payload: newInputValue });
              }
              dispatch({
                type: 'ADD_KWORD_SUGGESTION',
                payload: newInputValue,
              });
            }
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              variant="outlined"
              label="Pretrazi arhivu"
              className={classes.search}
            />
          )}
        />
      </Box>
    </Grid>
  );
};

export default Search;
