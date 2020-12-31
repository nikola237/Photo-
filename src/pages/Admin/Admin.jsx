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
import SnackbarAuth from '../../components/SnackbarAuth/SnackbarAuth';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import Footer from '../../components/Footer/Footer';
import Divider from '@material-ui/core/Divider';
import ExtensionsFilter from '../../components/ExtenionsFilter/ExtensionsFilter';

//styles
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
};

const Admin = () => {
  const [state, dispatch] = useReducer(adminReducer, INITIAL_STATE);

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
  } = state;

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    dispatch({ type: 'ITEMS', payload: null });
    dispatch({ type: 'PAGE', payload: 1 });
    dispatch({ type: 'TAB', payload: newValue });
    dispatch({ type: 'FILTER_EXT', payload: '' });
  };

  useEffect(() => {}, [tab]);

  return (
    <Container maxWidth="xl" className={classes.itemContainer} justify="center">
      <Grid item container justify="center">
        <Tabs value={tab} onChange={handleChangeTab} className={classes.tabs}>
          <Tab label="Aktivne datoteke" />
          <Tab label="Obrisane datoteke" />
          <Tab label="Dodate datoteke" />
        </Tabs>
      </Grid>
      <Grid item container className={classes.searchContainer} justify="center">
        <Search
          dispatch={dispatch}
          autoSuggestion={autoSuggestion}
          tagsKwords={tagsKwords}
          proba={proba}
        />
      </Grid>
      <Grid item container justify="center" className={classes.filter}>
        <ExtensionsFilter
          dispatch={dispatch}
          type={type}
          extensionFilter={extensionFilter}
        />
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
      <Divider flexItem />
      <Grid item container className={classes.footer}>
        <Footer />
      </Grid>

      <SnackbarAlert />
      <SnackbarAuth />
    </Container>
  );
};

export default Admin;
