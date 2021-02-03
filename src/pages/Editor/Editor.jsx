import React, { useReducer, useState } from 'react';

//editorReducer
import { editorReducer } from './editorReducer';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//components
import Search from '../../components/Search/Search';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import ActiveItems from '../../components/ActiveItems/ActiveItems';
import PaginationComp from '../../components/Pagination/Pagination';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import ExtensionsFilter from '../../components/ExtenionsFilter/ExtensionsFilter';

//styles
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import SnackbarAuth from '../../components/SnackbarAuth/SnackbarAuth';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
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
  itemById: '',
};
const Editor = (props) => {
  const [state, dispatch] = useReducer(editorReducer, INITIAL_STATE);
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
    autoSuggestion,
    tagsKwords,
    proba,
    extensionFilter,
    editMode,
    itemById,
  } = state;

  const classes = useStyles();

  const handleChange = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
    if (stateSwitch.checkedA) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Претрага по таг-у',
          severity: 'info',
          open: true,
        },
      });
    } else {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Претрага по ид-у',
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
        <Grid
          item
          container
          direction="row"
          xs={9}
          style={{ paddingRight: '3%' }}
        >
          <Grid container item>
            <Grid
              container
              item
              // className={classes.searchContainer}
              justify="flex-end"
            >
              <Grid item xs={4} container justify="flex-end">
                <Tooltip title="Промени мод претраге">
                  <Switch
                    checked={stateSwitch.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={5}>
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

          <Grid item container justify="flex-end">
            <Grid container item xs={3}>
              <RadioButtons dispatch={dispatch} page={page} type={type} />
            </Grid>
            <Grid item xs={2}>
              <ExtensionsFilter
                dispatch={dispatch}
                type={type}
                extensionFilter={extensionFilter}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.itemWrapper}>
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

export default Editor;
