import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import { handleDownloadItem, removeItem } from '../utils.js';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { useStyles } from './Image.styles';

const Image = ({ originalname, pathShort, tags, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  const classes = useStyles();

  const handleItem = () => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    history.push(`/edit/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      {items[0]?.message ? (
        <div>{items[0].message}</div>
      ) : (
        <div onContextMenu={(e) => e.preventDefault()}>
          <CardHeader title={`${originalname}`} />

          <CardMedia
            className={classes.media}
            image={`http://93.86.249.163:3030/items/display/${pathShort}`}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
            >{`TAGOVI: ${tags}`}</Typography>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary" onClick={handleItem}>
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleDownloadItem(pathShort, filename)}
            >
              Download
            </Button>
            <Button size="small" color="primary" onClick={() => removeItem()}>
              Delete
            </Button>
          </CardActions>
        </div>
      )}
    </Card>
  );
};

export default Image;
