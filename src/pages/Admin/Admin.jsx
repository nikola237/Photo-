import React from 'react';

import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import PaginationComp from '../../components/Pagination/Pagination';

import { useAdminState } from '../../context/authContext/adminContext/adminContext';

import { Grid } from '@material-ui/core';
import { useStyles } from './Admin.styles';

const Admin = () => {
  const { items, type } = useAdminState();
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.itemContainer}>
      <Grid item container className={classes.offset} direction="column">
        <Grid
          item
          container
          className={classes.searchContainer}
          justify="center"
        >
          <Search />
        </Grid>
        <Grid
          item
          container
          className={classes.radioBtn}
          justify="center"
          direction="row"
        >
          <RadioButtons />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        {type === 0
          ? items.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id ? item.id : 1}>
                <Image key={item.id ? item.id : 1} {...item} />
              </Grid>
            ))
          : type === 1
          ? items.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id ? item.id : 1}>
                <Video key={item.id ? item.id : 1} {...item} />
              </Grid>
            ))
          : items.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id ? item.id : 1}>
                <Audio key={item.id ? item.id : 1} {...item} />
              </Grid>
            ))}
      </Grid>
      <Grid item container className={classes.pagination}>
        <PaginationComp />
      </Grid>

      {/* <CardMedia className={classes.logo} image={footer} title="Logo" /> */}
    </Grid>
  );
};

export default Admin;
