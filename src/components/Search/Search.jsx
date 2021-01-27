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
  stateSwitch,
  itemById,
  autoSuggestion,
  tagsKwords,
}) => {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles();

  const getData = useCallback(() => {
    if (stateSwitch.checkedA) {
      dispatch({ type: 'ADD_SUGGESTION', payload: [] });
      return;
    } else {
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
    }
  }, [dispatch, stateSwitch.checkedA, tagsKwords]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  return (
    <Grid container justify="flex-end">
      <Box width={500} style={{ position: 'relative' }}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-standard"
          options={autoSuggestion}
          getOptionLabel={(autoSuggestion) => autoSuggestion}
          value={value}
          inputValue={stateSwitch.checkedA ? itemById : inputValue}
          onChange={(event, newValue) => {
            const filterArray = newValue.join();

            dispatch({ type: 'SEARCH', payload: filterArray });
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            const options = newInputValue.split(',');
            if (stateSwitch.checkedA) {
              console.log(event.target.value);
              dispatch({ type: 'ITEM_BY_ID', payload: newInputValue });
              return;
            }

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
              label="Претражи архиву"
              className={classes.search}
            />
          )}
        />
        <div className={classes.searchLay}></div>
      </Box>
    </Grid>
  );
};

export default Search;
