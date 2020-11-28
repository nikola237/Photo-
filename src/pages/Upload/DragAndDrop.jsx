import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadApi from '../../api/uploadApi';

import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './DragAndDrop.styles';

import play from '../../assets/play.png';

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, audio/*,video/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const fileUploadHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (files.length <= 1) {
      for (const file of files) {
        formData.append('item', file);
      }

      const response = await uploadApi.post('/item/add', formData);
      console.log(response, 'ovo je response');
    } else {
      for (const file of files) {
        formData.append('items', file);
      }

      const response = await uploadApi.post('/items/add', formData);
      console.log(response, 'ovo je response');
    }
    setFiles([]);
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
        {files &&
          files.map((file) =>
            file.type !== 'image/jpeg' ? (
              <Card className={classes.root} key={file.name}>
                <Avatar alt="Remy Sharp" src={play} />
                <CardContent>
                  <Typography>{file.name}</Typography>
                </CardContent>
                <Divider />
              </Card>
            ) : (
              <Card className={classes.root} key={file.name}>
                <Avatar alt="Remy Sharp" src={file.preview} />
                <CardContent>
                  <Typography>{file.name}</Typography>
                </CardContent>
                <Divider />
              </Card>
            )
          )}
      </Grid>
      <Grid>
        <Button onClick={fileUploadHandler}>Upload</Button>
      </Grid>
    </Grid>
  );
};

export default DragAndDrop;
