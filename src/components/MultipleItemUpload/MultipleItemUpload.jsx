import React from 'react';

//api
import uploadApi from '../../api/uploadApi';

//asset
import play from '../../assets/play.png';

//styles
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './MultipleItemsUpload.styles';

const MultipleItemUpload = ({ files, setFiles }) => {
  const classes = useStyles();

  const filerRemoveHandler = () => {
    console.log('usao');
  };
  return (
    <Grid>
      <Paper>
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
      </Paper>
    </Grid>
  );
};

export default MultipleItemUpload;
