import React from 'react';
import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

const Search = () => {
  const dispatch = useAdminDispatch();
  const { type, kwords } = useAdminState();

  console.log(kwords, type, 'ovo je kwords');

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
  const handleButtonChange = (e) => {
    const { value } = e.currentTarget;
    console.log(value, 'ovo je value');

    dispatch({ type: 'RADIO_BUTTONS', payload: parseInt(value) });
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
        <div>
          <label>Image</label>
          <input
            value={0}
            checked={type === 0}
            type="radio"
            onChange={handleButtonChange}
            name="image"
          />
          <label>Audio</label>
          <input
            value={2}
            checked={type === 2}
            type="radio"
            onChange={handleButtonChange}
            name="audio"
          />
          <label>Video</label>
          <input
            value={1}
            checked={type === 1}
            type="radio"
            onChange={handleButtonChange}
            name="video"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
