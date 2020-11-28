import React, { useEffect } from 'react';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import Radio from '@material-ui/core/Radio';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtons = () => {
  const { type } = useAdminState();
  const dispatch = useAdminDispatch();
  const handleButtonChange = (e) => {
    const { value } = e.currentTarget;
    console.log(value, 'ovo je value');

    dispatch({ type: 'RADIO_BUTTONS', payload: parseInt(value) });
    dispatch({ type: 'PAGE', payload: 1 });
  };

  useEffect(() => {
    window.localStorage.setItem('radioBtnValue', type);
  }, [type]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };
  return (
    <FormControl>
      <div>
        <FormLabel>Image</FormLabel>
        <Radio
          value={0}
          checked={type === 0}
          type="radio"
          onChange={handleButtonChange}
          name="image"
        />
        <FormLabel>Audio</FormLabel>
        <Radio
          value={2}
          checked={type === 2}
          type="radio"
          onChange={handleButtonChange}
          name="audio"
        />
        <FormLabel>Video</FormLabel>
        <Radio
          value={1}
          checked={type === 1}
          type="radio"
          onChange={handleButtonChange}
          name="video"
        />
      </div>
    </FormControl>
  );
};

export default RadioButtons;
