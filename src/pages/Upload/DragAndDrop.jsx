import React, { useEffect, useState, useReducer } from 'react';
//drop zone
import { useDropzone } from 'react-dropzone';

//api upload
import uploadApi from '../../api/uploadApi';

//import
import SingleItemUpload from '../../components/SingleItemUpload/SingleItemUpload';
import MultipleItemUpload from '../../components/MultipleItemUpload/MultipleItemUpload';

//styles
import { Grid } from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
// import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './DragAndDrop.styles';

// import play from '../../assets/play.png';

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
        files: state.files.filter((file) => file.id !== action.payload),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
const DragAndDrop = () => {
  // const [files, setFiles] = useState(null);
  const [state, dispatch] = useReducer(uploadReducer, {
    files: null,
    title: '',
    tags: '',
  });

  const { files, title, tags } = state;

  console.log(title, tags);

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
      console.log(response, 'ovo je response');
    } else {
      for (const file of files) {
        console.log('usao u 2');
        formData.append('items', file);
      }

      const response = await uploadApi.post('/items/add', formData);
      console.log(response, 'ovo je response');
    }
    dispatch({ type: 'FILES', payload: null });
  };
  const fileCancelHandler = () => {
    console.log('usao');
    dispatch({ type: 'FILES', payload: null });
  };

  return (
    <Grid
      container
      spacing={3}
      justify="center"
      className={classes.itemContainer}
    >
      <Grid
        container
        direction="column"
        item
        justify="center"
        {...getRootProps()}
        className={classes.dropZone}
      >
        <input {...getInputProps()} name="item" type="file" multiple />
        <Typography>Drag and drop an file here or click</Typography>
        <CloudUploadIcon />
      </Grid>
      <Grid item container className={classes.fileContainer} direction="column">
        {files && files.length === 1 ? (
          <SingleItemUpload
            files={files}
            dispatch={dispatch}
            tags={tags}
            title={title}
          />
        ) : (
          <MultipleItemUpload
            files={files}
            dispatch={dispatch}
            tags={tags}
            title={title}
          />
        )}
      </Grid>
      <Grid>
        <Button onClick={fileUploadHandler}>Upload</Button>
        <Button onClick={fileCancelHandler}>Cancel</Button>
      </Grid>
    </Grid>
  );
};

export default DragAndDrop;
