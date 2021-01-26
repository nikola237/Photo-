import React, { useReducer, useState } from 'react';

//adminReducer
import { adminReducer } from './adminReducer';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

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
  itemById: '',
};

const Admin = () => {
  const [state, dispatch] = useReducer(adminReducer, INITIAL_STATE);
  const [stateSwitch, setStateSwitch] = useState({
    checkedA: false,
    checkedB: true,
  });
  const projectsDispatch = useProjectsDispatch();
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
    itemById,
  } = state;

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    dispatch({ type: 'ITEMS', payload: null });
    dispatch({ type: 'PAGE', payload: 1 });
    dispatch({ type: 'TAB', payload: newValue });
    dispatch({ type: 'FILTER_EXT', payload: '' });
  };
  const handleChange = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
    if (stateSwitch.checkedA) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Pretraga po tagovima',
          severity: 'info',
          open: true,
        },
      });
    } else {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Pretraga po Id',
          severity: 'info',
          open: true,
        },
      });
    }
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
        <Grid item container direction="row" xs={9}>
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
            <Grid
              container
              item
              // className={classes.searchContainer}
              justify="flex-end"
            >
              <Grid item xs={2}>
                <Switch
                  checked={stateSwitch.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Search
                  dispatch={dispatch}
                  autoSuggestion={autoSuggestion}
                  tagsKwords={tagsKwords}
                  proba={proba}
                  stateSwitch={stateSwitch}
                  itemById={itemById}
                />
              </Grid>
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
            stateSwitch={stateSwitch}
            itemById={itemById}
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
