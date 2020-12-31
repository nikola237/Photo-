import React, { useState } from 'react';

//components
import ActiveProjects from '../../components/ActiveProjects/ActiveProjects';
import RemovedProjects from '../../components/RemovedProjects/RemovedProjects';
import Footer from '../../components/Footer/Footer';

//styles
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import { useStyles } from './Projects.styles';

const Projects = () => {
  const [tab, setTab] = useState(0);

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="xl" className={classes.itemContainer} justify="center">
      <Grid container justify="center" item>
        <Tabs
          value={tab}
          className={classes.tabs}
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
        >
          <Tab label="aktivni projekti" />
          <Tab label="obrisani projekti" />
        </Tabs>
        <Grid item container justify="center"></Grid>
        <Grid item container justify="center">
          {tab === 0 && <ActiveProjects tab={tab} />}
          {tab === 1 && <RemovedProjects tab={tab} />}
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Projects;
