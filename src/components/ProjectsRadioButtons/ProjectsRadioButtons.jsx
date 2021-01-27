import React from 'react';

//provider
import {
  useProjectsState,
  useProjectsDispatch,
} from '../../context/projectsContext';

//styles
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const ProjectsRadioButtons = () => {
  const dispatch = useProjectsDispatch();
  const { type } = useProjectsState();
  const handleButtonChange = (e) => {
    const { value } = e.currentTarget;

    console.log(value, 'ovo je value');
    dispatch({ type: 'RADIO_BUTTONS', payload: parseInt(value) });

    dispatch({ type: 'PROJECTS', payload: null });
  };
  return (
    <FormControl>
      <div>
        <FormLabel>Активни</FormLabel>
        <Radio
          value={1}
          checked={type === 1}
          type="radio"
          onChange={handleButtonChange}
          name="active"
        />
        <FormLabel>Неактивни</FormLabel>
        <Radio
          value={0}
          checked={type === 0}
          type="radio"
          onChange={handleButtonChange}
          name="inactive"
        />
      </div>
    </FormControl>
  );
};

export default ProjectsRadioButtons;
