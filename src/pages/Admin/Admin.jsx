import React, { useEffect, useReducer } from 'react';

//adminReducer
import { adminReducer } from './adminReducer';

//components
import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import ActiveItems from '../../components/ActiveItems/ActiveItems';
import DeletedItems from '../../components/DeletedItems/DeletedItems';
import MyItems from '../../components/MyItems/MyItems';
import PaginationComp from '../../components/Pagination/Pagination';

//styles
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useStyles } from './Admin.styles';

const INITIAL_STATE = {
  items: null,
  type: 0,
  kwords: '',
  page: 1,
  totalPages: undefined,
  isLoading: false,
  tab: 0,
};

const Admin = () => {
  const [state, dispatch] = useReducer(adminReducer, INITIAL_STATE);

  const { items, type, kwords, page, totalPages, isLoading, tab } = state;

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    dispatch({ type: 'ITEMS', payload: null });

    dispatch({ type: 'TAB', payload: newValue });
  };

  useEffect(() => {}, [tab]);

  return (
    <Grid container direction="column" className={classes.itemContainer}>
      <Grid item container className={classes.offset} direction="column">
        <Grid item container justify="center">
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChangeTab}
          >
            <Tab label="active items" />
            <Tab label="deleted items" />
            <Tab label="my Items" />
          </Tabs>
        </Grid>
        <Grid
          item
          container
          className={classes.searchContainer}
          justify="center"
        >
          <Search kwords={kwords} dispatch={dispatch} />
        </Grid>
        <Grid
          item
          container
          className={classes.radioBtn}
          justify="center"
          direction="row"
        >
          <RadioButtons dispatch={dispatch} page={page} type={type} />
        </Grid>
      </Grid>
      <Grid item container justify="center">
        {tab === 0 && (
          <ActiveItems
            dispatch={dispatch}
            items={items}
            type={type}
            kwords={kwords}
            page={page}
            isLoading={isLoading}
            tab={tab}
          />
        )}
        {tab === 1 && (
          <DeletedItems
            dispatch={dispatch}
            items={items}
            type={type}
            kwords={kwords}
            page={page}
            isLoading={isLoading}
            tab={tab}
          />
        )}
        {tab === 2 && (
          <MyItems
            dispatch={dispatch}
            items={items}
            type={type}
            kwords={kwords}
            page={page}
            tab={tab}
          />
        )}
      </Grid>
      <Grid item container justify="center" className={classes.pagination}>
        <PaginationComp
          dispatch={dispatch}
          page={page}
          totalPages={totalPages}
        />
      </Grid>
    </Grid>
  );
};

export default Admin;
