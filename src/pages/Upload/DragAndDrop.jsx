import React, { useCallback, useEffect, useReducer } from 'react';
//drop zone
import { useDropzone } from 'react-dropzone';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//exifr
import exifr from 'exifr';

//api upload
import uploadApi from '../../api/uploadApi';

//components
import SingleItemUpload from '../../components/SingleItemUpload/SingleItemUpload';
import MultipleItemsUpload from '../../components/MultipleItemsUpload/MultipleItemsUpload';
import SideBar from '../../components/SideBar/SideBar';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';

//styles
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useStyles } from './DragAndDrop.styles';

function uploadReducer(state, action) {
  switch (action.type) {
    case 'FILES':
      return {
        ...state,
        files: action.payload,
      };
    case 'CHECKED':
      return {
        ...state,
        checked: action.payload,
      };
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter((file) => file.name !== action.payload),
      };
    case 'PHARSED_FILE':
      return {
        ...state,
        pharsedFiles: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
const DragAndDrop = () => {
  const [state, dispatch] = useReducer(uploadReducer, {
    files: [],
    //stejt
    title: '',
    tags: '',
  });
  const projectsDispatch = useProjectsDispatch();

  const { files, title, tags } = state;

  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,audio/*, video/*',
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

  const extractDepthMap = useCallback(
    async (filePath) => {
      // trebalo bi pre parsovanja filtrirati i promeniti apdejtovati stejt
      // stejet je FILES array gore na vrhu
      //problem je cim prebacis nesto u drop zonu on prikaze kartice
      //trebalo bi da ga zadrzimo da ne prikazuje nista dok se fajlovi ne isparsuju i isfiltriraju zatim posle apdejta stejta da prikazemo kartice

      //  |------>ovde se parsuje
      const output = await Promise.all(
        filePath.map((file) => exifr.parse(file))
      );

      const imgDesc = output.map((value) =>
        value === undefined ? { ImageDecription: false } : value
      );

      const jebem = files.map((file, index) =>
        Object.assign(file, imgDesc[index])
      );
      // } catch (error) {
      //   projectsDispatch({
      //     type: 'SNACKBAR',
      //     payload: {
      //       message: '???????? ???????? ??????????????',
      //       severity: 'success',
      //       open: true,
      //     },
      //   });
      // }
    },
    [files, projectsDispatch]
  );

  useEffect(() => {
    if (files.length > 0) {
      // |---------->
      //kada se ubace fajlovi poziva se ova funkcija
      extractDepthMap(files);
    }
    if (files.length > 50) {
      console.log('usao u drugi');
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: '???????????????????? ???????? ?????????????? ???? 50',
          severity: 'error',
          open: true,
        },
      });
    }
  }, [extractDepthMap, files, projectsDispatch]);

  const fileUploadHandler = async (event) => {
    if (files === null) {
      return;
    }
    event.preventDefault();
    const formData = new FormData();
    if (files.length <= 1) {
      for (const file of files) {
        if (file.ImageDecription) {
          formData.append('item', file);
          formData.append('title', title);
          formData.append('tags', tags);
        } else {
          projectsDispatch({
            type: 'SNACKBAR',
            payload: {
              message: '???????????? ???????????? ????????????',
              severity: 'error',
              open: true,
            },
          });
        }
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
        if (file.ImageDecription) {
          formData.append('items', file);
        }
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
    <Container maxWidth="xl" className={classes.itemContainer}>
      <div className={classes.sidebarWrapper}>
        <SideBar />
      </div>

      <Grid
        container
        item
        style={{}}
        justify="flex-end"
        className={classes.dropZoneWrapper}
      >
        <Grid
          container
          item
          justify="center"
          spacing={4}
          {...getRootProps()}
          className={
            files.length > 0 ? classes.dropZoneFilled : classes.dropZone
          }
        >
          <div
            className={
              files.length > 0
                ? classes.containerBackground1Filled
                : classes.containerBackground1
            }
          ></div>
          <div
            className={
              files.length > 0
                ? classes.containerBackground2Filled
                : classes.containerBackground2
            }
          ></div>
          <div className={classes.containerBackground3}></div>
          <div className={classes.ikonca}></div>
          <input {...getInputProps()} name="item" type="file" multiple />
        </Grid>
      </Grid>

      <Grid container spacing={2} justify="center" className={classes.wrapper}>
        <Divider
          className={files.length > 0 ? classes.divider : null}
          variant="middle"
        />
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

      <Grid item container justify="center" className={classes.buttonsWraper}>
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
    </Container>
  );
};

export default DragAndDrop;
