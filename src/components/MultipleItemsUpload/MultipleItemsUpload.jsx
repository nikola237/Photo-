import React from 'react';

//asset
import { ReactComponent as MediaIcon } from '../../assets/play-circle-regular.svg';
//styles
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { useStyles } from './MultipleItemsUpload.styles';

const MultipleItemUpload = ({ file, dispatch }) => {
  const classes = useStyles();

  const handleRemoveItem = (name) => {
    dispatch({ type: 'REMOVE_FILE', payload: name });
  };
  return (
    <Grid item container xs={12} sm={6} md={4}>
      {file.type !== 'image/jpeg' ? (
        <Card className={classes.root}>
          <Box className={classes.box}>
            <CloseIcon
              onClick={() => handleRemoveItem(file.name)}
              className={classes.button}
            />
          </Box>
          <Box className={classes.avatar}>
            {file.type === 'image/png' ? (
              <img
                src={file.preview}
                alt="media"
                style={{ width: '80px', height: '80px', borderRadius: '12px' }}
              />
            ) : file.type === 'image/jpeg' ? (
              <img
                src={file.preview}
                alt="media"
                style={{ width: '80px', height: '80px', borderRadius: '12px' }}
              />
            ) : file.type === 'image/tiff' ? (
              <img
                src={file.preview}
                alt="media"
                style={{ width: '80px', height: '80px', borderRadius: '12px' }}
              />
            ) : file.type === 'image/tiff' ? (
              <img
                src={file.preview}
                alt="media"
                style={{ width: '80px', height: '80px', borderRadius: '12px' }}
              />
            ) : (
              <MediaIcon
                style={{ width: '80px', height: '80px', borderRadius: '12px' }}
              />
            )}
          </Box>
          <CardContent className={classes.content}>
            <Typography>
              {file.ImageDescription
                ? file.ImageDescription.slice(0, 50).toLowerCase()
                : 'Zabranjeno slanje bez tagova'}
            </Typography>
          </CardContent>
          <Divider />
        </Card>
      ) : (
        <Card className={classes.root}>
          <Box className={classes.box}>
            <CloseIcon
              onClick={() => handleRemoveItem(file.name)}
              className={classes.button}
            />
          </Box>
          <Box className={classes.avatar}>
            {/* <Avatar alt="Remy Sharp" src={file.preview} /> */}
            <img
              src={file.preview}
              alt="media"
              style={{ width: '80px', height: '80px', borderRadius: '12px' }}
            />
          </Box>
          <CardContent className={classes.content}>
            <Typography>
              {file.ImageDescription
                ? `${file.ImageDescription.slice(0, 50).toLowerCase()}...`
                : 'Zabranjeno slanje bez tagova'}
            </Typography>
            {/* <Typography>{file.name.toLowerCase()}</Typography> */}
          </CardContent>
          <Divider />
        </Card>
      )}
    </Grid>
  );
};

export default MultipleItemUpload;
