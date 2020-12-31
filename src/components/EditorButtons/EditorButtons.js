import React from 'react';
//router
import { useHistory } from 'react-router-dom';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//styles
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import { useStyles } from './EditorButtons.styles';
const EditorButtons = ({ id, pathShort, filename }) => {
  const projectsDispatch = useProjectsDispatch();
  const history = useHistory();
  const classes = useStyles();

  //download item
  const handleDownloadItem = (id) => {
    projectsDispatch({
      type: 'ITEM_INFO',
      payload: { id, pathShort, filename },
    });
    history.push(`/download/${id}`);
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => handleDownloadItem(id)}
        size="small"
      >
        <Tooltip title="Preuzmi">
          <GetAppIcon style={{ color: '#2196f3' }} />
        </Tooltip>
      </Button>
    </Grid>
  );
};

export default EditorButtons;
