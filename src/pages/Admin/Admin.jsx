import React, { useEffect, useReducer, useState } from 'react';

//adminReducer
import { adminReducer } from './adminReducer';

//components
import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import ActiveItems from '../../components/ActiveItems/ActiveItems';
import DeletedItems from '../../components/DeletedItems/DeletedItems';
import MyItems from '../../components/MyItems/MyItems';
import PaginationComp from '../../components/Pagination/Pagination';
import SnackbarAuth from '../../components/SnackbarAuth/SnackbarAuth';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import ExtensionsFilter from '../../components/ExtenionsFilter/ExtensionsFilter';
import SideBar from '../../components/SideBar/SideBar';

//styles
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import { useStyles } from './Admin.styles';

const INITIAL_STATE = {
  items: null,
  type: 0,
  kwords: '',
  proba: '',
  page: 1,
  totalPages: undefined,
  isLoading: false,
  tab: 0,
  error: null,
  autoSuggestion: [],
  tagsKwords: '',
  extensionFilter: '',
  editMode: {
    status: false,
    itemId: null,
    tags: null,
  },
  switchState: {
    checkedA: false,
    checkedB: true,
  },
};

const Admin = () => {
  const [state, dispatch] = useReducer(adminReducer, INITIAL_STATE);
  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: false,
    checkedB: true,
  });

  const handleChange = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    items,
    type,
    kwords,
    page,
    totalPages,
    isLoading,
    tab,
    error,
    autoSuggestion,
    tagsKwords,
    proba,
    extensionFilter,
    editMode,
    switchState,
  } = state;

  const classes = useStyles();
  console.log(stateSwitch, 'switch');
  const handleChangeTab = (event, newValue) => {
    dispatch({ type: 'ITEMS', payload: null });
    dispatch({ type: 'PAGE', payload: 1 });
    dispatch({ type: 'TAB', payload: newValue });
    dispatch({ type: 'FILTER_EXT', payload: '' });
  };

  return (
    <Container
      maxWidth="xl"
      className={classes.itemContainer}
      direction="column"
    >
      <Grid container item direction="row" className={classes.content}>
        <Grid container item xs={3}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <SideBar />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          xs={9}
          // style={{ paddingRight: '15px' }}
        >
          <Grid container item style={{ height: '54px' }}>
            <Grid
              container
              item
              justify="flex-end"
              style={{ style: 'relative' }}
            >
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                className={classes.tabs}
              >
                <Tab label="Aktivne datoteke" className={classes.tabs} />
                <Tab label="Obrisane datoteke" className={classes.tabs} />
                <Tab label="Dodate datoteke" className={classes.tabs} />
              </Tabs>
              <div className={classes.tabBackground}></div>
            </Grid>
          </Grid>
          <Grid container item justify="flex-end">
            <Switch
              checked={stateSwitch.checkedA}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <Grid
              container
              item
              // className={classes.searchContainer}
              justify="flex-end"
            >
              <Search
                dispatch={dispatch}
                autoSuggestion={autoSuggestion}
                tagsKwords={tagsKwords}
                proba={proba}
              />
            </Grid>
          </Grid>
          {/* <Grid
          item
          container
          className={classes.radioBtn}
          justify="center"
          direction="row"
        > */}
          <Grid item container justify="flex-end">
            <Grid container item xs={4}>
              <RadioButtons dispatch={dispatch} page={page} type={type} />
            </Grid>
            {/* </Grid> */}
            <Grid />

            <Grid container item xs={1} />
            <Grid container item xs={3}>
              <ExtensionsFilter
                dispatch={dispatch}
                type={type}
                extensionFilter={extensionFilter}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {tab === 0 && (
          <ActiveItems
            dispatch={dispatch}
            items={items}
            type={type}
            kwords={kwords}
            page={page}
            isLoading={isLoading}
            tab={tab}
            extensionFilter={extensionFilter}
            editMode={editMode}
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
            extensionFilter={extensionFilter}
            editMode={editMode}
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
            error={error}
            extensionFilter={extensionFilter}
            editMode={editMode}
            isLoading={isLoading}
          />
        )}
        <Grid container item justify="center" className={classes.pagination}>
          <PaginationComp
            dispatch={dispatch}
            page={page}
            totalPages={totalPages}
          />
        </Grid>
        <SnackbarAlert />
        <SnackbarAuth />
      </Grid>
    </Container>
  );
};

export default Admin;
