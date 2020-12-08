import React, { useState } from 'react';

//components
import ActiveProjects from '../../components/ActiveProjects/ActiveProjects';
import RemovedProjects from '../../components/RemovedProjects/RemovedProjects';

//styles
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useStyles } from './Projects.styles';

const Projects = () => {
  const [tab, setTab] = useState(0);

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Grid container justify="center" className={classes.itemContainer}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
      >
        <Tab label="active projects" />
        <Tab label="removed projects" />
      </Tabs>
      <Grid item container justify="center">
        {/* <Search /> */}
      </Grid>
      <Grid item container justify="center">
        {tab === 0 && <ActiveProjects tab={tab} />}
        {tab === 1 && <RemovedProjects />}
      </Grid>
    </Grid>
  );
};

export default Projects;
