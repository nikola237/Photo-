import React, { useEffect } from 'react';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './Search.styles';

const Search = () => {
  const dispatch = useAdminDispatch();
  const { kwords } = useAdminState();

  const classes = useStyles();

  useEffect(() => {
    window.localStorage.setItem('kwordValue', kwords);
  }, [kwords]);

  const filterSearch = (value) => {
    let term;
    if (value !== '') {
      let searchTerm = value.toLowerCase();
      term = searchTerm.replace(/([^,.]) /g, '$1, ');
    } else {
      term = '';
    }

    return term;
  };

  const searchChangeHandler = (event) => {
    let filtred = filterSearch(event.target.value);

    dispatch({ type: 'SEARCH', payload: filtred });
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>

      <InputBase
        placeholder="Search…"
        onChange={searchChangeHandler}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
};

export default Search;
