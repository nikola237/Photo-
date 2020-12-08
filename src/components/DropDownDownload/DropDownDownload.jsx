import React, { useState, useEffect } from 'react';

import api from '../../api/api';

//styles
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from './DropDownDownload.styles';

const DropDownDownload = () => {
  const [name, setName] = useState(null);
  const [age, setAge] = useState('');

  const classes = useStyles();

  const getActiveProjects = async () => {
    const response = await api.get('/projects');
    console.log(response, 'ovo je response');

    setName({ type: 'PROJECTS', payload: response.data.rows });
  };

  useEffect(() => {
    getActiveProjects();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">download</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="download"
        >
          <MenuItem value="">
            <em>download</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
    </div>
  );
};

export default DropDownDownload;
