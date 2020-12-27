import React from 'react';

//styles
import Select from '@material-ui/core/Select';

const ExtensionsFilter = ({ type, dispatch, extensionFilter }) => {
  const updateFilterValue = (value) => {
    console.log(value, 'ovo je value');
    dispatch({ type: 'FILTER_EXT', payload: value });
  };
  return (
    <div>
      <Select
        native
        labelId="filter"
        name="filter"
        id="select"
        defaultChecked={''}
        value={extensionFilter}
        onChange={(e) => updateFilterValue(e.target.value)}
      >
        {type === 0 && (
          <>
            <option value={''}>Bez filtera</option>
            <option value="jpg">image/jpeg</option>
            <option value="png">image/png</option>
            <option value="bmp">image/bmp</option>
            <option value="bmp">image/x-windows-bmp</option>
            <option value="tif">image/tiff</option>
            <option value="tiff">image/tiff</option>
          </>
        )}
        {type === 2 && (
          <>
            <option value={''}>Bez filtera</option>
            <option value="mp3">audio/mpeg</option>
            <option value="wav">audio/wav</option>
          </>
        )}
        {type === 1 && (
          <>
            <option value={''}>Bez filtera</option>
            <option value="mp4">video/mp4</option>
            <option value="mov">video/quicktime</option>
          </>
        )}
      </Select>
    </div>
  );
};

export default ExtensionsFilter;
