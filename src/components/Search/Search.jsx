import React, { useEffect } from 'react';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

const Search = () => {
  const dispatch = useAdminDispatch();
  const { kwords } = useAdminState();

  console.log(kwords, 'ovo je kwords');

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={kwords}
          onChange={searchChangeHandler}
          placeholder="search item"
        />
      </form>
    </div>
  );
};

export default Search;
