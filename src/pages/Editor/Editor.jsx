import React, { useReducer } from 'react';

//editorReducer
import { editorReducer } from './editorReducer';

//components
import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import ActiveItems from '../../components/ActiveItems/ActiveItems';
import PaginationComp from '../../components/Pagination/Pagination';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import Footer from '../../components/Footer/Footer';
import ExtensionsFilter from '../../components/ExtenionsFilter/ExtensionsFilter';

//styles
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { useStyles } from './Editor.styles';

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
const Editor = (props) => {
  const [state, dispatch] = useReducer(editorReducer, INITIAL_STATE);

  const {
    items,
    type,
    kwords,
    page,
    totalPages,
    isLoading,
    tab,
    autoSuggestion,
    tagsKwords,
    proba,
    extensionFilter,
    editMode,
  } = state;

  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.itemContainer} justify="center">
      <Grid item container justify="center"></Grid>
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

      <Grid container item justify="center" className={classes.pagination}>
        <PaginationComp
          dispatch={dispatch}
          page={page}
          totalPages={totalPages}
        />
      </Grid>

      <Grid item container className={classes.footer}>
        <Footer />
      </Grid>

      <SnackbarAlert />
    </Container>
  );
};

export default Editor;
