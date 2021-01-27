import React from 'react';

//asset
import play from '../../assets/play.png';

//styles
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
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
            {/* <Avatar
              className={classes.avatarImgMulti}
              alt="Remy Sharp"
              src={play}
            /> */}
            <img
              src={play}
              alt="media"
              style={{ width: '40px', height: '40px' }}
            />
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
