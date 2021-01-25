import React from 'react';
//styles
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtons = ({ dispatch, page, type }) => {
  const handleButtonChange = (e) => {
    dispatch({ type: 'ITEMS', payload: null });
    const { value } = e.currentTarget;

    dispatch({ type: 'RADIO_BUTTONS', payload: parseInt(value) });
    dispatch({ type: 'PAGE', payload: 1 });
    if (value === '2') {
      dispatch({ type: 'FILTER_EXT', payload: 'mp3' });
    }
    if (value === '1') {
      dispatch({ type: 'FILTER_EXT', payload: 'mp4' });
    }
    if (value === '0') {
      dispatch({ type: 'FILTER_EXT', payload: 'jpg' });
    }
  };

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
          style={{ color: '#69c5aa' }}
        />
        <FormLabel>Audio</FormLabel>
        <Radio
          value={2}
          checked={type === 2}
          type="radio"
          onChange={handleButtonChange}
          name="audio"
          style={{ color: '#69c5aa' }}
        />
        <FormLabel>Video</FormLabel>
        <Radio
          value={1}
          checked={type === 1}
          type="radio"
          onChange={handleButtonChange}
          name="video"
          style={{ color: '#69c5aa' }}
        />
      </div>
    </FormControl>
  );
};

export default RadioButtons;
