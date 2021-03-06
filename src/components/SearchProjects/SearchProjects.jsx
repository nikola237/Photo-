import React from 'react';

import {
  useProjectsState,
  useProjectsDispatch,
} from '../../context/projectsContext';

//styles
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './SearchProjects.styles';

const SearchProjects = () => {
  const { kwords } = useProjectsState();
  const dispatch = useProjectsDispatch();

  const classes = useStyles();

  const searchChangeHandler = (event) => {
    const { value } = event.currentTarget;
    dispatch({ type: 'KWORDS', payload: value });
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>

      <InputBase
        placeholder="Претражи пројекте"
        onChange={searchChangeHandler}
        value={kwords}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
};

export default SearchProjects;
