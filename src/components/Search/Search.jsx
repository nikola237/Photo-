import React, { useState, useCallback, useEffect } from 'react';

//api
import api from '../../api/api';

//components
import AutoSuggest from '../AutoSuggest/AutoSuggest';

//styles
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './Search.styles';

const Search = ({
  dispatch,
  kwords,
  autoSuggestion,
  isLoading,
  tagsKwords,
}) => {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const classes = useStyles();
  // console.log(kwords, 'ovo je kwords');
  const getData = useCallback(() => {
    async function getTags() {
      try {
        const response = await api.post(`/tags/search?size=10`, {
          kword: tagsKwords,
        });
        const filterTags = response.data.rows.map(
          (el) => el.tagname
          // console.log(el.tagname)
        );

        // console.log(response.data.rows, 'sugestija response');
        dispatch({ type: 'ADD_SUGGESTION', payload: filterTags });
        // console.log(response.data.rows, 'auto');
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

  // const filterSearch = (value) => {
  //   let term;
  //   if (value !== '') {
  //     // let searchTerm = value.toLowerCase();

  //     term = value.replace(/^[,\s]+|[,\s]+$/g, '');
  //     term = value.replace(/\s*,\s*/g, ',');
  //   } else {
  //     term = '';
  //   }

  //   return term;
  // };

  // const filterTags = (value) => {
  //   let tags = value.split(',');
  //   return tags[tags.length - 1];
  // };

  const searchChangeHandler = (event) => {
    // let filtred = filterSearch(event.target.value);
    // let tags = filterTags(event.target.value);
    // dispatch({ type: 'RESET_SUGGESTION', payload: tags });
    // dispatch({ type: 'SEARCH', payload: filtred });
  };
  // console.log(kwords, 'kwords');
  // console.log(autoSuggestion, 'autoSuggestion');

  // const handleAutoSuggest = (tagname) => {
  //   let final;
  //   if (kwords.includes(',')) {
  //     const lastIndexKwords = kwords.lastIndexOf(',');
  //     const jebem = kwords.slice(0, lastIndexKwords);
  //     final = jebem.concat(',', tagname);
  //   } else {
  //     final = tagname;
  //   }

  //   dispatch({ type: 'ADD_KWORD_SUGGESTION', payload: final });
  // };
  return (
    <Grid container justify="center" direction="column">
      {/* <Grid item className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <InputBase
          onClick={() => setDisplay(!display)}
          placeholder="Search…"
          onChange={searchChangeHandler}
          value={kwords}
          classes={{
            root: classes.root,
            input: classes.inputInput,
          }}
        />

        <Button startIcon={<ClearIcon />} />
      </Grid>

      <div>
      </div> */}
      {/* <AutoSuggest
        kwords={kwords}
        autoSuggestion={autoSuggestion}
        dispatch={dispatch}
        display={display}
        setDisplay={setDisplay}
        isLoading={isLoading}
        tagsKwords={tagsKwords}
      /> */}
      <div className={classes.root}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-standard"
          options={autoSuggestion}
          value={value}
          inputValue={kwords}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            const options = newInputValue.split(',');
            console.log(options, 'ovo je options');
            if (options.length > 1) {
              console.log(value, 'ovo je iz 1');
              setValue(
                value
                  .concat(options)
                  .map((x) => x.trim())
                  .filter((x) => x)
              );
            } else {
              console.log(newInputValue, 'ovo je iz 2');
              dispatch({ type: 'SEARCH', payload: newInputValue });
              // dispatch({ type: 'ADD_SUGGESTION', payload: newInputValue });
              // setInputValue(newInputValue);
            }
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Pretrazi"
              // placeholder="Pretrazi"
              // onChange={searchChangeHandler}
            />
          )}
        />
      </div>
    </Grid>
  );
};

export default Search;
