import React, { useEffect } from 'react';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

const RadioButtons = () => {
  const { type } = useAdminState();
  const dispatch = useAdminDispatch();
  const handleButtonChange = (e) => {
    const { value } = e.currentTarget;
    console.log(value, 'ovo je value');

    dispatch({ type: 'RADIO_BUTTONS', payload: parseInt(value) });
  };

  useEffect(() => {
    window.localStorage.setItem('radioBtnValue', type);
  }, [type]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default RadioButtons;
