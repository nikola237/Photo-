import React, { useEffect } from 'react';

import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import PaginationComp from '../../components/Pagination/Pagination';

import { useAdminState } from '../../context/authContext/adminContext/adminContext';

import { Grid, Box } from '@material-ui/core';
import { useStyles } from './Admin.styles';

const Admin = () => {
  const { items, type } = useAdminState();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container className={classes.itemContainer}>
      <Grid item container spacing={4}>
        <Search />
        <RadioButtons />
      </Grid>
      <Grid item container spacing={4}>
        {type === 0
          ? items.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id ? item.id : 1}>
                <Image key={item.id ? item.id : 1} {...item} />
              </Grid>
            ))
          : type === 1
          ? items.map((item) => <Video key={item.id ? item.id : 1} {...item} />)
          : items.map((item) => (
              <Audio key={item.id ? item.id : 1} {...item} />
            ))}
      </Grid>
      <PaginationComp />
    </Grid>
  );
};

export default Admin;
