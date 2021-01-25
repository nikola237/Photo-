import React, { useReducer } from 'react';
//drop zone
import { useDropzone } from 'react-dropzone';

import { useProjectsDispatch } from '../../context/projectsContext';

//api upload
import uploadApi from '../../api/uploadApi';

//components
import SingleItemUpload from '../../components/SingleItemUpload/SingleItemUpload';
import MultipleItemsUpload from '../../components/MultipleItemsUpload/MultipleItemsUpload';
import Footer from '../../components/Footer/Footer';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';

//styles
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Button from '@material-ui/core/Button';
import { useStyles } from './DragAndDrop.styles';

function uploadReducer(state, action) {
  switch (action.type) {
    case 'FILES':
      return {
        ...state,
        files: action.payload,
      };
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter((file) => file.name !== action.payload),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
const DragAndDrop = () => {
  const [state, dispatch] = useReducer(uploadReducer, {
    files: [],
    title: '',
    tags: '',
  });

  const projectsDispatch = useProjectsDispatch();

  const { files, title, tags } = state;

  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, audio/*,video/*',
    onDrop: (acceptedFiles) => {
      dispatch({
        type: 'FILES',
        payload: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      });
    },
  });

  const fileUploadHandler = async (event) => {
    if (files === null) {
      return;
    }
    event.preventDefault();
    const formData = new FormData();
    if (files.length <= 1) {
      console.log('usao u 1');
      for (const file of files) {
        formData.append('item', file);
        formData.append('title', title);
        formData.append('tags', tags);
      }

      const response = await uploadApi.post('/item/add', formData);

      if (response) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste dodali item',
            severity: 'success',
            open: true,
          },
        });
      }
    } else {
      for (const file of files) {
        formData.append('items', file);
      }

      const response = await uploadApi.post('/items/add', formData);
      if (response) {
        if (response) {
          projectsDispatch({
            type: 'SNACKBAR',
            payload: {
              message: 'Uspesno ste dodali iteme',
              severity: 'success',
              open: true,
            },
          });
        }
      }
    }
    dispatch({ type: 'FILES', payload: [] });
  };
  const fileCancelHandler = () => {
    dispatch({ type: 'FILES', payload: [] });
  };

  return (
    <Container maxWidth="xl" justify="center" className={classes.itemContainer}>
      <Grid
        container
        item
        justify="center"
        spacing={4}
        {...getRootProps()}
        className={classes.dropZone}
      >
        <div className={classes.containerBackground1}></div>
        <div className={classes.containerBackground2}></div>
        <div className={classes.containerBackground3}></div>
        <div className={classes.ikonca}></div>
        <input {...getInputProps()} name="item" type="file" multiple />
      </Grid>

      <Grid container spacing={2} justify="center" className={classes.wrapper}>
        {files && files.length === 1
          ? files.map((file) => (
              <SingleItemUpload
                file={file}
                dispatch={dispatch}
                tags={tags}
                title={title}
                key={file.name}
              />
            ))
          : files.map((file) => (
              <MultipleItemsUpload
                file={file}
                dispatch={dispatch}
                tags={tags}
                title={title}
                key={file.name}
              />
            ))}
      </Grid>

      <Grid item container justify="center">
        {files.length !== 0 ? (
          <>
            <Button className={classes.button} onClick={fileUploadHandler}>
              Posalji
            </Button>
            <Button className={classes.button} onClick={fileCancelHandler}>
              Otkazi
            </Button>
          </>
        ) : null}
      </Grid>
      <SnackbarAlert />
      <Footer />
    </Container>
  );
};

export default DragAndDrop;
